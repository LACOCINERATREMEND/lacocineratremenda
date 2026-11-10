import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripeClient } from "@/lib/stripe";
import { getStore } from "@/lib/storage";

export async function POST(request: Request) {
  const stripe = stripeClient();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "stripe_off" }, { status: 503 });
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const store = getStore();
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const signupId = session.metadata?.signupId || session.client_reference_id;
    if (signupId && session.payment_status === "paid") {
      const paymentIntent =
        typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? "";
      const signup = await store.updateSignup(signupId, {
        status: "pagado",
        payAtVenue: false,
        stripeSessionId: session.id,
        stripePaymentIntentId: paymentIntent,
      });
      if (signup) {
        const payments = await store.listPayments();
        if (!payments.some((payment) => payment.signupId === signup.id && payment.status === "paid")) {
          await store.addPayment({
            signupId: signup.id,
            courseId: signup.courseId,
            amountCents: session.amount_total ?? 0,
            currency: "eur",
            status: "paid",
            stripeId: paymentIntent || session.id,
          });
        }
        revalidatePath(`/cursos/${signup.courseId}`);
      }
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntent = typeof charge.payment_intent === "string" ? charge.payment_intent : "";
    if (paymentIntent) {
      const signups = await store.listSignups();
      const signup = signups.find((item) => item.stripePaymentIntentId === paymentIntent);
      if (signup) {
        await store.updateSignup(signup.id, { status: "reembolsado" });
        await store.markPaymentRefunded(paymentIntent);
        revalidatePath(`/cursos/${signup.courseId}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
