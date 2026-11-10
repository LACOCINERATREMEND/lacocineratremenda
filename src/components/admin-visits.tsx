"use client";

import type { ViewBucket } from "@/lib/types";
import { dailySeries, viewsByPage, visitTotals } from "@/lib/visits";

const labels: Record<string, string> = {
  inicio: "Inicio",
  carta: "Carta",
  cursos: "Cursos",
  contacto: "Contacto",
  curso: "Ficha de curso",
};

export function AdminVisits({ views }: { views: ViewBucket[] }) {
  const totals = visitTotals(views);
  const pages = viewsByPage(views);
  const series = dailySeries(views);
  const peak = Math.max(1, ...series.map((day) => day.count));
  const mobile = views.reduce((total, view) => (view.device === "mobile" ? total + view.count : total), 0);
  const desktop = views.reduce((total, view) => (view.device === "desktop" ? total + view.count : total), 0);

  return (
    <section className="mt-8">
      <h2 className="font-heading text-3xl font-medium">Visitas</h2>
      <p className="mt-2 text-sm text-[#c4b8a4]">
        Conteos propios, sin cookies ni datos personales.
      </p>
      <dl className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["Hoy", totals.today],
          ["Semana", totals.week],
          ["Mes", totals.month],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-[#f4efe6]/20 p-3">
            <dt className="text-xs tracking-wide text-[#f4efe6]/60 uppercase">{label}</dt>
            <dd className="mt-1 font-heading text-3xl">{value}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-6 grid gap-2">
        {pages.map((page) => (
          <li key={page.page} className="flex items-center justify-between text-sm">
            <span>{labels[page.page]}</span>
            <span className="tabular-nums">{page.count}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-[#c4b8a4]">
        Móvil {mobile} · Escritorio {desktop}
      </p>
      <div className="mt-6 flex h-28 items-end gap-1" aria-hidden="true">
        {series.map((day) => (
          <div key={day.day} className="flex h-full flex-1 items-end">
            <div
              className="w-full rounded-sm bg-[#009246]"
              style={{ height: `${Math.max(4, (day.count / peak) * 100)}%` }}
              title={`${day.day}: ${day.count}`}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-[#f4efe6]/50">Últimos 14 días</p>
    </section>
  );
}
