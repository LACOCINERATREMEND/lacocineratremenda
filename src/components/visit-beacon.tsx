"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/language";
import { CONSENT_EVENT, hasConsent } from "@/lib/consent";
import type { PageKey } from "@/lib/types";

export function VisitBeacon({ page }: { page: PageKey }) {
  const { lang } = useLanguage();

  useEffect(() => {
    function send() {
      if (!hasConsent("analytics")) return;
      const device = window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop";
      void fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, lang, device }),
      }).catch(() => undefined);
    }
    send();
    window.addEventListener(CONSENT_EVENT, send);
    return () => window.removeEventListener(CONSENT_EVENT, send);
  }, [page, lang]);

  return null;
}
