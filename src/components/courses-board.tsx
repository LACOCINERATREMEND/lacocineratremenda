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
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
