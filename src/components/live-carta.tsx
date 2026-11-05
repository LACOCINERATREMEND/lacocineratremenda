"use client";

import { useState, type ReactNode } from "react";
import {
  cartaCopy,
  languages,
  type Lang,
  type Named,
  type Priced,
} from "@/data/carta-i18n";

const flags: Record<Lang, ReactNode> = {
  es: <Bands colors={["#c60b1e", "#ffc400", "#c60b1e"]} label="Español" direction="row" />,
  it: <Bands colors={["#009246", "#ffffff", "#ce2b37"]} label="Italiano" />,
  en: <UnionJack />,
  fr: <Bands colors={["#0055a4", "#ffffff", "#ef4135"]} label="Français" />,
  de: <Bands colors={["#000000", "#dd0000", "#ffce00"]} label="Deutsch" direction="row" />,
  pt: <Bands colors={["#006600", "#ff0000"]} label="Português" />,
  ja: <Japan />,
};

function Bands({
  colors,
  label,
  direction = "col",
}: {
  colors: string[];
  label: string;
  direction?: "col" | "row";
}) {
  return (
    <span
      className={`flex h-6 w-9 overflow-hidden rounded-[2px] ring-1 ring-black/30 ${direction === "row" ? "flex-col" : ""}`}
      role="img"
      aria-label={label}
    >
      {colors.map((color) => (
        <span key={color + label} className="flex-1" style={{ background: color }} />
      ))}
    </span>
  );
}

function UnionJack() {
  return (
    <span className="relative block h-6 w-9 overflow-hidden rounded-[2px] bg-[#012169] ring-1 ring-black/30" role="img" aria-label="English">
      <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-white" />
      <span className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-white" />
      <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[#c8102e]" />
      <span className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-[#c8102e]" />
    </span>
  );
}

function Japan() {
  return (
    <span className="flex h-6 w-9 items-center justify-center rounded-[2px] bg-white ring-1 ring-black/20" role="img" aria-label="日本語">
      <span className="size-3 rounded-full bg-[#bc002d]" />
    </span>
  );
}

function Row({ item }: { item: Priced }) {
  return (
    <li className="py-2">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-hand text-[1.65rem] leading-tight text-[#fffb00]">{item.name}</p>
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
  const [lang, setLang] = useState<Lang>("es");
  const copy = cartaCopy[lang];

  return (
    <div>
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#141816]/95 px-3 py-3 backdrop-blur">
        <p className="px-2 text-center font-chalk text-[2.4rem] leading-none text-[#f70000] sm:text-5xl">{copy.menuWord}</p>
        <div className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center justify-center gap-2" role="group" aria-label={copy.menuWord}>
          {languages.map((language) => {
            const active = language.code === lang;
            return (
              <button
                key={language.code}
                type="button"
                aria-pressed={active}
                onClick={() => setLang(language.code)}
                className={`flex min-h-12 min-w-16 items-center gap-2 rounded-sm border px-2 py-1 ${
                  active ? "border-[#fffb00] bg-white/10" : "border-white/25"
                }`}
              >
                {flags[language.code]}
                <span className="font-hand text-lg leading-none text-white">{language.short}</span>
                <span className="sr-only">{language.label}</span>
              </button>
            );
          })}
        </div>
        <nav className="mx-auto mt-3 flex max-w-3xl flex-wrap justify-center gap-2">
          {copy.jumps.map((jump) => (
            <a
              key={jump.id}
              href={`#${jump.id}`}
              className="inline-flex min-h-11 items-center border border-white/40 px-3 font-hand text-lg text-white"
            >
              {jump.label}
            </a>
          ))}
        </nav>
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
                  <h3 className="font-hand text-[1.7rem] leading-tight text-[#fffb00] sm:text-4xl">{menu.name}</h3>
                  <p className="shrink-0 font-hand text-2xl text-white">{menu.price}</p>
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
