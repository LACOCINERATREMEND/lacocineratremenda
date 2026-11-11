import type { Metadata } from "next";
import { AdminVisitsScreen } from "@/components/admin-visits";
import { adminBlock } from "@/lib/admin-gate";
import { getStore } from "@/lib/storage";
import { madridDay } from "@/lib/visits";

export const metadata: Metadata = {
  title: "Visitas",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function VisitsPage() {
  const blocked = await adminBlock();
  if (blocked) return blocked;
  const views = await getStore().listViews();
  return <AdminVisitsScreen views={views} today={madridDay()} />;
}
