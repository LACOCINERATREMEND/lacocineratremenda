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
  const [showPassword, setShowPassword] = useState(false);
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
            <div className="flex gap-2">
              <Input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 flex-1 text-base"
                required
              />
              <button
                type="button"
                aria-pressed={showPassword}
                aria-label={showPassword ? ui.hidePassword : ui.showPassword}
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-sm border border-[#f4efe6]/40 text-[#f4efe6]"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M2.1 3.5 3.5 2.1l18.4 18.4-1.4 1.4-3.1-3.1A11 11 0 0 1 12 20C6.1 20 1.7 15.8.4 12.6a13 13 0 0 1 4.3-5.7L2.1 3.5zM12 8a4 4 0 0 1 4 4c0 .4-.1.8-.2 1.2l-5-5c.4-.1.8-.2 1.2-.2zm-7.2.7A11 11 0 0 0 12 16c.7 0 1.4-.1 2-.2l-1.5-1.5a4 4 0 0 1-5.3-5.3L4.8 8.7zM12 4c5.9 0 10.3 4.2 11.6 7.4a13 13 0 0 1-4.2 5.5l-1.5-1.5a11 11 0 0 0 3.7-4c-1.2-2.6-4.8-6-9.6-6-1 0-1.9.1-2.8.4L8 4.6A12 12 0 0 1 12 4z"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 5C6.1 5 1.7 9.2.4 12.4 1.7 15.8 6.1 20 12 20s10.3-4.2 11.6-7.6C22.3 9.2 17.9 5 12 5zm0 12a4.6 4.6 0 1 1 0-9.2A4.6 4.6 0 0 1 12 17zm0-2.4a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z"
                    />
                  </svg>
                )}
              </button>
            </div>
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
