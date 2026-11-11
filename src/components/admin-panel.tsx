"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminFrame } from "@/components/admin-frame";
import { useLanguage } from "@/components/language";
import { adminCopy } from "@/data/admin-i18n";
import { phoneLinks } from "@/lib/seats";
import type { Course, Signup } from "@/lib/types";

const MAX_PHOTO_BYTES = 15 * 1024 * 1024;
const MAX_EDGE = 2000;

type NewPhoto = { id: string; file: File; preview: string };

const emptyForm = {
  title: "",
  description: "",
  when: "",
  price: "",
  maxSeats: "",
  published: true,
};

function priceInput(course: Course) {
  if (course.priceCents == null) return "";
  const euros = course.priceCents / 100;
  return Number.isInteger(euros) ? String(euros) : euros.toFixed(2).replace(".", ",");
}

function formFrom(course: Course | null) {
  if (!course) return emptyForm;
  return {
    title: course.title,
    description: course.description,
    when: course.when,
    price: priceInput(course),
    maxSeats: course.maxSeats == null ? "" : String(course.maxSeats),
    published: course.published,
  };
}

async function shrinkPhoto(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
  if (!blob) throw new Error("blob");
  const name = file.name.replace(/\.[^.]+$/, "") || "foto";
  return new File([blob], `${name}.jpg`, { type: "image/jpeg" });
}

