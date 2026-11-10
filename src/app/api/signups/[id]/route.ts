import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { readCourses } from "@/lib/courses-store";
import { getStore } from "@/lib/storage";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as { status?: unknown } | null;
  const status = body?.status;
  if (status !== "pagado" && status !== "cancelado") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const store = getStore();
  const current = await store.updateSignup(id, { status });
  if (!current) return NextResponse.json({ error: "missing" }, { status: 404 });
  if (status === "pagado") {
    const payments = await store.listPayments();
    if (!payments.some((payment) => payment.signupId === current.id && payment.status === "paid")) {
      const courses = await readCourses();
      const course = courses.courses.find((item) => item.id === current.courseId);
      await store.addPayment({
        signupId: current.id,
        courseId: current.courseId,
        amountCents: course?.priceCents ?? 0,
        currency: "eur",
        status: "paid",
        stripeId: current.stripePaymentIntentId,
      });
    }
  }
  revalidatePath("/cursos");
  revalidatePath(`/cursos/${current.courseId}`);
  return NextResponse.json(current);
}
