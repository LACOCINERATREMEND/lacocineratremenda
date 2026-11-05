import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/admin-panel";
import { isAdmin } from "@/lib/admin-auth";
import { readCourses } from "@/lib/courses-store";

export const metadata: Metadata = {
  title: "Cursos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/");
  const result = await readCourses();
  return <AdminPanel initialCourses={result.courses} />;
}
