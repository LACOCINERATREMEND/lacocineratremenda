import type { Metadata } from "next";
import { AdminPanel } from "@/components/admin-panel";
import { readCourses } from "@/lib/courses-store";
import { stripeConfigured } from "@/lib/stripe";
import { getStore } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Cursos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [courses, store] = await Promise.all([readCourses(), Promise.resolve(getStore())]);
  const [signups, views] = await Promise.all([store.listSignups(), store.listViews()]);
  return (
    <AdminPanel
      initialCourses={courses.courses}
      initialSignups={signups}
      initialViews={views}
      stripeConnected={stripeConfigured()}
    />
  );
}
