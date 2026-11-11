import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readCourseRequest } from "@/lib/course-form";
import { deleteCoursePhoto, saveCoursePhoto } from "@/lib/course-images";
import { deleteCourse, readCourses, updateCourse } from "@/lib/courses-store";
import { getStore } from "@/lib/storage";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await context.params;
  const parsed = await readCourseRequest(request);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const current = await readCourses();
  const existing = current.courses.find((course) => course.id === id);
  if (!existing) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const keep = parsed.body.replaceImages ? parsed.body.keep : existing.images;
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
    const images = [...keep, ...saved];
    const course = await updateCourse(id, { ...parsed.body.value, images }, images);
    if (!course) {
      await Promise.all(saved.map((image) => deleteCoursePhoto(image)));
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    const removed = existing.images.filter((image) => !images.includes(image));
    await Promise.all(removed.map((image) => deleteCoursePhoto(image)));
    revalidatePath("/cursos");
    revalidatePath(`/cursos/${id}`);
    return NextResponse.json(course);
  } catch (error) {
    console.error("course update failed", error);
    await Promise.all(saved.map((image) => deleteCoursePhoto(image)));
    return NextResponse.json({ error: "invalid" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: Context) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await context.params;
  const removed = await deleteCourse(id);
  if (!removed) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  await getStore().deleteSignupsForCourse(id);

  revalidatePath("/cursos");
  return NextResponse.json({ ok: true });
}
