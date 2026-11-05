import type { Metadata } from "next";
import { LiveCarta } from "@/components/live-carta";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de La Cocinera Tremenda: menús, pasta fresca, golosidad, focaccia, piadina y bebidas.",
};

export default function CartaPage() {
  return (
    <div className="flex-1 bg-[#101210]">
      <LiveCarta />
    </div>
  );
}
