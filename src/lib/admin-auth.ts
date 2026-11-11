import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE = "lct_admin";

function expectedPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function isPasswordConfigured() {
  return expectedPassword().length > 0;
}

export function passwordMatches(input: string) {
  const expected = expectedPassword();
  if (!expected || !input) return false;
  const left = createHash("sha256").update(input).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

export function sessionToken() {
  const password = expectedPassword();
  if (!password) return null;
  return createHmac("sha256", password)
    .update("la-cocinera-tremenda-admin")
    .digest("base64url");
}

export async function isAdmin() {
  const expected = sessionToken();
  if (!expected) return false;
  const current = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!current) return false;
  const left = Buffer.from(current);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }
  return null;
}

export function sessionCookieOptions(request: Request) {
  const forwarded = request.headers.get("x-forwarded-proto");
  const secure = forwarded
    ? forwarded.split(",")[0]?.trim() === "https"
    : new URL(request.url).protocol === "https:";

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
