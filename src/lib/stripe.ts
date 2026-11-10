import Stripe from "stripe";
import type { Course, Signup } from "@/lib/types";

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_SITE_URL);
}

export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function createCheckout(course: Course, signup: Signup) {
  const stripe = stripeClient();
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!stripe || !site || !course.priceCents) return null;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: signup.email,
    client_reference_id: signup.id,
    metadata: { signupId: signup.id, courseId: course.id },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: course.priceCents,
          product_data: { name: course.title.slice(0, 120) },
        },
      },
    ],
    success_url: `${site}/cursos/${course.id}?pago=ok`,
    cancel_url: `${site}/cursos/${course.id}?pago=cancelado`,
  });
  return session;
}
