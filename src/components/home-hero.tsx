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

const homeButton = cn(
  buttonVariants({ size: "lg" }),
  "h-12 w-full rounded-sm px-3 text-center text-base font-medium tracking-wide",
);

export function HomeHero() {
  const router = useRouter();
  const taps = useRef({ count: 0, last: 0 });
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) {
        setError(data?.error ?? "Contraseña incorrecta.");
        return;
      }
      setOpen(false);
      router.push("/admin");
      router.refresh();
    } catch {
      setError("No se ha podido entrar. Prueba de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,239,230,0.09),transparent_58%)]"
        aria-hidden="true"
      />
      <div className="relative flex w-full max-w-xl flex-col items-center text-center">
        <button
          type="button"
          onClick={onLogoTap}
          className="rounded-sm border-0 bg-transparent p-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#f4efe6]"
        >
          <Image
            src="/logo.png"
            alt="La Cocinera Tremenda"
            width={351}
            height={323}
            priority
            className="h-auto w-[min(88vw,420px)]"
          />
        </button>

        <h1 className="mt-8 max-w-[12ch] font-display text-[2.65rem] leading-[0.9] font-normal tracking-[-0.03em] text-[#f4efe6] sm:max-w-none sm:text-6xl">
          Gastrobar de especialidad italiana
        </h1>

        <div className="mt-10 grid w-full max-w-md grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-3">
          <Link
            href="/carta"
            className={cn(
              homeButton,
              "bg-[#009246] text-white hover:bg-[#007a3a]",
            )}
          >
            Ver carta
          </Link>
          <Link
            href="/cursos"
            className={cn(
              homeButton,
              "bg-[#f4efe6] text-[#141210] hover:bg-white",
            )}
          >
            Nuestros cursos
          </Link>
          <Link
            href="/contacto"
            className={cn(
              homeButton,
              "bg-[#ce2b37] text-white hover:bg-[#b42330]",
            )}
          >
            Contáctanos
          </Link>
        </div>
      </div>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-4xl font-medium">
              Acceso
            </DialogTitle>
            <DialogDescription>
              Introduce la contraseña para gestionar los cursos.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
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
                Cancelar
              </Button>
              <Button type="submit" className="h-11" disabled={submitting}>
                {submitting ? "Entrando…" : "Entrar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
