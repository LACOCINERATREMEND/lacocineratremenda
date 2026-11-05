"use client";

import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { useLanguage } from "@/components/language";
import type { Course } from "@/lib/types";

export function CoursesBoard({
  courses,
}: {
  courses: Course[] | null;
}) {
  const { ui } = useLanguage();

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader title={ui.courses} />
        {courses === null ? (
          <p role="alert" className="text-base leading-relaxed text-[#f4efe6]/80">
            {ui.coursesError}
          </p>
        ) : courses.length === 0 ? (
          <p className="text-base leading-relaxed text-[#f4efe6]/80">{ui.coursesSoon}</p>
        ) : (
          <ul className="divide-y divide-[#f4efe6]/12">
            {courses.map((course) => (
              <li key={course.id} className="py-7 first:pt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-heading text-4xl leading-none font-medium text-[#f4efe6]">
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
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
