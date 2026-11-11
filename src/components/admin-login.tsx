"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher, useLanguage } from "@/components/language";

export function AdminLogin() {
  const router = useRouter();
  const { ui } = useLanguage();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(response.status === 401 ? ui.badPassword : ui.loginFail);
        return;
      }
      setPassword("");
      router.refresh();
    } catch {
      setError(ui.loginFail);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-8">
        <LanguageSwitcher compact />
        <p className="mt-8 text-[0.72rem] tracking-[0.28em] text-[#f4efe6]/60 uppercase">
          La Cocinera Tremenda
        </p>
        <h1 className="mt-3 font-heading text-4xl italic">{ui.access}</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#c4b8a4]">{ui.accessHelp}</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="admin-password">{ui.password}</Label>
            <Input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 text-base"
              required
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-italy-red">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="h-12" disabled={saving}>
            {saving ? ui.entering : ui.enter}
          </Button>
        </form>
      </main>
    </div>
  );
}

export function AdminLocked() {
  const { ui } = useLanguage();
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-8">
        <LanguageSwitcher compact />
        <p className="mt-8 text-[0.72rem] tracking-[0.28em] text-[#f4efe6]/60 uppercase">
          La Cocinera Tremenda
        </p>
        <h1 className="mt-3 font-heading text-4xl italic">{ui.access}</h1>
        <p role="alert" className="mt-4 text-sm leading-relaxed text-[#c4b8a4]">
          {ui.passwordMissing}
        </p>
      </main>
    </div>
  );
}