export function AdminCourseForm({
  course,
  signups: initialSignups,
  directUpload = false,
}: {
  course: Course | null;
  signups: Signup[];
  directUpload?: boolean;
}) {
  const router = useRouter();
  const [signups, setSignups] = useState(initialSignups);
  const [form, setForm] = useState(() => formFrom(course));
  const [editing, setEditing] = useState<string | null>(course?.id ?? null);
  const [savedPhotos, setSavedPhotos] = useState<string[]>(course?.images ?? []);
  const [newPhotos, setNewPhotos] = useState<NewPhoto[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const { lang, ui } = useLanguage();
  const copy = adminCopy[lang];

  function messageFor(code: string | undefined) {
    if (code === "title") return ui.adminTitleRequired;
    if (code === "file_type") return ui.adminPhotoType;
    if (code === "file_size") return ui.adminPhotoSize;
    if (code === "too_many") return ui.adminPhotoCount;
    if (code === "seats") return adminCopy[lang].seatsError;
    if (code === "price") return adminCopy[lang].priceError;
    return ui.adminSaveError;
  }

  function clearNewPhotos(photos = newPhotos) {
    photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
  }

  function updateField(
    key: "title" | "description" | "when" | "price" | "maxSeats",
    value: string,
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function addPhotos(list: FileList | null) {
    if (!list) return;
    const next = [...newPhotos];
    let problem = "";
    for (const original of Array.from(list)) {
      const allowed =
        original.type === "image/jpeg" ||
        original.type === "image/jpg" ||
        original.type === "image/png" ||
        original.type === "image/webp" ||
        (original.type === "" && /\.(jpe?g|png|webp)$/i.test(original.name));
      if (!allowed) {
        problem = ui.adminPhotoType;
        continue;
      }
      if (original.size > MAX_PHOTO_BYTES) {
        problem = ui.adminPhotoSize;
        continue;
      }
      try {
        const file = await shrinkPhoto(original);
        next.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
        });
      } catch {
        problem = ui.adminPhotoType;
      }
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
      body.set("maxSeats", form.maxSeats);
      body.set("published", form.published ? "1" : "0");
      const response = await (async () => {
        const courseUrl = editing ? `/api/courses/${editing}` : "/api/courses";
        const method = editing ? "PUT" : "POST";
        if (!directUpload) {
          savedPhotos.forEach((photo) => body.append("keep", photo));
          newPhotos.forEach((photo) => body.append("photos", photo.file));
          return fetch(courseUrl, { method, body });
        }
        const uploaded: { publicUrl: string }[] = [];
        if (newPhotos.length > 0) {
        const signed = await fetch("/api/admin/course-photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            files: newPhotos.map((photo) => ({ contentType: photo.file.type || "image/jpeg" })),
          }),
        });
        if (signed.status === 401) return signed;
        if (!signed.ok) throw new Error("signed_upload");
        const payload = (await signed.json()) as {
          uploads: { signedUrl: string; token: string; publicUrl: string }[];
        };
        await Promise.all(
          payload.uploads.map((upload, index) => {
            const file = newPhotos[index]?.file;
            if (!file) throw new Error("signed_upload");
            const headers: Record<string, string> = {
              "Content-Type": file.type || "image/jpeg",
              "x-upsert": "true",
            };
            if (upload.token) headers.Authorization = `Bearer ${upload.token}`;
            return fetch(upload.signedUrl, { method: "PUT", headers, body: file }).then((result) => {
              if (!result.ok) throw new Error("signed_upload");
            });
          }),
        );
        uploaded.push(...payload.uploads);
        }
        return fetch(courseUrl, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            when: form.when,
            price: form.price,
            maxSeats: form.maxSeats,
            published: form.published ? "1" : "0",
            images: [...savedPhotos, ...uploaded.map((upload) => upload.publicUrl)],
          }),
        });
      })();
      const data = (await response.json().catch(() => null)) as
        | (Course & { error?: string })
        | null;
      if (response.status === 401) {
        router.refresh();
        return;
      }
      if (!response.ok || !data || !data.id) {
        setError(messageFor(data?.error));
        return;
      }
      clearNewPhotos();
      setNewPhotos([]);
      setSavedPhotos(data.images);
      setForm(formFrom(data));
      setEditing(data.id);
      router.push(`/admin/cursos/${data.id}`);
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
      if (response.status === 401) {
        router.refresh();
        return;
      }
      if (!response.ok) {
        setError(ui.adminDeleteError);
        return;
      }
      setPendingDelete(null);
      router.push("/admin/cursos");
      router.refresh();
    } catch {
      setError(ui.adminDeleteError);
    } finally {
      setSaving(false);
    }
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
      if (response.status === 401) {
        router.refresh();
        return;
      }
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
    <AdminFrame title={editing ? ui.adminEdit : ui.adminNew} back>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-[#c4b8a4]">
          {ui.adminHint}
        </p>
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
                inputMode="decimal"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                maxLength={12}
                placeholder="25"
                className="h-12 text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxSeats">{copy.seatsField}</Label>
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
            {copy.visibleWeb}
          </label>
          <div className="grid gap-2">
            <Label htmlFor="photos">{ui.adminPhotos}</Label>
            <p className="text-sm leading-relaxed text-[#c4b8a4]">{ui.adminPhotosHelp}</p>
            {savedPhotos.length + newPhotos.length > 0 ? (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                  void addPhotos(event.target.files);
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
                onClick={() => router.push("/admin/cursos")}
              >
                {ui.adminCancel}
              </Button>
            ) : null}
          </div>
        </form>

        {editing ? (
          <div className="mt-6">
            {pendingDelete === editing ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="destructive" className="h-12" disabled={saving} onClick={() => remove(editing)}>
                  {ui.adminYes}
                </Button>
                <Button type="button" variant="outline" className="h-12" onClick={() => setPendingDelete(null)}>
                  {ui.adminNo}
                </Button>
              </div>
            ) : (
              <Button type="button" variant="destructive" className="h-12" onClick={() => setPendingDelete(editing)}>
                {ui.adminDelete}
              </Button>
            )}
            {pendingDelete === editing ? <p className="mt-2 text-sm text-[#c4b8a4]">{ui.adminConfirm}</p> : null}
          </div>
        ) : null}

        {editing ? (
          <section className="mt-10 border-t border-[#f4efe6]/15 pt-6">
            <h2 className="text-sm font-semibold tracking-wide uppercase">{copy.enrolled}</h2>
            <p className="mt-2 text-sm text-[#c4b8a4]">{copy.payInPerson}</p>
            {signups.length === 0 ? (
              <p className="mt-2 text-sm text-[#c4b8a4]">{copy.nobody}</p>
            ) : (
              <ul className="mt-3 grid gap-3">
                {signups.map((signup) => {
                  const links = phoneLinks(signup.phone);
                  const label =
                    signup.status === "pendiente" && signup.payAtVenue
                      ? copy.pendingLocal
                      : signup.status === "pagado"
                        ? copy.paid
                        : signup.status === "cancelado"
                          ? copy.cancelled
                          : signup.status === "reembolsado"
                            ? copy.refunded
                            : copy.pending;
                  return (
                    <li key={signup.id} className="rounded-sm bg-black/30 p-3 text-sm">
                      <p className="font-semibold">{signup.name}</p>
                      <p className="mt-1 break-all text-[#f4efe6]/75">{signup.email}</p>
                      <p className="mt-1">{signup.phone}</p>
                      <p className="mt-1 text-[#f4efe6]/60">
                        {new Date(signup.createdAt).toLocaleString(lang, { timeZone: "Europe/Madrid" })}
                      </p>
                      <p className="mt-1 text-italy-green">{label}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {signup.status !== "pagado" && signup.status !== "reembolsado" ? (
                          <Button type="button" className="h-10" disabled={saving} onClick={() => setSignupStatus(signup.id, "pagado")}>
                            {copy.markPaid}
                          </Button>
                        ) : null}
                        {signup.status !== "cancelado" && signup.status !== "reembolsado" ? (
                          <Button type="button" variant="outline" className="h-10" disabled={saving} onClick={() => setSignupStatus(signup.id, "cancelado")}>
                            {copy.cancelSignup}
                          </Button>
                        ) : null}
                        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-sm bg-[#25D366] px-3 font-semibold text-white">
                          WhatsApp
                        </a>
                        <a href={links.tel} className="inline-flex h-10 items-center rounded-sm bg-[#f4efe6] px-3 font-semibold text-[#141210]">
                          {ui.contactCall}
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ) : null}
    </AdminFrame>
  );
}
