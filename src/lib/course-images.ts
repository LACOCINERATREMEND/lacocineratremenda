import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { deleteSupabaseCoursePhoto } from "@/lib/storage/supabase-courses";
import { supabaseConfigured } from "@/lib/storage";

export const MAX_PHOTO_BYTES = 15 * 1024 * 1024;

const directory = path.join(process.cwd(), "data", "course-images");
const publicPrefix = "/api/course-images/";
const fileName =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

export type PhotoKind = "jpg" | "png" | "webp";

const remotePhoto =
  /^\/storage\/v1\/object\/public\/course-photos\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;

export function isCourseImagePath(value: string) {
  if (value.startsWith(publicPrefix)) return fileName.test(value.slice(publicPrefix.length));
  try {
    const url = new URL(value);
    const base = process.env.SUPABASE_URL;
    if (!base) return false;
    return url.origin === new URL(base).origin && remotePhoto.test(url.pathname);
  } catch {
    return false;
  }
}

export function detectPhoto(bytes: Uint8Array): PhotoKind | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  return null;
}

export function contentTypeFor(name: string) {
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export async function readCourseImage(name: string) {
  if (!fileName.test(name)) return null;
  try {
    return await readFile(path.join(directory, name));
  } catch {
    return null;
  }
}

export async function saveCoursePhoto(bytes: Uint8Array) {
  if (supabaseConfigured()) {
    return { ok: false as const, error: "signed_upload" };
  }
  if (bytes.byteLength > MAX_PHOTO_BYTES) {
    return { ok: false as const, error: "file_size" };
  }
  const kind = detectPhoto(bytes);
  if (!kind) return { ok: false as const, error: "file_type" };
  const name = `${randomUUID()}.${kind}`;
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, name), bytes);
  return { ok: true as const, path: `${publicPrefix}${name}` };
}

export async function deleteCoursePhoto(publicPath: string) {
  if (!isCourseImagePath(publicPath)) return;
  if (publicPath.startsWith("https://")) {
    await deleteSupabaseCoursePhoto(publicPath).catch((error) => {
      console.error("could not delete course photo", error);
    });
    return;
  }
  const name = publicPath.slice(publicPrefix.length);
  await unlink(path.join(directory, name)).catch(() => undefined);
}
