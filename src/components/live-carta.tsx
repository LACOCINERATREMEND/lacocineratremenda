"use client";

import Link from "next/link";
import { cartaCopy, type Named, type Priced } from "@/data/carta-i18n";
import { LanguageSwitcher, useLanguage } from "@/components/language";

function Row({ item }: { item: Priced }) {
  return (
    <li className="py-2">
      <div className="flex items-baseline justify-between gap-4">
        <p className="min-w-0 font-hand text-[1.65rem] leading-tight break-words text-[#fffb00]">{item.name}</p>
        {item.price ? (
          <p className="shrink-0 font-hand text-[1.45rem] leading-none text-white">{item.price}</p>
        ) : null}
      </div>
      {item.note ? <p className="font-hand text-xl leading-snug text-white">{item.note}</p> : null}
    </li>
  );
}

function Focus({ item }: { item: Named }) {
  return (
    <li className="py-2.5">
      <p className="font-hand text-[1.7rem] leading-tight text-[#fffb00]">{item.name}</p>
      <p className="font-hand text-xl leading-snug text-white">{item.detail}</p>
    </li>
  );
}

export function LiveCarta() {
  const { lang, ui } = useLanguage();
  const copy = cartaCopy[lang];

  return (
    <div>
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#141816]/95 px-3 py-3 backdrop-blur">
        <Link href="/" className="inline-flex min-h-11 items-center font-hand text-2xl text-white">
          {ui.home}
        </Link>
        <p className="px-4 text-center font-chalk text-[clamp(2.6rem,11vw,4.25rem)] leading-none text-[#f70000]">
          {copy.menuWord}
        </p>
        <LanguageSwitcher className="mx-auto mt-3 max-w-3xl" />
      </div>

      <div
        className="mx-auto max-w-3xl bg-[#1a1c18] bg-cover bg-center px-4 py-8 sm:px-8"
        style={{ backgroundImage: "url(/chalkboard.webp)" }}
      >
        <div className="mx-auto mb-3 h-2 max-w-xs bg-[#4a9905]" />
        <div className="mx-auto mb-8 h-2 max-w-sm bg-[#f70000]" />

        <section id="combo" className="scroll-mt-40 text-center">
          <h2 className="font-chalk text-4xl text-white sm:text-5xl">{copy.combo}</h2>
          <ul className="mx-auto mt-6 max-w-xl space-y-6 text-left">
            {copy.menus.map((menu) => (
              <li key={menu.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="min-w-0 font-hand text-[1.7rem] leading-tight break-words text-[#fffb00] sm:text-4xl">{menu.name}</h3>
                  <p className="shrink-0 font-hand text-2xl whitespace-nowrap text-white">{menu.price}</p>
                </div>
                {menu.lines.map((line) => (
                  <p key={line} className="font-hand text-xl leading-snug text-white">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </section>

        <section id="pasta" className="mt-12 scroll-mt-40 text-center">
          <h2 className="font-chalk text-4xl text-white sm:text-5xl">{copy.pasta}</h2>
          <p className="font-chalk text-3xl text-white">{copy.pastaPrice}</p>
          <ul className="mx-auto mt-4 max-w-xl text-left">
            {copy.pastaItems.map((item) => (
              <Row key={item.name} item={item} />
            ))}
          </ul>
        </section>

        <section id="golosidad" className="mt-12 scroll-mt-40 text-center">
          <h2 className="font-chalk text-4xl text-white sm:text-5xl">{copy.platesTitle}</h2>
          <ul className="mx-auto mt-4 max-w-xl text-left">
            {copy.plates.map((item) => (
              <Row key={item.name} item={item} />
            ))}
          </ul>
        </section>

        <section id="focaccia" className="mt-12 scroll-mt-40 text-center">
          <h2 className="font-chalk text-4xl leading-tight text-white sm:text-5xl">
            {copy.focaccia.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="font-chalk text-3xl text-white">{copy.focacciaPrice}</p>
          <ul className="mx-auto mt-4 max-w-xl text-left">
            {copy.focaccias.map((item) => (
              <Focus key={item.name} item={item} />
            ))}
          </ul>
        </section>

        <section id="bebidas" className="mt-12 scroll-mt-40 text-center">
          <h2 className="font-chalk text-4xl text-white sm:text-5xl">{copy.drinksTitle}</h2>
          <ul className="mx-auto mt-4 max-w-xl text-left">
            {copy.drinks.map((item) => (
              <Row key={item.name} item={item} />
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center font-brush text-5xl text-[#4a9905]">{copy.appetite}</p>
      </div>
    </div>
  );
}
