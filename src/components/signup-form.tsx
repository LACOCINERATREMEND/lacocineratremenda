"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/language";
import { signupCopy } from "@/data/signup-i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SignupForm({
  courseId,
  disabled,
  initialNotice,
}: {
  courseId: string;
  disabled: boolean;
  initialNotice?: "paid" | "cancel" | null;
}) {
  const { lang, ui } = useLanguage();
  const copy = signupCopy[lang];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(initialNotice === "paid" ? copy.okPaid : "");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, name, phone, email, note }),
      });
      if (response.status === 409) {
        setError(copy.full);
        return;
      }
      if (!response.ok) {
        setError(copy.invalid);
        return;
      }
      setDone(copy.okLocal);
      setName("");
      setPhone("");
      setEmail("");
      setNote("");
    } catch {
      setError(copy.invalid);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-md border border-[#f4efe6]/25 p-4">
      <h2 className="font-heading text-3xl font-medium">{copy.title}</h2>
      <p className="text-sm leading-relaxed text-[#f4efe6]/80">{copy.payInPerson}</p>
      {initialNotice === "cancel" && !done ? (
        <p className="text-sm text-[#f4efe6]/80">{copy.payCancel}</p>
      ) : null}
      {done ? <p className="text-sm text-italy-green">{done}</p> : null}
      <div className="grid gap-2">
        <Label htmlFor="signup-name">{copy.name}</Label>
        <Input id="signup-name" value={name} onChange={(event) => setName(event.target.value)} required className="h-12 text-base" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="signup-phone">{copy.phone}</Label>
        <Input id="signup-phone" value={phone} onChange={(event) => setPhone(event.target.value)} required inputMode="tel" className="h-12 text-base" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="signup-email">{copy.email}</Label>
        <Input id="signup-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="h-12 text-base" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="signup-note">{copy.note}</Label>
        <Textarea id="signup-note" value={note} onChange={(event) => setNote(event.target.value)} className="min-h-24 text-base" />
      </div>
      <p className="text-sm leading-relaxed text-[#f4efe6]/75">
        {copy.consent}{" "}
        <Link href="/privacidad" className="underline decoration-[#ce2b37] underline-offset-4">
          {ui.privacy}
        </Link>
      </p>
      {error ? (
        <p role="alert" className="text-sm text-italy-red">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="h-12" disabled={disabled || saving}>
        {saving ? copy.sending : copy.send}
      </Button>
    </form>
  );
}
