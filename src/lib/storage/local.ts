import { randomUUID } from "node:crypto";
import type { Payment, Signup, ViewBucket } from "@/lib/types";
import { readJson, writeJson } from "@/lib/storage/files";
import type { DataStore, SignupInput } from "@/lib/storage/types";

function asSignup(value: unknown): Signup | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<Signup>;
  if (
    typeof row.id !== "string" ||
    typeof row.courseId !== "string" ||
    typeof row.name !== "string" ||
    typeof row.phone !== "string" ||
    typeof row.email !== "string" ||
    typeof row.createdAt !== "string"
  ) {
    return null;
  }
  const status = row.status;
  if (status !== "pendiente" && status !== "pagado" && status !== "cancelado" && status !== "reembolsado") {
    return null;
  }
  return {
    id: row.id,
    courseId: row.courseId,
    name: row.name,
    phone: row.phone,
    email: row.email,
    note: typeof row.note === "string" ? row.note : "",
    status,
    payAtVenue: row.payAtVenue === true,
    stripeSessionId: typeof row.stripeSessionId === "string" ? row.stripeSessionId : "",
    stripePaymentIntentId: typeof row.stripePaymentIntentId === "string" ? row.stripePaymentIntentId : "",
    createdAt: row.createdAt,
    updatedAt: typeof row.updatedAt === "string" ? row.updatedAt : row.createdAt,
  };
}

function asPayment(value: unknown): Payment | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<Payment>;
  if (typeof row.id !== "string" || typeof row.signupId !== "string" || typeof row.courseId !== "string") {
    return null;
  }
  if (row.status !== "paid" && row.status !== "refunded") return null;
  return {
    id: row.id,
    signupId: row.signupId,
    courseId: row.courseId,
    amountCents: typeof row.amountCents === "number" ? row.amountCents : 0,
    currency: "eur",
    status: row.status,
    stripeId: typeof row.stripeId === "string" ? row.stripeId : "",
    createdAt: typeof row.createdAt === "string" ? row.createdAt : new Date().toISOString(),
  };
}

const pages = new Set(["inicio", "carta", "cursos", "contacto", "curso"]);

function asView(value: unknown): ViewBucket | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<ViewBucket>;
  if (typeof row.day !== "string" || typeof row.page !== "string" || typeof row.lang !== "string") return null;
  if (!pages.has(row.page)) return null;
  if (row.device !== "mobile" && row.device !== "desktop") return null;
  return {
    day: row.day,
    page: row.page,
    lang: row.lang,
    device: row.device,
    count: typeof row.count === "number" && row.count > 0 ? Math.floor(row.count) : 0,
  };
}

export const localStore: DataStore = {
  async listSignups() {
    const rows = await readJson<unknown[]>("signups.json", []);
    return rows.flatMap((row) => {
      const signup = asSignup(row);
      return signup ? [signup] : [];
    });
  },

  async createSignup(input: SignupInput) {
    const rows = await this.listSignups();
    const now = new Date().toISOString();
    const signup: Signup = {
      id: randomUUID(),
      courseId: input.courseId,
      name: input.name,
      phone: input.phone,
      email: input.email,
      note: input.note,
      status: "pendiente",
      payAtVenue: input.payAtVenue,
      stripeSessionId: input.stripeSessionId ?? "",
      stripePaymentIntentId: "",
      createdAt: now,
      updatedAt: now,
    };
    await writeJson("signups.json", [signup, ...rows]);
    return signup;
  },

  async updateSignup(id, patch) {
    const rows = await this.listSignups();
    const existing = rows.find((row) => row.id === id);
    if (!existing) return null;
    const updated: Signup = {
      ...existing,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    await writeJson(
      "signups.json",
      rows.map((row) => (row.id === id ? updated : row)),
    );
    return updated;
  },

  async deleteSignupsForCourse(courseId) {
    const rows = await this.listSignups();
    await writeJson(
      "signups.json",
      rows.filter((row) => row.courseId !== courseId),
    );
    const payments = await this.listPayments();
    await writeJson(
      "payments.json",
      payments.filter((row) => row.courseId !== courseId),
    );
  },

  async listPayments() {
    const rows = await readJson<unknown[]>("payments.json", []);
    return rows.flatMap((row) => {
      const payment = asPayment(row);
      return payment ? [payment] : [];
    });
  },

  async addPayment(input) {
    const rows = await this.listPayments();
    const payment: Payment = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await writeJson("payments.json", [payment, ...rows]);
    return payment;
  },

  async markPaymentRefunded(stripeId) {
    if (!stripeId) return;
    const rows = await this.listPayments();
    await writeJson(
      "payments.json",
      rows.map((row) => (row.stripeId === stripeId ? { ...row, status: "refunded" as const } : row)),
    );
  },

  async listViews() {
    const rows = await readJson<unknown[]>("page-views.json", []);
    return rows.flatMap((row) => {
      const view = asView(row);
      return view && view.count > 0 ? [view] : [];
    });
  },

  async addView(view) {
    const rows = await this.listViews();
    const index = rows.findIndex(
      (row) =>
        row.day === view.day &&
        row.page === view.page &&
        row.lang === view.lang &&
        row.device === view.device,
    );
    if (index === -1) {
      rows.push({ ...view, count: 1 });
    } else {
      rows[index] = { ...rows[index], count: rows[index].count + 1 };
    }
    await writeJson("page-views.json", rows);
  },
};
