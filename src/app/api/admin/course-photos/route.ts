import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseConfigured } from "@/lib/storage";
import { createSignedCoursePhotoUpload } from "@/lib/storage/supabase-courses";

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "local" }, { status: 409 });
  }
  const body = (await request.json().catch(() => null)) as { files?: { contentType?: unknown }[] } | null;
  const files = Array.isArray(body?.files) ? body.files.slice(0, 40) : [];
  if (files.length === 0) return NextResponse.json({ error: "invalid" }, { status: 400 });
  try {
    const uploads = await Promise.all(
      files.map((file) =>
        createSignedCoursePhotoUpload(typeof file.contentType === "string" ? file.contentType : ""),
      ),
    );
    return NextResponse.json({ uploads });
  } catch (error) {
    console.error("could not sign course photo upload", error);
    const code = error instanceof Error && error.message === "file_type" ? "file_type" : "invalid";
    return NextResponse.json({ error: code }, { status: code === "file_type" ? 400 : 500 });
  }
}
