"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";
import { LanguageSwitcher, useLanguage } from "@/components/language";

const homeButton = cn(
  buttonVariants({ size: "lg" }),
  "h-auto min-h-12 w-full rounded-sm px-1 py-2 text-center text-sm leading-tight font-semibold tracking-tight whitespace-normal sm:min-h-14 sm:px-3 sm:text-lg",
);

export function HomeHero() {
  const router = useRouter();
  const taps = useRef({ count: 0, last: 0 });
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { lang, ui } = useLanguage();

  function onLogoTap() {
    const now = Date.now();
    if (now - taps.current.last > 4500) taps.current.count = 0;
    taps.current.last = now;
    taps.current.count += 1;
    if (taps.current.count >= 5) {
      taps.current.count = 0;
      setError("");
      setOpen(true);
    }
  }

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setPassword("");
      setError("");
      setSubmitting(false);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
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
      setOpen(false);
      router.push("/admin");
      router.refresh();
    } catch {
      setError(ui.loginFail);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-3 pt-2 pb-1 sm:px-6 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,239,230,0.09),transparent_58%)]"
        aria-hidden="true"
      />
      <div className="relative flex w-full max-w-xl flex-col items-center text-center">
        <LanguageSwitcher compact className="mb-1" />
        <button
          type="button"
          onClick={onLogoTap}
          className="rounded-sm border-0 bg-transparent p-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4efe6]"
        >
          <Image
            src="/logo.png"
            alt="La Cocinera Tremenda"
            width={351}
            height={323}
            priority
            className="h-[clamp(220px,40vh,340px)] w-auto max-w-[94vw] object-contain sm:h-auto sm:w-[min(52vw,440px)] sm:max-w-none"
          />
        </button>

        <h1 className="mt-2 w-full font-display text-[clamp(1.7rem,7.4vw,2.35rem)] leading-[0.95] font-normal tracking-[-0.04em] text-[#f4efe6] sm:mt-6 sm:text-7xl">
          {ui.headline.split("\n").map((line) => (
            <span key={line} className="block whitespace-nowrap sm:whitespace-normal">
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-2 grid w-full grid-cols-3 gap-1.5 sm:mt-8 sm:gap-3">
          <Link
            href="/carta"
            className={cn(
              homeButton,
              "bg-[#009246] text-white hover:bg-[#007a3a]",
            )}
          >
            {ui.seeMenu}
          </Link>
          <Link
            href="/cursos"
            className={cn(
              homeButton,
              "bg-[#f4efe6] text-[#141210] hover:bg-white",
            )}
          >
            {ui.courses}
          </Link>
          <Link
            href="/contacto"
            className={cn(
              homeButton,
              "bg-[#ce2b37] text-white hover:bg-[#b42330]",
            )}
          >
            {ui.contact}
          </Link>
        </div>

        <section className="mt-10 w-full text-left sm:mt-14">
          <div className="mb-6 flex h-px w-16" aria-hidden="true">
            <span className="flex-1 bg-italy-green" />
            <span className="flex-1 bg-[#f4efe6]" />
            <span className="flex-1 bg-italy-red" />
          </div>
          <p className="font-heading text-3xl leading-tight font-medium text-[#f4efe6] italic sm:text-4xl">
            {ui.welcomeTitle}
          </p>
          <p className="mt-4 font-heading text-xl leading-snug text-[#f4efe6]/90 italic">
            {ui.welcomeSubtitle}
          </p>
          <div className="mt-6 space-y-5 text-base leading-8 text-[#f4efe6]/85 sm:text-lg">
            {ui.welcome.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 font-heading text-2xl leading-snug font-medium text-[#f4efe6] italic">
            {ui.welcomeClose}
          </p>
          <p className="mt-6 font-brush text-5xl text-[#4a9905]">{ui.welcomeBye}</p>
        </section>

        <section className="mt-14 w-full text-left sm:mt-16">
          <div className="mb-6 flex h-px w-16" aria-hidden="true">
            <span className="flex-1 bg-italy-green" />
            <span className="flex-1 bg-[#f4efe6]" />
            <span className="flex-1 bg-italy-red" />
          </div>
          <h2 className="font-heading text-3xl leading-tight font-medium text-[#f4efe6] italic sm:text-4xl">
            {ui.findTitle}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[#f4efe6]/85 sm:text-lg">
            {ui.find.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 font-heading text-2xl leading-snug font-medium text-[#f4efe6] italic">
            {ui.findBye}
          </p>
          <p className="mt-5 text-base leading-7 text-[#f4efe6] sm:text-lg">
            📍 {ui.address}
          </p>
          <div className="mt-6 overflow-hidden rounded-sm border border-[#f4efe6]/20">
            <iframe
              key={lang}
              title={ui.mapTitle}
              src={`https://maps.google.com/maps?hl=${lang}&q=La%20Cocinera%20Tremenda%2C%20puesto%2013%2C%20Calle%20Pastor%20y%20Landero%208%2C%20Sevilla&z=17&output=embed`}
              className="block h-[min(78vw,420px)] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </div>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-4xl font-medium">
              {ui.access}
            </DialogTitle>
            <DialogDescription>
              {ui.accessHelp}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">{ui.password}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 md:text-base"
                required
              />
            </div>
            {error ? (
              <p role="alert" className="text-sm text-italy-red">
                {error}
              </p>
            ) : null}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11"
                onClick={() => onOpenChange(false)}
              >
                {ui.cancel}
              </Button>
              <Button type="submit" className="h-11" disabled={submitting}>
                {submitting ? ui.entering : ui.enter}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
