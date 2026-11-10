import type { Payment, Signup, SignupStatus, ViewBucket } from "@/lib/types";

export type SignupInput = {
  courseId: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  payAtVenue: boolean;
  stripeSessionId?: string;
};

export type DataStore = {
  listSignups(): Promise<Signup[]>;
  createSignup(input: SignupInput): Promise<Signup>;
  updateSignup(
    id: string,
    patch: Partial<Pick<Signup, "status" | "stripeSessionId" | "stripePaymentIntentId" | "payAtVenue">>,
  ): Promise<Signup | null>;
  deleteSignupsForCourse(courseId: string): Promise<void>;
  listPayments(): Promise<Payment[]>;
  addPayment(input: Omit<Payment, "id" | "createdAt">): Promise<Payment>;
  markPaymentRefunded(stripeId: string): Promise<void>;
  listViews(): Promise<ViewBucket[]>;
  addView(view: Omit<ViewBucket, "count">): Promise<void>;
};

export type SignupPatch = {
  status?: SignupStatus;
};
