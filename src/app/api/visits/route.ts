import { NextResponse } from "next/server";
import { getStore } from "@/lib/storage";
import { isPageKey, madridDay } from "@/lib/visits";

const languages = new Set(["es", "it", "en", "fr", "de", "pt", "ja"]);

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    page?: unknown;
    lang?: unknown;
    device?: unknown;
  } | null;
  const page = typeof body?.page === "string" ? body.page : "";
  const lang = typeof body?.lang === "string" ? body.lang : "";
  const device = body?.device === "mobile" || body?.device === "desktop" ? body.device : "";
  if (!isPageKey(page) || !languages.has(lang) || !device) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  await getStore().addView({ day: madridDay(), page, lang, device });
  return NextResponse.json({ ok: true });
}
