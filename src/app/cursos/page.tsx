import type { Metadata } from "next";
import { CoursesBoard } from "@/components/courses-board";
import { readCourses } from "@/lib/courses-store";

export const metadata: Metadata = {
  title: "Nuestros cursos",
  description: "Cursos de La Cocinera Tremenda en Sevilla.",
};

export const dynamic = "force-dynamic";

export default async function CursosPage() {
  const result = await readCourses();
  return <CoursesBoard courses={result.ok ? result.courses : null} />;
}
