"use client";

import { useLanguage } from "@/components/language";
import { signupCopy } from "@/data/signup-i18n";

export function CourseDetailCopy({ left }: { left: number | null }) {
  const { lang } = useLanguage();
  if (left == null) return null;
  return <p className="mt-3 text-sm text-[#f4efe6]/80">{signupCopy[lang].seats(left)}</p>;
}
