"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language";
import { OPEN_CONSENT_EVENT } from "@/lib/consent";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const { ui } = useLanguage();
  const link = "underline decoration-[#ce2b37] underline-offset-4";

  return (
    <footer className={compact ? "px-4 py-4 text-center" : "px-6 py-10 text-center"}>
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#f4efe6]/80">
        <Link href="/privacidad" className={link}>
          {ui.privacy}
        </Link>
        <Link href="/cookies" className={link}>
          {ui.cookiesPolicy}
        </Link>
        <Link href="/aviso-legal" className={link}>
          {ui.legalNotice}
        </Link>
        <button
          type="button"
          className={link}
          onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
        >
          {ui.cookieSettings}
        </button>
      </nav>
      <p className={compact ? "mt-2 font-heading text-lg italic tracking-wide text-[#f4efe6]/80" : "mt-4 font-heading text-2xl italic tracking-wide text-[#f4efe6]/80"}>
        {ui.city}
      </p>
    </footer>
  );
}
