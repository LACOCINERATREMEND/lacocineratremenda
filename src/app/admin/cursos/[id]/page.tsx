import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminCourseForm } from "@/components/admin-panel";
import { readCourses } from "@/lib/courses-store";
import { stripeKeyConfigured } from "@/lib/stripe";
import { getStore } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Curso",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export default async function EditCoursePage({ params }: Context) {
  const { id } = await params;
  const [courses, signups] = await Promise.all([readCourses(), getStore().listSignups()]);
  const course = courses.courses.find((item) => item.id === id);
  if (!course) notFound();
  return (
    <AdminCourseForm
      course={course}
      signups={signups.filter((signup) => signup.courseId === course.id)}
      stripeConnected={stripeKeyConfigured()}
    />
  );
}
