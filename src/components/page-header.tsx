"use client";

import Link from "next/link";
import { LanguageSwitcher, useLanguage } from "@/components/language";

export function PageHeader({
  title,
  lede,
}: {
  title: string;
  lede?: string;
}) {
  const { ui } = useLanguage();

  return (
    <header className="mb-12 min-w-0">
      <LanguageSwitcher compact />
      <Link
        href="/"
        className="mt-6 inline-block text-[0.72rem] font-medium tracking-[0.28em] text-[#f4efe6]/65 uppercase"
      >
        {ui.home}
      </Link>
      <div className="mt-8 flex h-px w-14" aria-hidden="true">
        <span className="flex-1 bg-italy-green" />
        <span className="flex-1 bg-[#f4efe6]" />
        <span className="flex-1 bg-italy-red" />
      </div>
      <h1 className="mt-5 font-display text-4xl leading-none tracking-tight break-words text-[#f4efe6] sm:text-6xl">
        {title}
      </h1>
      {lede ? (
        <p className="mt-4 max-w-prose text-base leading-relaxed text-[#f4efe6]/75">
          {lede}
        </p>
      ) : null}
    </header>
  );
}
