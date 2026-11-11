import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { deleteCoursePhoto, isCourseImagePath } from "@/lib/course-images";
import type { Course, CourseInput } from "@/lib/types";

const filePath = path.join(process.cwd(), "data", "courses.json");

function asCourse(value: unknown): Course | null {
  if (!value || typeof value !== "object") return null;
  const course = value as Partial<Course>;
  if (
    typeof course.id !== "string" ||
    typeof course.title !== "string" ||
    typeof course.description !== "string" ||
    typeof course.when !== "string" ||
    typeof course.price !== "string" ||
    typeof course.updatedAt !== "string"
  ) {
    return null;
  }
  const images = Array.isArray(course.images)
    ? course.images.filter((item): item is string => typeof item === "string" && isCourseImagePath(item))
    : [];
  const maxSeats =
    typeof course.maxSeats === "number" &&
    Number.isInteger(course.maxSeats) &&
    course.maxSeats > 0
      ? course.maxSeats
      : null;
  const parsedCents = centsFromText(course.price);
  const priceCents =
    typeof course.priceCents === "number" &&
    Number.isInteger(course.priceCents) &&
    course.priceCents >= 0
      ? course.priceCents
      : parsedCents;
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    when: course.when,
    price: priceCents == null ? course.price : formatEuros(priceCents),
    priceCents,
    images,
    published: course.published !== false,
    maxSeats,
    stripeProductId: typeof course.stripeProductId === "string" ? course.stripeProductId : "",
    stripePriceId: typeof course.stripePriceId === "string" ? course.stripePriceId : "",
    updatedAt: course.updatedAt,
  };
}

export function formatEuros(cents: number) {
  const euros = cents / 100;
  const text = Number.isInteger(euros) ? String(euros) : euros.toFixed(2).replace(".", ",");
  return `${text} €`;
}

export function centsFromText(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.round(value * 100);
  }
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/€/g, "").replace(/\s/g, "").replace(",", ".");
  if (!trimmed) return null;
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) return null;
  const euros = Number(trimmed);
  if (euros < 0 || euros > 10000) return null;
  return Math.round(euros * 100);
}

function clean(value: unknown, max: number, multiline = false) {
  if (typeof value !== "string") return "";
  const withoutControls = value.replace(
    multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g : /[\u0000-\u001F]/g,
    " ",
  );
  const normalized = multiline
    ? withoutControls.replace(/\r\n/g, "\n").trim()
    : withoutControls.replace(/\s+/g, " ").trim();
  return normalized.slice(0, max);
}

export function parseCourseInput(
  body: unknown,
): { ok: true; value: CourseInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid" };
  }

  const record = body as Record<string, unknown>;
  const title = clean(record.title, 120);
  if (!title) return { ok: false, error: "title" };

  let maxSeats: number | null = null;
  if (record.maxSeats !== undefined && record.maxSeats !== null && String(record.maxSeats).trim() !== "") {
    const seats = Number(String(record.maxSeats).trim());
    if (!Number.isInteger(seats) || seats < 1 || seats > 500) {
      return { ok: false, error: "seats" };
    }
    maxSeats = seats;
  }

  const priceText = clean(record.price, 40);
  let priceCents: number | null = null;
  if (priceText) {
    priceCents = centsFromText(priceText);
    if (priceCents == null) return { ok: false, error: "price" };
  } else if (typeof record.priceCents === "number" && Number.isInteger(record.priceCents) && record.priceCents >= 0) {
    priceCents = record.priceCents;
  }

  const published =
    record.published === false || record.published === "0" || record.published === "false"
      ? false
      : true;

  return {
    ok: true,
    value: {
      title,
      description: clean(record.description, 2000, true),
      when: clean(record.when, 160),
      price: priceCents == null ? "" : formatEuros(priceCents),
      priceCents,
      images: [],
      published,
      maxSeats,
    },
  };
}

export async function readCourses(): Promise<
  { ok: true; courses: Course[] } | { ok: false; courses: Course[] }
> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return { ok: false, courses: [] };
    const courses = parsed.flatMap((item) => {
      const course = asCourse(item);
      return course ? [course] : [];
    }).sort((a, b) => {
      return b.updatedAt.localeCompare(a.updatedAt);
    });
    return { ok: true, courses };
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return { ok: true, courses: [] };
    }
    return { ok: false, courses: [] };
  }
}

async function writeCourses(courses: Course[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp`;
  await writeFile(temporary, `${JSON.stringify(courses, null, 2)}\n`, "utf8");
  await rename(temporary, filePath);
}

export async function createCourse(input: CourseInput) {
  const current = await readCourses();
  const course: Course = {
    id: randomUUID(),
    ...input,
    stripeProductId: "",
    stripePriceId: "",
    updatedAt: new Date().toISOString(),
  };
  await writeCourses([course, ...current.courses]);
  return course;
}

export async function updateCourse(id: string, input: CourseInput) {
  const current = await readCourses();
  const existing = current.courses.find((course) => course.id === id);
  if (!existing) return null;
  const updated: Course = {
    ...existing,
    ...input,
    stripeProductId: existing.stripeProductId,
    stripePriceId: existing.stripePriceId,
    updatedAt: new Date().toISOString(),
  };
  await writeCourses(
    current.courses.map((course) => (course.id === id ? updated : course)),
  );
  return updated;
}

export async function saveStripeRefs(
  id: string,
  stripeProductId: string,
  stripePriceId: string,
) {
  const current = await readCourses();
  const existing = current.courses.find((course) => course.id === id);
  if (!existing) return null;
  const updated: Course = { ...existing, stripeProductId, stripePriceId };
  await writeCourses(current.courses.map((course) => (course.id === id ? updated : course)));
  return updated;
}

export async function deleteCourse(id: string) {
  const current = await readCourses();
  const existing = current.courses.find((course) => course.id === id);
  if (!existing) return false;
  await writeCourses(current.courses.filter((course) => course.id !== id));
  await Promise.all(existing.images.map((image) => deleteCoursePhoto(image)));
  return true;
}
