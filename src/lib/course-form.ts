import { MAX_PHOTO_BYTES, detectPhoto, isCourseImagePath } from "@/lib/course-images";
import { parseCourseInput } from "@/lib/courses-store";
import type { CourseInput } from "@/lib/types";

export type CourseRequest = {
  value: Omit<CourseInput, "images">;
  keep: string[];
  files: Uint8Array[];
  replaceImages: boolean;
};

export async function readCourseRequest(
  request: Request,
): Promise<{ ok: true; body: CourseRequest } | { ok: false; error: string }> {
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("multipart/form-data")) {
    const record = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const parsed = parseCourseInput(record);
    if (!parsed.ok) return parsed;
    const { images: _images, ...value } = parsed.value;
    const listed = Array.isArray(record?.images)
      ? record.images.filter((item): item is string => typeof item === "string" && isCourseImagePath(item))
      : null;
    return {
      ok: true,
      body: { value, keep: listed ?? [], files: [], replaceImages: listed !== null },
    };
  }

  const form = await request.formData();
  const parsed = parseCourseInput({
    title: form.get("title"),
    description: form.get("description"),
    when: form.get("when"),
    price: form.get("price"),
    published: form.get("published"),
    maxSeats: form.get("maxSeats"),
  });
  if (!parsed.ok) return parsed;

  const keep = form
    .getAll("keep")
    .filter((item): item is string => typeof item === "string" && isCourseImagePath(item));
  const files: Uint8Array[] = [];
  for (const entry of form.getAll("photos")) {
    if (typeof entry === "string" || entry.size === 0) continue;
    if (entry.size > MAX_PHOTO_BYTES) return { ok: false, error: "file_size" };
    const bytes = new Uint8Array(await entry.arrayBuffer());
    if (!detectPhoto(bytes)) return { ok: false, error: "file_type" };
    files.push(bytes);
  }

  const { images: _images, ...value } = parsed.value;
  return { ok: true, body: { value, keep, files, replaceImages: true } };
}
