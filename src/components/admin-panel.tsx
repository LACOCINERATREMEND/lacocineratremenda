"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminVisits } from "@/components/admin-visits";
import { LanguageSwitcher, useLanguage } from "@/components/language";
import { phoneLinks } from "@/lib/seats";
import type { Course, Signup, ViewBucket } from "@/lib/types";

const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

type NewPhoto = { id: string; file: File; preview: string };

const emptyForm = {
  title: "",
  description: "",
  when: "",
  price: "",
  priceEuros: "",
  maxSeats: "",
  published: true,
};

const statusLabel: Record<Signup["status"], string> = {
  pendiente: "Pendiente",
  pagado: "Pagado",
  cancelado: "Cancelado",
  reembolsado: "Reembolsado",
};

export function AdminPanel({
  initialCourses,
  initialSignups,
  initialViews,
  stripeConnected,
}: {
  initialCourses: Course[];
  initialSignups: Signup[];
  initialViews: ViewBucket[];
  stripeConnected: boolean;
}) {
  const router = useRouter();
  const [section, setSection] = useState<"visitas" | "cursos">("visitas");
  const [courses, setCourses] = useState(initialCourses);
  const [signups, setSignups] = useState(initialSignups);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [savedPhotos, setSavedPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<NewPhoto[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const { ui } = useLanguage();

  function messageFor(code: string | undefined) {
    if (code === "title") return ui.adminTitleRequired;
    if (code === "file_type") return ui.adminPhotoType;
    if (code === "file_size") return ui.adminPhotoSize;
    if (code === "too_many") return ui.adminPhotoCount;
    if (code === "seats") return "Las plazas deben ser un número entre 1 y 500.";
    if (code === "price") return "El precio de cobro no es válido.";
    return ui.adminSaveError;
  }

  function clearNewPhotos(photos = newPhotos) {
    photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
  }

  function updateField(
    key: "title" | "description" | "when" | "price" | "priceEuros" | "maxSeats",
    value: string,
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    clearNewPhotos();
    setNewPhotos([]);
    setSavedPhotos([]);
    setForm(emptyForm);
    setEditing(null);
  }

  function seatsTaken(courseId: string) {
    return signups.filter(
      (signup) =>
        signup.courseId === courseId &&
        (signup.status === "pendiente" || signup.status === "pagado"),
    ).length;
  }

  function startEdit(course: Course) {
    clearNewPhotos();
    setNewPhotos([]);
    setEditing(course.id);
    setPendingDelete(null);
    setError("");
    setSavedPhotos(course.images);
    setForm({
      title: course.title,
      description: course.description,
      when: course.when,
      price: course.price,
      priceEuros: course.priceCents == null ? "" : String(course.priceCents / 100),
      maxSeats: course.maxSeats == null ? "" : String(course.maxSeats),
      published: course.published,
    });
  }

  function addPhotos(list: FileList | null) {
    if (!list) return;
    const next = [...newPhotos];
    let problem = "";
    for (const file of Array.from(list)) {
      if (savedPhotos.length + next.length >= MAX_PHOTOS) {
        problem = ui.adminPhotoCount;
        break;
      }
      const allowed =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/webp" ||
        (file.type === "" && /\.(jpe?g|png|webp)$/i.test(file.name));
      if (!allowed) {
        problem = ui.adminPhotoType;
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        problem = ui.adminPhotoSize;
        continue;
      }
      next.push({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      });
    }
    setNewPhotos(next);
    setError(problem);
  }

  function removeNewPhoto(id: string) {
    setNewPhotos((current) => {
      const photo = current.find((item) => item.id === id);
      if (photo) URL.revokeObjectURL(photo.preview);
      return current.filter((item) => item.id !== id);
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = new FormData();
      body.set("title", form.title);
      body.set("description", form.description);
      body.set("when", form.when);
      body.set("price", form.price);
      body.set("priceEuros", form.priceEuros);
      body.set("maxSeats", form.maxSeats);
      body.set("published", form.published ? "1" : "0");
      savedPhotos.forEach((photo) => body.append("keep", photo));
      newPhotos.forEach((photo) => body.append("photos", photo.file));
      const response = await fetch(
        editing ? `/api/courses/${editing}` : "/api/courses",
        {
          method: editing ? "PUT" : "POST",
          body,
        },
      );
      const data = (await response.json().catch(() => null)) as
        | (Course & { error?: string })
        | null;
      if (!response.ok || !data || !data.id) {
        setError(messageFor(data?.error));
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
      setError(ui.adminSaveError);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (!response.ok) {
        setError(ui.adminDeleteError);
        return;
      }
      setCourses((current) => current.filter((course) => course.id !== id));
      setSignups((current) => current.filter((signup) => signup.courseId !== id));
      if (editing === id) resetForm();
      setPendingDelete(null);
      router.refresh();
    } catch {
      setError(ui.adminDeleteError);
    } finally {
      setSaving(false);
    }
  }

  function closePanel() {
    router.push("/");
  }

  async function setSignupStatus(id: string, status: "pagado" | "cancelado") {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/signups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json().catch(() => null)) as Signup | null;
      if (!response.ok || !data?.id) {
        setError(ui.adminSaveError);
        return;
      }
      setSignups((current) => current.map((signup) => (signup.id === data.id ? data : signup)));
      router.refresh();
    } catch {
      setError(ui.adminSaveError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-14">
        <LanguageSwitcher compact />
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] tracking-[0.28em] text-[#f4efe6]/60 uppercase">
              La Cocinera Tremenda
            </p>
            <h1 className="mt-3 font-heading text-4xl leading-none font-medium italic sm:text-5xl">
              {ui.adminCourses}
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 shrink-0"
            onClick={closePanel}
          >
            {ui.adminLogout}
          </Button>
        </div>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-[#c4b8a4]">
          {ui.adminHint}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSection("visitas")}
            className={`min-h-12 rounded-sm border text-sm font-semibold ${section === "visitas" ? "border-[#f4efe6] bg-[#f4efe6] text-[#141210]" : "border-[#f4efe6]/30 text-[#f4efe6]"}`}
          >
            Visitas
          </button>
          <button
            type="button"
            onClick={() => setSection("cursos")}
            className={`min-h-12 rounded-sm border text-sm font-semibold ${section === "cursos" ? "border-[#f4efe6] bg-[#f4efe6] text-[#141210]" : "border-[#f4efe6]/30 text-[#f4efe6]"}`}
          >
            Cursos
          </button>
        </div>
        {section === "visitas" ? <AdminVisits views={initialViews} /> : null}
        {section === "cursos" ? (
        <>

        <form
          onSubmit={onSubmit}
          className="mt-8 grid gap-4 rounded-md border border-[#f4efe6]/25 bg-black/40 p-4 sm:p-5"
        >
          <h2 className="font-heading text-2xl font-medium sm:text-3xl">
            {editing ? ui.adminEdit : ui.adminNew}
          </h2>
          <div className="grid gap-2">
            <Label htmlFor="title">{ui.adminTitle}</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              maxLength={120}
              className="h-12 text-base"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">{ui.adminDescription}</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              maxLength={2000}
              className="min-h-32 text-base"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="when">{ui.adminWhen}</Label>
              <Input
                id="when"
                value={form.when}
                onChange={(event) => updateField("when", event.target.value)}
                maxLength={160}
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">{ui.adminPrice}</Label>
              <Input
                id="price"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                maxLength={40}
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priceEuros">Precio de cobro (€)</Label>
              <Input
                id="priceEuros"
                inputMode="decimal"
                value={form.priceEuros}
                onChange={(event) => updateField("priceEuros", event.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxSeats">Plazas</Label>
              <Input
                id="maxSeats"
                inputMode="numeric"
                value={form.maxSeats}
                onChange={(event) => updateField("maxSeats", event.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
          <label className="flex min-h-12 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
            />
            Visible en la web
          </label>
          <div className="grid gap-2">
            <Label htmlFor="photos">{ui.adminPhotos}</Label>
            <p className="text-sm leading-relaxed text-[#c4b8a4]">{ui.adminPhotosHelp}</p>
            {savedPhotos.length + newPhotos.length > 0 ? (
              <ul className={`grid gap-2 ${savedPhotos.length + newPhotos.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {savedPhotos.map((src) => (
                  <li key={src} className="relative overflow-hidden rounded-sm border border-[#f4efe6]/20">
                    <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSavedPhotos((current) => current.filter((item) => item !== src))}
                      className="absolute right-2 bottom-2 min-h-9 rounded-sm bg-black/80 px-2 text-xs font-semibold text-[#f4efe6]"
                    >
                      {ui.adminRemovePhoto}
                    </button>
                  </li>
                ))}
                {newPhotos.map((photo) => (
                  <li key={photo.id} className="relative overflow-hidden rounded-sm border border-[#f4efe6]/20">
                    <img src={photo.preview} alt="" className="aspect-[4/3] w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewPhoto(photo.id)}
                      className="absolute right-2 bottom-2 min-h-9 rounded-sm bg-black/80 px-2 text-xs font-semibold text-[#f4efe6]"
                    >
                      {ui.adminRemovePhoto}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <label className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-sm border border-[#f4efe6]/55 px-4 text-sm font-semibold text-[#f4efe6]">
              <input
                id="photos"
                type="file"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                multiple
                className="sr-only"
                onChange={(event) => {
                  addPhotos(event.target.files);
                  event.target.value = "";
                }}
              />
              {ui.adminAddPhotos}
            </label>
          </div>
          {error ? (
            <p role="alert" className="text-sm text-italy-red">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="h-12 w-full sm:w-auto" disabled={saving}>
              {saving ? ui.adminSaving : ui.adminSave}
            </Button>
            {editing ? (
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full sm:w-auto"
                onClick={resetForm}
              >
                {ui.adminCancel}
              </Button>
            ) : null}
          </div>
        </form>

        <section className="mt-14" aria-labelledby="lista-cursos">
          <h2 id="lista-cursos" className="font-heading text-3xl font-medium">
            {ui.adminPublished}
          </h2>
          {courses.length === 0 ? (
            <p className="mt-4 text-sm text-[#c4b8a4]">
              {ui.adminEmpty}
            </p>
          ) : (
            <ul className="mt-5 grid gap-3">
              {courses.map((course) => (
                <li key={course.id} className="rounded-md border border-[#f4efe6]/20 p-4">
                  {course.images.length > 0 ? (
                    <div className={`mb-3 grid gap-2 ${course.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {course.images.map((src) => (
                        <img key={src} src={src} alt="" className="aspect-[4/3] w-full rounded-sm object-cover" />
                      ))}
                    </div>
                  ) : null}
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-2xl leading-snug">
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
                  <p className="mt-2 text-sm text-[#c4b8a4]">
                    {course.published ? "Visible" : "Oculto"}
                    {course.maxSeats == null
                      ? ""
                      : ` · ${Math.max(0, course.maxSeats - seatsTaken(course.id))} plazas libres de ${course.maxSeats}`}
                  </p>
                  {course.description ? (
                    <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-[#c4b8a4]">
                      {course.description}
                    </p>
                  ) : null}
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12"
                      onClick={() => startEdit(course)}
                    >
                      {ui.adminEditBtn}
                    </Button>
                    {pendingDelete === course.id ? (
                      <>
                        <Button
                          type="button"
                          variant="destructive"
                          className="h-12"
                          disabled={saving}
                          onClick={() => remove(course.id)}
                        >
                          {ui.adminYes}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-12"
                          onClick={() => setPendingDelete(null)}
                        >
                          {ui.adminNo}
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="button"
                        variant="destructive"
                        className="h-12"
                        onClick={() => setPendingDelete(course.id)}
                      >
                        {ui.adminDelete}
                      </Button>
                    )}
                  </div>
                  {pendingDelete === course.id ? (
                    <p className="mt-2 text-sm text-[#c4b8a4]">
                      {ui.adminConfirm}
                    </p>
                  ) : null}
                  <div className="mt-5 border-t border-[#f4efe6]/15 pt-4">
                    <h4 className="text-sm font-semibold tracking-wide text-[#f4efe6] uppercase">Inscritos</h4>
                    {!stripeConnected ? (
                      <p className="mt-2 text-sm text-[#c4b8a4]">Stripe no conectado. El pago queda pendiente en el local.</p>
                    ) : null}
                    {signups.filter((signup) => signup.courseId === course.id).length === 0 ? (
                      <p className="mt-2 text-sm text-[#c4b8a4]">Nadie inscrito todavía.</p>
                    ) : (
                      <ul className="mt-3 grid gap-3">
                        {signups
                          .filter((signup) => signup.courseId === course.id)
                          .map((signup) => {
                            const links = phoneLinks(signup.phone);
                            return (
                              <li key={signup.id} className="rounded-sm bg-black/30 p-3 text-sm">
                                <p className="font-semibold">{signup.name}</p>
                                <p className="mt-1 break-all text-[#f4efe6]/75">{signup.email}</p>
                                <p className="mt-1">{signup.phone}</p>
                                <p className="mt-1 text-[#f4efe6]/60">
                                  {new Date(signup.createdAt).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}
                                </p>
                                <p className="mt-1 text-italy-green">
                                  {signup.status === "pendiente" && signup.payAtVenue
                                    ? "Pendiente – pagar en el local"
                                    : statusLabel[signup.status]}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {signup.status !== "pagado" && signup.status !== "reembolsado" ? (
                                    <Button type="button" className="h-10" disabled={saving} onClick={() => setSignupStatus(signup.id, "pagado")}>
                                      Marcar pagado
                                    </Button>
                                  ) : null}
                                  {signup.status !== "cancelado" && signup.status !== "reembolsado" ? (
                                    <Button type="button" variant="outline" className="h-10" disabled={saving} onClick={() => setSignupStatus(signup.id, "cancelado")}>
                                      Cancelar
                                    </Button>
                                  ) : null}
                                  <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-sm bg-[#25D366] px-3 font-semibold text-white">
                                    WhatsApp
                                  </a>
                                  <a href={links.tel} className="inline-flex h-10 items-center rounded-sm bg-[#f4efe6] px-3 font-semibold text-[#141210]">
                                    Llamar
                                  </a>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        </>
        ) : null}

        <Link
          href="/"
          className="mt-12 inline-block text-[0.72rem] tracking-[0.28em] text-[#f4efe6]/65 uppercase"
        >
          {ui.home}
        </Link>
      </main>
    </div>
  );
}
