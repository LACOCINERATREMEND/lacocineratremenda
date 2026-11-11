import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-8 sm:py-14">
      <PageHeader title={title} />
      <article className="space-y-4 text-base leading-relaxed text-[#f4efe6]/82 [&_h2]:pt-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:text-[#f4efe6] [&_a]:underline [&_a]:decoration-[#ce2b37] [&_a]:underline-offset-4">
        {children}
      </article>
    </main>
  );
}
