export type Course = {
  id: string;
  title: string;
  description: string;
  when: string;
  price: string;
  priceCents: number | null;
  images: string[];
  published: boolean;
  maxSeats: number | null;
  updatedAt: string;
};

export type CourseInput = {
  title: string;
  description: string;
  when: string;
  price: string;
  priceCents: number | null;
  images: string[];
  published: boolean;
  maxSeats: number | null;
};

export type SignupStatus = "pendiente" | "pagado" | "cancelado" | "reembolsado";

export type Signup = {
  id: string;
  courseId: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  status: SignupStatus;
  payAtVenue: boolean;
  stripeSessionId: string;
  stripePaymentIntentId: string;
  createdAt: string;
  updatedAt: string;
};

export type Payment = {
  id: string;
  signupId: string;
  courseId: string;
  amountCents: number;
  currency: "eur";
  status: "paid" | "refunded";
  stripeId: string;
  createdAt: string;
};

export type PageKey = "inicio" | "carta" | "cursos" | "contacto" | "curso";
export type DeviceKind = "mobile" | "desktop";

export type ViewBucket = {
  day: string;
  page: PageKey;
  lang: string;
  device: DeviceKind;
  count: number;
};
