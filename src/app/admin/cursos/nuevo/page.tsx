import type { Metadata } from "next";
import { AdminCourseForm } from "@/components/admin-panel";
import { adminBlock } from "@/lib/admin-gate";
import { stripeKeyConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Nuevo curso",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NewCoursePage() {
  const blocked = await adminBlock();
  if (blocked) return blocked;
  return <AdminCourseForm course={null} signups={[]} stripeConnected={stripeKeyConfigured()} />;
}
