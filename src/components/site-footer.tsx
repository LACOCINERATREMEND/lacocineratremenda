"use client";

import { useLanguage } from "@/components/language";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const { ui } = useLanguage();

  return (
    <footer className={compact ? "px-4 py-1 text-center" : "px-6 py-10 text-center"}>
      <p className={compact ? "font-heading text-lg italic tracking-wide text-[#f4efe6]/80" : "font-heading text-2xl italic tracking-wide text-[#f4efe6]/80"}>
        {ui.city}
      </p>
    </footer>
  );
}
