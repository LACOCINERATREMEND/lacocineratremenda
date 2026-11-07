import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createCourse, parseCourseInput, readCourses } from "@/lib/courses-store";

export async function GET() {
  const result = await readCourses();
  if (!result.ok) {
    return NextResponse.json(
      { error: "No se han podido leer los cursos." },
      { status: 500 },
    );
  }
  return NextResponse.json(result.courses);
}

export async function POST(request: Request) {
  const parsed = parseCourseInput(await request.json().catch(() => null));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const course = await createCourse(parsed.value);
  revalidatePath("/cursos");
  return NextResponse.json(course, { status: 201 });
}
