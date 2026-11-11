import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readCourseRequest } from "@/lib/course-form";
import { deleteCoursePhoto, saveCoursePhoto } from "@/lib/course-images";
import { createCourse, readCourses } from "@/lib/courses-store";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const result = await readCourses();
  if (!result.ok) {
    return NextResponse.json(
      { error: "invalid" },
      { status: 500 },
    );
  }
  return NextResponse.json(result.courses);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const parsed = await readCourseRequest(request);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const saved: string[] = [];
  try {
    for (const file of parsed.body.files) {
      const photo = await saveCoursePhoto(file);
      if (!photo.ok) {
        await Promise.all(saved.map((image) => deleteCoursePhoto(image)));
        return NextResponse.json({ error: photo.error }, { status: 400 });
      }
      saved.push(photo.path);
    }
    const images = [...parsed.body.keep, ...saved];
    const course = await createCourse({ ...parsed.body.value, images }, images);
    revalidatePath("/cursos");
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("course create failed", error);
    await Promise.all(saved.map((image) => deleteCoursePhoto(image)));
    return NextResponse.json({ error: "invalid" }, { status: 500 });
  }
}
