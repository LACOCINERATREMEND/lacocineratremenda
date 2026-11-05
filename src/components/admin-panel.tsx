"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Course } from "@/lib/types";

const emptyForm = {
  title: "",
  description: "",
  when: "",
  price: "",
};

export function AdminPanel({ initialCourses }: { initialCourses: Course[] }) {
  const router = useRouter();
  const [courses, setCourses] = useState(initialCourses);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  function updateField(key: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
  }

  function startEdit(course: Course) {
    setEditing(course.id);
    setPendingDelete(null);
    setError("");
    setForm({
      title: course.title,
      description: course.description,
      when: course.when,
      price: course.price,
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        editing ? `/api/courses/${editing}` : "/api/courses",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = (await response.json().catch(() => null)) as
        | (Course & { error?: string })
        | null;
      if (response.status === 401) {
        router.replace("/");
        return;
      }
      if (!response.ok || !data || !data.id) {
        setError(data?.error ?? "No se ha podido guardar.");
        return;
      }
      setCourses((current) => {
        const next = editing
          ? current.map((course) => (course.id === data.id ? data : course))
          : [data, ...current];
        return next.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      });
      resetForm();
      router.refresh();
    } catch {
      setError("No se ha podido guardar.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (response.status === 401) {
        router.replace("/");
        return;
      }
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "No se ha podido eliminar.");
        return;
      }
      setCourses((current) => current.filter((course) => course.id !== id));
      if (editing === id) resetForm();
      setPendingDelete(null);
      router.refresh();
    } catch {
      setError("No se ha podido eliminar.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] tracking-[0.28em] text-[#f4efe6]/60 uppercase">
              La Cocinera Tremenda
            </p>
            <h1 className="mt-4 font-heading text-5xl leading-none font-medium italic">
              Cursos
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 shrink-0"
            onClick={logout}
          >
            Cerrar sesión
          </Button>
        </div>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-[#c4b8a4]">
          Lo que guardes aquí se publica en Nuestros cursos.
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-4">
          <h2 className="font-heading text-3xl font-medium">
            {editing ? "Editar curso" : "Nuevo curso"}
          </h2>
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="h-11 md:text-base"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              className="min-h-28 md:text-base"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="when">Cuándo</Label>
              <Input
                id="when"
                value={form.when}
                onChange={(event) => updateField("when", event.target.value)}
                className="h-11 md:text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className="h-11 md:text-base"
              />
            </div>
          </div>
          {error ? (
            <p role="alert" className="text-sm text-italy-red">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="h-11" disabled={saving}>
              {saving ? "Guardando…" : "Guardar"}
            </Button>
            {editing ? (
              <Button
                type="button"
                variant="outline"
                className="h-11"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            ) : null}
          </div>
        </form>

        <section className="mt-14" aria-labelledby="lista-cursos">
          <h2 id="lista-cursos" className="font-heading text-3xl font-medium">
            Publicados
          </h2>
          {courses.length === 0 ? (
            <p className="mt-4 text-sm text-[#c4b8a4]">
              Todavía no hay cursos publicados.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-[#f4efe6]/12">
              {courses.map((course) => (
                <li key={course.id} className="py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-3xl leading-none">
                      {course.title}
                    </h3>
                    {course.price ? (
                      <p className="shrink-0 text-sm tabular-nums">
                        {course.price}
                      </p>
                    ) : null}
                  </div>
                  {course.when ? (
                    <p className="mt-2 text-sm text-italy-green">{course.when}</p>
                  ) : null}
                  {course.description ? (
                    <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-[#c4b8a4]">
                      {course.description}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11"
                      onClick={() => startEdit(course)}
                    >
                      Editar
                    </Button>
                    {pendingDelete === course.id ? (
                      <>
                        <Button
                          type="button"
                          variant="destructive"
                          className="h-11"
                          disabled={saving}
                          onClick={() => remove(course.id)}
                        >
                          Sí, eliminar
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-11"
                          onClick={() => setPendingDelete(null)}
                        >
                          No
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        variant="destructive"
                        className="h-11"
                        onClick={() => setPendingDelete(course.id)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                  {pendingDelete === course.id ? (
                    <p className="mt-2 text-sm text-[#c4b8a4]">
                      ¿Eliminar este curso?
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <Link
          href="/"
          className="mt-12 inline-block text-[0.72rem] tracking-[0.28em] text-[#f4efe6]/65 uppercase"
        >
          Inicio
        </Link>
      </main>
    </div>
  );
}
