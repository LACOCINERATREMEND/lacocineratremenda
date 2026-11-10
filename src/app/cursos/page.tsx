import type { Metadata } from "next";
import { CoursesBoard } from "@/components/courses-board";
import { readCourses } from "@/lib/courses-store";
import { seatsLeft } from "@/lib/seats";
import { getStore } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Nuestros cursos",
  description: "Cursos de La Cocinera Tremenda en Sevilla.",
};

export const dynamic = "force-dynamic";

export default async function CursosPage() {
  const result = await readCourses();
  if (!result.ok) return <CoursesBoard courses={null} seats={{}} />;
  const signups = await getStore().listSignups();
  const courses = result.courses.filter((course) => course.published);
  const seats = Object.fromEntries(courses.map((course) => [course.id, seatsLeft(course, signups)]));
  return <CoursesBoard courses={courses} seats={seats} />;
}
