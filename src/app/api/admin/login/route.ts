import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  isPasswordConfigured,
  passwordMatches,
  sessionCookieOptions,
  sessionToken,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isPasswordConfigured()) {
    return NextResponse.json(
      { error: "El acceso no está configurado." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    password?: unknown;
  } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!passwordMatches(password)) {
    return NextResponse.json(
      { error: "Contraseña incorrecta." },
      { status: 401 },
    );
  }

  const token = sessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "El acceso no está configurado." },
      { status: 503 },
    );
  }

  (await cookies()).set(ADMIN_COOKIE, token, sessionCookieOptions(request));
  return NextResponse.json({ ok: true });
}
