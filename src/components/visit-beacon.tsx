"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/language";
import type { PageKey } from "@/lib/types";

export function VisitBeacon({ page }: { page: PageKey }) {
  const { lang } = useLanguage();

  useEffect(() => {
    const device = window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop";
    void fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, lang, device }),
    }).catch(() => undefined);
  }, [page, lang]);

  return null;
}
