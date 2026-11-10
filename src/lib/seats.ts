import type { Course, Signup } from "@/lib/types";

export function activeSignups(signups: Signup[], courseId: string) {
  return signups.filter(
    (signup) =>
      signup.courseId === courseId &&
      (signup.status === "pendiente" || signup.status === "pagado"),
  );
}

export function seatsLeft(course: Course, signups: Signup[]) {
  if (course.maxSeats == null) return null;
  return Math.max(0, course.maxSeats - activeSignups(signups, course.id).length);
}

export function phoneLinks(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("34") || digits.length > 9 ? digits : `34${digits}`;
  return {
    tel: `tel:+${intl}`,
    whatsapp: `https://wa.me/${intl}`,
  };
}
