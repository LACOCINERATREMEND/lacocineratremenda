"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language";
import { consentCopy } from "@/data/consent-i18n";
import { OPEN_CONSENT_EVENT, readConsent, writeConsent, type ConsentPrefs } from "@/lib/consent";

const emptyPrefs: ConsentPrefs = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

export function ConsentBanner() {
  const pathname = usePathname();
  const { lang, ui } = useLanguage();
  const copy = consentCopy[lang];
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>(emptyPrefs);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (pathname.startsWith("/admin")) {
        setOpen(false);
        return;
      }
      const saved = readConsent();
      setPrefs(saved ?? emptyPrefs);
      setOpen(saved === null);
    });
    const onOpen = () => {
      const saved = readConsent();
      setPrefs(saved ?? emptyPrefs);
      setSettings(true);
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
    document.body.style.paddingBottom = settings ? "28rem" : "14rem";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [open, settings]);

  if (!open || pathname.startsWith("/admin")) return null;

  function finish(next: ConsentPrefs) {
    const value = { ...next, necessary: true as const };
    writeConsent(value);
    setPrefs(value);
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
        className="mx-auto max-h-[70vh] w-full max-w-3xl overflow-y-auto rounded-md border border-[#f4efe6]/30 bg-[#141210] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      >
        <h2 id="consent-title" className="font-heading text-2xl italic">
          {copy.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#f4efe6]/80">{copy.text}</p>
        <p className="mt-2 text-sm">
          <Link href="/privacidad" className="underline decoration-[#ce2b37] underline-offset-4">
            {ui.privacy}
          </Link>
          {" · "}
          <Link href="/cookies" className="underline decoration-[#ce2b37] underline-offset-4">
            {ui.cookiesPolicy}
          </Link>
        </p>
        {settings ? (
          <ul className="mt-4 grid gap-3 text-sm">
            <ToggleRow title={copy.necessary} help={copy.necessaryHelp} checked disabled />
            <ToggleRow
              title={copy.preferences}
              help={copy.preferencesHelp}
              checked={prefs.preferences}
              onChange={(preferences) => setPrefs((current) => ({ ...current, preferences }))}
            />
            <ToggleRow
              title={copy.analytics}
              help={copy.analyticsHelp}
              checked={prefs.analytics}
              onChange={(analytics) => setPrefs((current) => ({ ...current, analytics }))}
            />
            <ToggleRow
              title={copy.marketing}
              help={copy.marketingHelp}
              checked={prefs.marketing}
              onChange={(marketing) => setPrefs((current) => ({ ...current, marketing }))}
            />
          </ul>
        ) : null}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className={button}
            onClick={() => finish({ necessary: true, preferences: true, analytics: true, marketing: true })}
          >
            {copy.accept}
          </button>
          <button type="button" className={button} onClick={() => finish(emptyPrefs)}>
            {copy.reject}
          </button>
          {settings ? (
            <button type="button" className={button} onClick={() => finish(prefs)}>
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

function ToggleRow({
  title,
  help,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  help: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <li className="rounded-sm border border-[#f4efe6]/20 p-3">
      <label className="flex items-start justify-between gap-3">
        <span>
          <span className="block font-semibold">{title}</span>
          <span className="mt-1 block text-[#f4efe6]/75">{help}</span>
        </span>
        <input
          type="checkbox"
          className="mt-1 size-5 shrink-0 accent-[#f4efe6]"
          checked={checked || disabled}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
      </label>
    </li>
  );
}
