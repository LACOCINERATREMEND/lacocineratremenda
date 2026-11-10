import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { readCourses } from "@/lib/courses-store";
import { seatsLeft } from "@/lib/seats";
import { createCheckout, stripeConfigured } from "@/lib/stripe";
import { getStore } from "@/lib/storage";

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const courseId = clean(body?.courseId, 80);
  const name = clean(body?.name, 80);
  const phone = clean(body?.phone, 30);
  const email = clean(body?.email, 120).toLowerCase();
  const note = typeof body?.note === "string" ? body.note.replace(/\r\n/g, "\n").trim().slice(0, 500) : "";
  if (name.length < 2) return NextResponse.json({ error: "name" }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 6) return NextResponse.json({ error: "phone" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "email" }, { status: 400 });
  }

  const courses = await readCourses();
  const course = courses.courses.find((item) => item.id === courseId && item.published);
  if (!course) return NextResponse.json({ error: "missing" }, { status: 404 });

  const store = getStore();
  const signups = await store.listSignups();
  const left = seatsLeft(course, signups);
  if (left === 0) return NextResponse.json({ error: "full" }, { status: 409 });

  const payAtVenue = !stripeConfigured() || !course.priceCents;
  const signup = await store.createSignup({
    courseId: course.id,
    name,
    phone,
    email,
    note,
    payAtVenue,
  });

  let checkoutUrl: string | null = null;
  if (!payAtVenue) {
    try {
      const session = await createCheckout(course, signup);
      if (session?.url && session.id) {
        checkoutUrl = session.url;
        await store.updateSignup(signup.id, { stripeSessionId: session.id });
      }
    } catch {
      await store.updateSignup(signup.id, { payAtVenue: true });
    }
  }

  revalidatePath("/cursos");
  revalidatePath(`/cursos/${course.id}`);
  return NextResponse.json({ signup, checkoutUrl, payAtVenue: checkoutUrl ? false : true }, { status: 201 });
}
