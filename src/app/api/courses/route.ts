import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { readCourseRequest } from "@/lib/course-form";
import { deleteCoursePhoto, saveCoursePhoto } from "@/lib/course-images";
import { createCourse, readCourses } from "@/lib/courses-store";
import { syncCourseWithStripe } from "@/lib/stripe-sync";

export async function GET() {
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
    const created = await createCourse({ ...parsed.body.value, images: saved });
    const course = await syncCourseWithStripe(created);
    revalidatePath("/cursos");
    return NextResponse.json(course, { status: 201 });
  } catch {
    await Promise.all(saved.map((image) => deleteCoursePhoto(image)));
    return NextResponse.json({ error: "invalid" }, { status: 500 });
  }
}
