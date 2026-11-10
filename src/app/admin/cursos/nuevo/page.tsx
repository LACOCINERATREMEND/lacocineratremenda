import type { Metadata } from "next";
import { AdminCourseForm } from "@/components/admin-panel";
import { stripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Nuevo curso",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function NewCoursePage() {
  return <AdminCourseForm course={null} signups={[]} stripeConnected={stripeConfigured()} />;
}
