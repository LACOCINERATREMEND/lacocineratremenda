"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language";
import { consentCopy } from "@/data/consent-i18n";

const STORAGE_KEY = "lct-consent";
export const OPEN_CONSENT_EVENT = "lct-open-consent";

export function ConsentBanner() {
  const pathname = usePathname();
  const { lang, ui } = useLanguage();
  const copy = consentCopy[lang];
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (pathname.startsWith("/admin")) {
        setOpen(false);
        return;
      }
      const saved = window.localStorage.getItem(STORAGE_KEY);
      setOpen(saved !== "accepted" && saved !== "rejected");
    });
    const onOpen = () => {
      setSettings(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.paddingBottom = "";
      return;
    }
    document.body.style.paddingBottom = settings ? "22rem" : "13rem";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [open, settings]);

  if (!open || pathname.startsWith("/admin")) return null;

  function choose(value: "accepted" | "rejected") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setOpen(false);
    setSettings(false);
  }

  const button =
    "inline-flex min-h-12 flex-1 items-center justify-center rounded-sm border border-[#f4efe6] px-3 text-sm font-semibold text-[#f4efe6]";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6">
      <section
        role="dialog"
        aria-labelledby="consent-title"
        className="mx-auto w-full max-w-3xl rounded-md border border-[#f4efe6]/30 bg-[#141210] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      >
        <h2 id="consent-title" className="font-heading text-2xl italic">
          {copy.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#f4efe6]/80">{copy.text}</p>
        <p className="mt-2 text-sm">
          <Link href="/privacidad" className="underline decoration-[#ce2b37] underline-offset-4">
            {ui.privacy}
          </Link>
        </p>
        {settings ? (
          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-sm border border-[#f4efe6]/20 p-3">
              <p className="font-semibold">{copy.necessary}</p>
              <p className="mt-1 text-[#f4efe6]/75">{copy.necessaryHelp}</p>
            </div>
            <div className="rounded-sm border border-[#f4efe6]/20 p-3">
              <p className="font-semibold">{copy.stats}</p>
              <p className="mt-1 text-[#f4efe6]/75">{copy.statsHelp}</p>
            </div>
          </div>
        ) : null}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button type="button" className={button} onClick={() => choose("accepted")}>
            {copy.accept}
          </button>
          <button type="button" className={button} onClick={() => choose("rejected")}>
            {copy.reject}
          </button>
          {settings ? (
            <button type="button" className={button} onClick={() => choose("accepted")}>
              {copy.save}
            </button>
          ) : (
            <button type="button" className={button} onClick={() => setSettings(true)}>
              {copy.configure}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
