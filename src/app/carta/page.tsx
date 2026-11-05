import type { Metadata } from "next";
import Link from "next/link";
import { LiveCarta } from "@/components/live-carta";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de La Cocinera Tremenda: menús, pasta fresca, golosidad, focaccia, piadina y bebidas.",
};

export default function CartaPage() {
  return (
    <div className="flex-1 bg-[#101210]">
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex min-h-12 items-center font-hand text-2xl text-white">
          Inicio
        </Link>
      </div>
      <LiveCarta />
    </div>
  );
}
