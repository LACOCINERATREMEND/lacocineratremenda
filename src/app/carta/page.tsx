import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { menu } from "@/data/menu";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de La Cocinera Tremenda en Sevilla: pasta fresca artesanal, focaccia, piadina, platos, bebidas y menús.",
};

export default function CartaPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader
          title="Carta"
          lede="Pasta fresca artesanal, focaccias, piadinas, platos y menús."
        />
        <div className="space-y-14">
          {menu.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <div className="flex items-end justify-between gap-4 border-b border-[#f4efe6]/15 pb-3">
                <h2
                  id={section.id}
                  className="font-heading text-3xl leading-none font-medium text-[#f4efe6] italic sm:text-4xl"
                >
                  {section.title}
                </h2>
                {section.price ? (
                  <p className="shrink-0 font-sans text-sm tracking-wide text-[#f4efe6] tabular-nums">
                    {section.price}
                  </p>
                ) : null}
              </div>
              {section.note ? (
                <p className="mt-3 text-sm tracking-wide text-italy-green">
                  {section.note}
                </p>
              ) : null}
              <ul className="mt-5 space-y-5">
                {section.items.map((item) => (
                  <li key={`${section.id}-${item.name}`}>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-heading text-[1.65rem] leading-none font-medium text-[#f4efe6]">
                        {item.name}
                      </h3>
                      {item.price ? (
                        <>
                          <span
                            className="mb-1 hidden flex-1 border-b border-dotted border-[#f4efe6]/25 sm:block"
                            aria-hidden="true"
                          />
                          <p className="ml-auto shrink-0 font-sans text-sm text-[#f4efe6] tabular-nums sm:ml-0">
                            {item.price}
                          </p>
                        </>
                      ) : null}
                    </div>
                    {item.detail ? (
                      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-[#c4b8a4]">
                        {item.detail}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
