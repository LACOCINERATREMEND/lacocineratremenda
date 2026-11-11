import type { Metadata } from "next";
import { AdminHome } from "@/components/admin-home";
import { adminBlock } from "@/lib/admin-gate";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const blocked = await adminBlock();
  if (blocked) return blocked;
  return <AdminHome />;
}
