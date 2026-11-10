import type { PageKey, ViewBucket } from "@/lib/types";

const pages: PageKey[] = ["inicio", "carta", "cursos", "contacto", "curso"];

export function madridDay(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function shiftDay(day: string, delta: number) {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0, 10);
}

export function isPageKey(value: string): value is PageKey {
  return pages.includes(value as PageKey);
}

export function sumViews(views: ViewBucket[], from: string, to: string) {
  return views.reduce((total, view) => {
    if (view.day >= from && view.day <= to) return total + view.count;
    return total;
  }, 0);
}

export function visitTotals(views: ViewBucket[], today = madridDay()) {
  const weekStart = shiftDay(today, -6);
  const monthStart = `${today.slice(0, 8)}01`;
  return {
    today: sumViews(views, today, today),
    week: sumViews(views, weekStart, today),
    month: sumViews(views, monthStart, today),
  };
}

export function viewsByPage(views: ViewBucket[]) {
  return pages.map((page) => ({
    page,
    count: views.reduce((total, view) => (view.page === page ? total + view.count : total), 0),
  }));
}

const languages = ["es", "it", "en", "fr", "de", "pt", "ja"] as const;

export function dayBreakdown(views: ViewBucket[], day: string) {
  const rows = views.filter((view) => view.day === day);
  const countFor = (match: (view: ViewBucket) => boolean) =>
    rows.reduce((total, view) => (match(view) ? total + view.count : total), 0);
  return {
    total: countFor(() => true),
    pages: pages.map((page) => ({ page, count: countFor((view) => view.page === page) })),
    languages: languages.map((lang) => ({ lang, count: countFor((view) => view.lang === lang) })),
    mobile: countFor((view) => view.device === "mobile"),
    desktop: countFor((view) => view.device === "desktop"),
  };
}

export function dailySeries(views: ViewBucket[], days = 14, today = madridDay()) {
  const series = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const day = shiftDay(today, -offset);
    series.push({
      day,
      count: views.reduce((total, view) => (view.day === day ? total + view.count : total), 0),
    });
  }
  return series;
}
