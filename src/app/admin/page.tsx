import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin-panel";
import { readCourses } from "@/lib/courses-store";

export const metadata: Metadata = {
  title: "Cursos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const result = await readCourses();
  return <AdminPanel initialCourses={result.courses} />;
}
