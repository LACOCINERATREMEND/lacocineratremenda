"use client";

import Link from "next/link";
import { AdminFrame } from "@/components/admin-frame";
import { useLanguage } from "@/components/language";
import { adminCopy } from "@/data/admin-i18n";
import { seatsLeft } from "@/lib/seats";
import type { Course, Signup } from "@/lib/types";

export function AdminCourseList({
  courses,
  signups,
}: {
  courses: Course[];
  signups: Signup[];
}) {
  const { lang } = useLanguage();
  const copy = adminCopy[lang];

  return (
    <AdminFrame title={copy.courses} back>
      <Link
        href="/admin/cursos/nuevo"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#009246] px-4 text-base font-semibold text-white"
      >
        {copy.addCourse}
      </Link>
      {courses.length === 0 ? (
        <p className="mt-6 text-sm text-[#c4b8a4]">{copy.emptyCourses}</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {courses.map((course) => {
            const left = seatsLeft(course, signups);
            return (
              <li key={course.id}>
                <Link href={`/admin/cursos/${course.id}`} className="block overflow-hidden rounded-md border border-[#f4efe6]/20">
                  {course.images[0] ? (
                    <img src={course.images[0]} alt="" className="aspect-[16/9] w-full object-cover" />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-[#f4efe6]/5" />
                  )}
                  <div className="p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="min-w-0 font-heading text-2xl leading-snug break-words">{course.title}</h2>
                      {course.price ? <p className="shrink-0 text-sm tabular-nums">{course.price}</p> : null}
                    </div>
                    {course.when ? <p className="mt-2 text-sm text-italy-green">{course.when}</p> : null}
                    <p className="mt-2 text-sm text-[#c4b8a4]">
                      {course.published ? copy.visible : copy.hidden}
                      {" · "}
                      {left == null ? copy.unlimited : copy.seatsFree(left)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </AdminFrame>
  );
}
