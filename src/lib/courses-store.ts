import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Course, CourseInput } from "@/lib/types";

const filePath = path.join(process.cwd(), "data", "courses.json");

function isCourse(value: unknown): value is Course {
  if (!value || typeof value !== "object") return false;
  const course = value as Partial<Course>;
  return (
    typeof course.id === "string" &&
    typeof course.title === "string" &&
    typeof course.description === "string" &&
    typeof course.when === "string" &&
    typeof course.price === "string" &&
    typeof course.updatedAt === "string"
  );
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
    return { ok: false, error: "Datos no válidos." };
  }

  const record = body as Record<string, unknown>;
  const title = clean(record.title, 120);
  if (!title) return { ok: false, error: "Escribe un título." };

  return {
    ok: true,
    value: {
      title,
      description: clean(record.description, 2000, true),
      when: clean(record.when, 160),
      price: clean(record.price, 40),
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
    const courses = parsed.filter(isCourse).sort((a, b) => {
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
    updatedAt: new Date().toISOString(),
  };
  await writeCourses(
    current.courses.map((course) => (course.id === id ? updated : course)),
  );
  return updated;
}

export async function deleteCourse(id: string) {
  const current = await readCourses();
  if (!current.courses.some((course) => course.id === id)) return false;
  await writeCourses(current.courses.filter((course) => course.id !== id));
  return true;
}
