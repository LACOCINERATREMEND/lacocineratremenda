import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { deleteCourse, parseCourseInput, updateCourse } from "@/lib/courses-store";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  const parsed = parseCourseInput(await request.json().catch(() => null));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const course = await updateCourse(id, parsed.value);
  if (!course) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  revalidatePath("/cursos");
  return NextResponse.json(course);
}

export async function DELETE(_request: Request, context: Context) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  const removed = await deleteCourse(id);
  if (!removed) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  revalidatePath("/cursos");
  return NextResponse.json({ ok: true });
}
