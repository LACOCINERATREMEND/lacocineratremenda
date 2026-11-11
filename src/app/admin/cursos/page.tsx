import type { Metadata } from "next";
import { AdminCourseList } from "@/components/admin-course-list";
import { readCourses } from "@/lib/courses-store";
import { stripeKeyConfigured } from "@/lib/stripe";
import { getStore } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Cursos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const [courses, signups] = await Promise.all([readCourses(), getStore().listSignups()]);
  return (
    <AdminCourseList
      courses={courses.courses}
      signups={signups}
      stripeConnected={stripeKeyConfigured()}
    />
  );
}
