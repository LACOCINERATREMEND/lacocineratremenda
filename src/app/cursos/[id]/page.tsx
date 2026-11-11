import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { SignupForm } from "@/components/signup-form";
import { VisitBeacon } from "@/components/visit-beacon";
import { readCourses } from "@/lib/courses-store";
import { seatsLeft } from "@/lib/seats";
import { getStore } from "@/lib/storage";
import { CourseDetailCopy } from "@/components/course-detail";

type Context = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Context): Promise<Metadata> {
  const { id } = await params;
  const courses = await readCourses();
  const course = courses.courses.find((item) => item.id === id);
  return { title: course?.title ?? "Curso", robots: { index: false, follow: false } };
}

export default async function CoursePage({ params }: Context) {
  const { id } = await params;
  const courses = await readCourses();
  const course = courses.courses.find((item) => item.id === id && item.published);
  if (!course) notFound();
  const signups = await getStore().listSignups();
  const left = seatsLeft(course, signups);

  return (
    <div className="flex flex-1 flex-col">
      <VisitBeacon page="curso" />
      <main className="mx-auto w-full max-w-2xl min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-14">
        <PageHeader title={course.title} />
        {course.images.length > 0 ? (
          <div className="mb-6 grid grid-cols-2 gap-2">
            {course.images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={index === 0 ? course.title : ""}
                className={`w-full rounded-md object-cover ${index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
              />
            ))}
          </div>
        ) : null}
        {course.when ? <p className="text-sm tracking-wide text-italy-green">{course.when}</p> : null}
        {course.price ? <p className="mt-2 text-sm tabular-nums">{course.price}</p> : null}
        <CourseDetailCopy left={left} />
        {course.description ? (
          <p className="mt-4 max-w-prose text-base leading-relaxed whitespace-pre-line text-[#f4efe6]/78">
            {course.description}
          </p>
        ) : null}
        <SignupForm courseId={course.id} disabled={left === 0} />
      </main>
    </div>
  );
}
