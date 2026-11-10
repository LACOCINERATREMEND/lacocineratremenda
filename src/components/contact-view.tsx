"use client";

import { PageHeader } from "@/components/page-header";
import { VisitBeacon } from "@/components/visit-beacon";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/components/language";

export function ContactView() {
  const { ui } = useLanguage();

  return (
    <div className="flex flex-1 flex-col">
      <VisitBeacon page="contacto" />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader title={ui.contact} lede={ui.contactLede} />
        <p className="max-w-prose text-base leading-relaxed text-[#f4efe6]/78">
          {ui.contactBody}
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
