"use client";

import { useMemo, useState } from "react";
import { AdminFrame } from "@/components/admin-frame";
import { useLanguage } from "@/components/language";
import { adminCopy, pageLabelKey } from "@/data/admin-i18n";
import type { ViewBucket } from "@/lib/types";
import { dailySeries, dayBreakdown, viewsByPage, visitTotals } from "@/lib/visits";

function monthParts(day: string) {
  const [year, month] = day.split("-").map(Number);
  return { year, month: month - 1 };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function AdminVisitsScreen({ views, today }: { views: ViewBucket[]; today: string }) {
  const { lang } = useLanguage();
  return (
    <AdminFrame title={adminCopy[lang].visits} back>
      <AdminVisits views={views} today={today} />
    </AdminFrame>
  );
}

function AdminVisits({ views, today }: { views: ViewBucket[]; today: string }) {
  const { lang } = useLanguage();
  const copy = adminCopy[lang];
  const [selected, setSelected] = useState(today);
  const initial = monthParts(today);
  const [cursor, setCursor] = useState(initial);
  const totals = visitTotals(views, today);
  const pages = viewsByPage(views);
  const series = dailySeries(views, 14, today);
  const peak = Math.max(1, ...series.map((day) => day.count));
  const day = dayBreakdown(views, selected);
  const pageName = (page: string) => copy[pageLabelKey[page as keyof typeof pageLabelKey]];

  const cells = useMemo(() => {
    const first = new Date(Date.UTC(cursor.year, cursor.month, 1));
    const lead = (first.getUTCDay() + 6) % 7;
    const count = new Date(Date.UTC(cursor.year, cursor.month + 1, 0)).getUTCDate();
    const items: Array<{ day: string; number: number } | null> = Array.from({ length: lead }, () => null);
    for (let number = 1; number <= count; number += 1) {
      items.push({ day: `${cursor.year}-${pad(cursor.month + 1)}-${pad(number)}`, number });
    }
    return items;
  }, [cursor]);

  function moveMonth(delta: number) {
    const next = new Date(Date.UTC(cursor.year, cursor.month + delta, 1));
    setCursor({ year: next.getUTCFullYear(), month: next.getUTCMonth() });
  }

  const monthTitle = new Intl.DateTimeFormat(lang, { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(cursor.year, cursor.month, 1)),
  );

  return (
    <div className="mt-8">
      <p className="text-sm text-[#c4b8a4]">{copy.visitsNote}</p>
      <dl className="mt-5 grid grid-cols-3 gap-2">
        {[
          [copy.today, totals.today],
          [copy.week, totals.week],
          [copy.month, totals.month],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-[#f4efe6]/20 p-3">
            <dt className="text-xs tracking-wide text-[#f4efe6]/60 uppercase">{label}</dt>
            <dd className="mt-1 font-heading text-3xl">{value}</dd>
          </div>
        ))}
      </dl>
      <h2 className="mt-8 text-sm font-semibold tracking-wide text-[#f4efe6]/70 uppercase">{copy.byPage}</h2>
      <ul className="mt-3 grid gap-2">
        {pages.map((page) => (
          <li key={page.page} className="flex items-center justify-between text-sm">
            <span>{pageName(page.page)}</span>
            <span className="tabular-nums">{page.count}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex h-28 items-end gap-1" aria-hidden="true">
        {series.map((item) => (
          <div key={item.day} className="flex h-full flex-1 items-end">
            <div
              className="w-full rounded-sm bg-[#009246]"
              style={{ height: `${Math.max(item.count === 0 ? 0 : 4, (item.count / peak) * 100)}%` }}
              title={`${item.day}: ${item.count}`}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-[#f4efe6]/50">{copy.last14}</p>

      <section className="mt-8 rounded-md border border-[#f4efe6]/25 p-3" aria-label={copy.dayTotal}>
        <div className="flex items-center justify-between gap-2">
          <button type="button" className="min-h-11 min-w-11 rounded-sm border border-[#f4efe6]/30 px-3" onClick={() => moveMonth(-1)} aria-label={copy.prevMonth}>
            ‹
          </button>
          <h2 className="text-center font-heading text-2xl capitalize">{monthTitle}</h2>
          <button type="button" className="min-h-11 min-w-11 rounded-sm border border-[#f4efe6]/30 px-3" onClick={() => moveMonth(1)} aria-label={copy.nextMonth}>
            ›
          </button>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-[#f4efe6]/55">
          {copy.weekdays.map((name) => (
            <div key={name}>{name}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell, index) =>
            cell ? (
              <button
                key={cell.day}
                type="button"
                onClick={() => setSelected(cell.day)}
                aria-pressed={selected === cell.day}
                className={`min-h-11 rounded-sm border text-sm tabular-nums ${
                  selected === cell.day
                    ? "border-[#f4efe6] bg-[#f4efe6] text-[#141210]"
                    : cell.day === today
                      ? "border-[#009246] text-[#f4efe6]"
                      : "border-[#f4efe6]/15 text-[#f4efe6]"
                }`}
              >
                {cell.number}
              </button>
            ) : (
              <span key={`empty-${index}`} />
            ),
          )}
        </div>
      </section>

      <section className="mt-6" aria-live="polite">
        <h2 className="font-heading text-2xl">{copy.dayTotal}</h2>
        <p className="mt-1 text-sm text-[#c4b8a4]">{selected}</p>
        <p className="mt-3 font-heading text-5xl tabular-nums">{day.total}</p>
        <h3 className="mt-6 text-sm font-semibold tracking-wide text-[#f4efe6]/70 uppercase">{copy.byPage}</h3>
        <ul className="mt-2 grid gap-1 text-sm">
          {day.pages.map((page) => (
            <li key={page.page} className="flex justify-between">
              <span>{pageName(page.page)}</span>
              <span className="tabular-nums">{page.count}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-5 text-sm font-semibold tracking-wide text-[#f4efe6]/70 uppercase">{copy.byLanguage}</h3>
        <ul className="mt-2 grid grid-cols-4 gap-2 text-sm">
          {day.languages.map((item) => (
            <li key={item.lang} className="rounded-sm border border-[#f4efe6]/15 px-2 py-2 text-center">
              <span className="block uppercase">{item.lang}</span>
              <span className="tabular-nums">{item.count}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[#c4b8a4]">
          {copy.mobile} {day.mobile} · {copy.desktop} {day.desktop}
        </p>
      </section>
    </div>
  );
}
