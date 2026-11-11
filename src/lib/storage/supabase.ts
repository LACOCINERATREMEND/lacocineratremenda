import { randomUUID } from "node:crypto";
import type { Payment, Signup, ViewBucket } from "@/lib/types";
import { supabaseRest as rest } from "@/lib/storage/supabase-client";
import type { DataStore, SignupInput } from "@/lib/storage/types";

function mapSignup(row: Record<string, unknown>): Signup {
  const status = row.status;
  return {
    id: String(row.id),
    courseId: String(row.course_id),
    name: String(row.name),
    phone: String(row.phone),
    email: String(row.email),
    note: typeof row.note === "string" ? row.note : "",
    status:
      status === "pagado" || status === "cancelado" || status === "reembolsado" ? status : "pendiente",
    payAtVenue: row.pay_at_venue === true,
    stripeSessionId: typeof row.stripe_session_id === "string" ? row.stripe_session_id : "",
    stripePaymentIntentId:
      typeof row.stripe_payment_intent_id === "string" ? row.stripe_payment_intent_id : "",
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at ?? row.created_at),
  };
}

function mapPayment(row: Record<string, unknown>): Payment {
  return {
    id: String(row.id),
    signupId: String(row.signup_id),
    courseId: String(row.course_id),
    amountCents: typeof row.amount_cents === "number" ? row.amount_cents : 0,
    currency: "eur",
    status: row.status === "refunded" ? "refunded" : "paid",
    stripeId: typeof row.stripe_id === "string" ? row.stripe_id : "",
    createdAt: String(row.created_at),
  };
}

export const supabaseStore: DataStore = {
  async listSignups() {
    const rows = (await rest("signups?select=*&order=created_at.desc")) as Record<string, unknown>[];
    return rows.map(mapSignup);
  },

  async createSignup(input: SignupInput) {
    const now = new Date().toISOString();
    const id = randomUUID();
    const rows = (await rest("signups", {
      method: "POST",
      body: JSON.stringify({
        id,
        course_id: input.courseId,
        name: input.name,
        phone: input.phone,
        email: input.email,
        note: input.note,
        status: "pendiente",
        pay_at_venue: input.payAtVenue,
        stripe_session_id: input.stripeSessionId ?? "",
        stripe_payment_intent_id: "",
        created_at: now,
        updated_at: now,
      }),
    })) as Record<string, unknown>[];
    return mapSignup(rows[0]);
  },

  async updateSignup(id, patch) {
    const body: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (patch.status) body.status = patch.status;
    if (patch.payAtVenue !== undefined) body.pay_at_venue = patch.payAtVenue;
    if (patch.stripeSessionId !== undefined) body.stripe_session_id = patch.stripeSessionId;
    if (patch.stripePaymentIntentId !== undefined) {
      body.stripe_payment_intent_id = patch.stripePaymentIntentId;
    }
    const rows = (await rest(`signups?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    })) as Record<string, unknown>[];
    return rows[0] ? mapSignup(rows[0]) : null;
  },

  async deleteSignupsForCourse(courseId) {
    await rest(`payments?course_id=eq.${courseId}`, { method: "DELETE" });
    await rest(`signups?course_id=eq.${courseId}`, { method: "DELETE" });
  },

  async listPayments() {
    const rows = (await rest("payments?select=*&order=created_at.desc")) as Record<string, unknown>[];
    return rows.map(mapPayment);
  },

  async addPayment(input) {
    const rows = (await rest("payments", {
      method: "POST",
      body: JSON.stringify({
        id: randomUUID(),
        signup_id: input.signupId,
        course_id: input.courseId,
        amount_cents: input.amountCents,
        currency: input.currency,
        status: input.status,
        stripe_id: input.stripeId,
        created_at: new Date().toISOString(),
      }),
    })) as Record<string, unknown>[];
    return mapPayment(rows[0]);
  },

  async markPaymentRefunded(stripeId) {
    if (!stripeId) return;
    await rest(`payments?stripe_id=eq.${encodeURIComponent(stripeId)}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "refunded" }),
    });
  },

  async listViews() {
    const rows = (await rest("page_views?select=*")) as Record<string, unknown>[];
    return rows.flatMap((row) => {
      const page = row.page;
      const device = row.device;
      if (page !== "inicio" && page !== "carta" && page !== "cursos" && page !== "contacto" && page !== "curso") {
        return [];
      }
      if (device !== "mobile" && device !== "desktop") return [];
      const view: ViewBucket = {
        day: String(row.day),
        page,
        lang: String(row.lang),
        device,
        count: typeof row.count === "number" ? row.count : 0,
      };
      return view.count > 0 ? [view] : [];
    });
  },

  async addView(view) {
    const filter = `page_views?day=eq.${view.day}&page=eq.${view.page}&lang=eq.${view.lang}&device=eq.${view.device}&select=count`;
    const existing = (await rest(filter)) as { count?: number }[];
    if (!existing[0]) {
      await rest("page_views", {
        method: "POST",
        body: JSON.stringify({ ...view, count: 1 }),
      });
      return;
    }
    await rest(
      `page_views?day=eq.${view.day}&page=eq.${view.page}&lang=eq.${view.lang}&device=eq.${view.device}`,
      {
        method: "PATCH",
        body: JSON.stringify({ count: (existing[0].count ?? 0) + 1 }),
      },
    );
  },
};
