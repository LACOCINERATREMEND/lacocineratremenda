import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { readCourses } from "@/lib/courses-store";

export const metadata: Metadata = {
  title: "Nuestros cursos",
  description: "Cursos de La Cocinera Tremenda en Sevilla.",
};

export const dynamic = "force-dynamic";

export default async function CursosPage() {
  const result = await readCourses();

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader title="Nuestros cursos" />
        {!result.ok ? (
          <p role="alert" className="text-base leading-relaxed text-[#f4efe6]/80">
            No se han podido mostrar los cursos ahora mismo.
          </p>
        ) : result.courses.length === 0 ? (
          <p className="text-base leading-relaxed text-[#f4efe6]/80">
            El contenido llegará pronto.
          </p>
        ) : (
          <ul className="divide-y divide-[#f4efe6]/12">
            {result.courses.map((course) => (
              <li key={course.id} className="py-7 first:pt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-heading text-4xl leading-none font-medium text-[#f4efe6]">
                    {course.title}
                  </h2>
                  {course.price ? (
                    <p className="shrink-0 font-sans text-sm tabular-nums">
                      {course.price}
                    </p>
                  ) : null}
                </div>
                {course.when ? (
                  <p className="mt-3 text-sm tracking-wide text-italy-green">
                    {course.when}
                  </p>
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
