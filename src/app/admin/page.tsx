import type { Metadata } from "next";
import { AdminHome } from "@/components/admin-home";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminHome />;
}
