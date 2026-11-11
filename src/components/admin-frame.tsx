"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher, useLanguage } from "@/components/language";
import { adminCopy } from "@/data/admin-i18n";

export function AdminFrame({
  title,
  back = false,
  children,
}: {
  title: string;
  back?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const { lang, ui } = useLanguage();
  const copy = adminCopy[lang];

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-14">
        <LanguageSwitcher compact />
        <div className="mt-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.72rem] tracking-[0.28em] text-[#f4efe6]/60 uppercase">
              La Cocinera Tremenda
            </p>
            <h1 className="mt-3 font-heading text-4xl leading-none font-medium italic sm:text-5xl">
              {title}
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 shrink-0"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.push("/admin");
              router.refresh();
            }}
          >
            {ui.adminLogout}
          </Button>
        </div>
        {back ? (
          <Link
            href="/admin"
            className="mt-5 inline-flex min-h-12 items-center rounded-sm border border-[#f4efe6]/40 px-4 text-sm font-semibold text-[#f4efe6]"
          >
            {copy.back}
          </Link>
        ) : null}
        {children}
      </main>
    </div>
  );
}
