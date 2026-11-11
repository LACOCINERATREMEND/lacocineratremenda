"use client";

import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { VisitBeacon } from "@/components/visit-beacon";
import { useLanguage } from "@/components/language";
import { signupCopy } from "@/data/signup-i18n";
import type { Course } from "@/lib/types";

export function CoursesBoard({
  courses,
  seats = {},
}: {
  courses: Course[] | null;
  seats?: Record<string, number | null>;
}) {
  const { lang, ui } = useLanguage();
  const copy = signupCopy[lang];

  return (
    <div className="flex flex-1 flex-col">
      <VisitBeacon page="cursos" />
      <main className="mx-auto w-full max-w-2xl min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-14">
        <PageHeader title={ui.courses} />
        {courses === null ? (
          <p role="alert" className="text-base leading-relaxed text-[#f4efe6]/80">
            {ui.coursesError}
          </p>
        ) : courses.length === 0 ? (
          <p className="text-base leading-relaxed text-[#f4efe6]/80">{ui.coursesSoon}</p>
        ) : (
          <ul className="grid gap-4">
            {courses.map((course) => (
              <li key={course.id} className="min-w-0 overflow-hidden rounded-md border border-[#f4efe6]/20">
                {course.images.length > 0 ? (
                  <div className={course.images.length > 1 ? "grid grid-cols-2" : ""}>
                    {course.images.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt={index === 0 ? course.title : ""}
                        className={`w-full object-cover ${
                          course.images.length > 1 &&
                          course.images.length % 2 === 1 &&
                          index === course.images.length - 1
                            ? "col-span-2 aspect-[16/9]"
                            : "aspect-[4/3]"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
                <div className="p-4 sm:p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="min-w-0 font-heading text-3xl leading-snug font-medium break-words text-[#f4efe6] sm:text-4xl">
                    {course.title}
                  </h2>
                  {course.price ? (
                    <p className="shrink-0 font-sans text-sm tabular-nums">{course.price}</p>
                  ) : null}
                </div>
                {course.when ? (
                  <p className="mt-3 text-sm tracking-wide text-italy-green">{course.when}</p>
                ) : null}
                {course.description ? (
                  <p className="mt-3 max-w-prose text-base leading-relaxed whitespace-pre-line text-[#f4efe6]/78">
                    {course.description}
                  </p>
                ) : null}
                {seats[course.id] != null ? (
                  <p className="mt-3 text-sm text-[#f4efe6]/75">{copy.seats(seats[course.id] ?? 0)}</p>
                ) : null}
                <Link href={`/cursos/${course.id}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#f4efe6] underline decoration-[#ce2b37] underline-offset-4">
                  {copy.open}
                </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
