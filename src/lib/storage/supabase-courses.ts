import { randomUUID } from "node:crypto";
import type { Course, CourseInput } from "@/lib/types";
import { supabaseConfig, supabaseRest, supabaseStorage } from "@/lib/storage/supabase-client";

export type CourseRow = Record<string, unknown>;

export function courseToRow(
  id: string,
  input: CourseInput,
  images: string[],
  updatedAt: string,
  stripeProductId = "",
  stripePriceId = "",
) {
  return {
    id,
    title: input.title,
    description: input.description,
    when_text: input.when,
    price: input.price,
    price_cents: input.priceCents,
    images,
    published: input.published,
    max_seats: input.maxSeats,
    stripe_product_id: stripeProductId,
    stripe_price_id: stripePriceId,
    updated_at: updatedAt,
  };
}

export async function listSupabaseCourseRows() {
  return (await supabaseRest("courses?select=*&order=updated_at.desc")) as CourseRow[];
}

export async function insertSupabaseCourse(input: CourseInput, images: string[]) {
  const id = randomUUID();
  const rows = (await supabaseRest("courses", {
    method: "POST",
    body: JSON.stringify(courseToRow(id, input, images, new Date().toISOString())),
  })) as CourseRow[];
  return rows[0] ?? null;
}

export async function patchSupabaseCourse(id: string, row: Record<string, unknown>) {
  const rows = (await supabaseRest(`courses?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(row),
  })) as CourseRow[];
  return rows[0] ?? null;
}

export async function deleteSupabaseCourseRow(id: string) {
  await supabaseRest(`courses?id=eq.${id}`, { method: "DELETE" });
}

export async function createSignedCoursePhotoUpload(contentType: string) {
  const current = supabaseConfig();
  if (!current) throw new Error("supabase_off");
  const kind =
    contentType === "image/png"
      ? "png"
      : contentType === "image/webp"
        ? "webp"
        : contentType === "image/jpeg" || contentType === "image/jpg"
          ? "jpg"
          : null;
  if (!kind) throw new Error("file_type");
  const name = `${randomUUID()}.${kind}`;
  const signed = (await supabaseStorage(`object/upload/sign/course-photos/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  })) as { url?: string; token?: string } | null;
  const rawUrl = signed?.url ?? "";
  const signedUrl = rawUrl.startsWith("http")
    ? rawUrl
    : `${current.url}/storage/v1${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
  return {
    name,
    token: signed?.token ?? "",
    signedUrl,
    publicUrl: `${current.url}/storage/v1/object/public/course-photos/${name}`,
  };
}

export async function deleteSupabaseCoursePhoto(publicUrl: string) {
  const current = supabaseConfig();
  if (!current) return;
  const marker = "/storage/v1/object/public/course-photos/";
  const index = publicUrl.indexOf(marker);
  if (index === -1) return;
  const name = decodeURIComponent(publicUrl.slice(index + marker.length).split("?")[0] ?? "");
  if (!name) return;
  await supabaseStorage("object/course-photos", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prefixes: [name] }),
  });
}

void null as unknown as Course;
