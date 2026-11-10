"use client";

import Link from "next/link";
import { AdminFrame } from "@/components/admin-frame";
import { useLanguage } from "@/components/language";
import { adminCopy } from "@/data/admin-i18n";

export function AdminHome() {
  const { lang } = useLanguage();
  const copy = adminCopy[lang];

  return (
    <AdminFrame title={copy.panel}>
      <div className="mt-10 grid gap-4">
        <Link
          href="/admin/visitas"
          className="flex min-h-36 items-center justify-center rounded-md border border-[#009246] bg-[#009246] text-center font-heading text-4xl text-white"
        >
          {copy.visits}
        </Link>
        <Link
          href="/admin/cursos"
          className="flex min-h-36 items-center justify-center rounded-md border border-[#f4efe6] bg-[#f4efe6] text-center font-heading text-4xl text-[#141210]"
        >
          {copy.courses}
        </Link>
      </div>
    </AdminFrame>
  );
}
