import { NextResponse } from "next/server";
import { contentTypeFor, readCourseImage } from "@/lib/course-images";

type Context = { params: Promise<{ name: string }> };

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: Context) {
  const { name } = await context.params;
  const bytes = await readCourseImage(name);
  if (!bytes) return new NextResponse(null, { status: 404 });
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": contentTypeFor(name),
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
