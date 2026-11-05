import type { Metadata } from "next";
import Link from "next/link";
import { menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de La Cocinera Tremenda en Sevilla, igual que la pizarra del gastrobar.",
};

export default function CartaPage() {
  return (
    <div className="bg-[#1c120c]">
      <div className="sticky top-0 z-20 flex items-center justify-between bg-[#1c120c]/92 px-4 py-3">
        <Link
          href="/"
          className="text-[0.72rem] font-medium tracking-[0.28em] text-[#f4efe6] uppercase"
        >
          Inicio
        </Link>
      </div>
      <div className="overflow-x-auto">
        <img
          src="/carta.jpg"
          alt="Carta impresa de La Cocinera Tremenda: menús, pasta fresca artesanal, focaccia y piadina, platos y bebidas."
          width={3096}
          height={2189}
          className="mx-auto block h-auto w-full max-w-[1680px]"
        />
      </div>
      <div className="sr-only">
        {menu.map((section) => (
          <section key={section.id}>
            <h2>
              {section.title}
              {section.price ? ` ${section.price}` : ""}
            </h2>
            {section.note ? <p>{section.note}</p> : null}
            <ul>
              {section.items.map((item) => (
                <li key={`${section.id}-${item.name}`}>
                  {item.name}
                  {item.detail ? `. ${item.detail}` : ""}
                  {item.price ? `. ${item.price}` : ""}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
