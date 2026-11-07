"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "cn";
import { LanguageSwitcher, useLanguage } from "@/components/language";

const pressAppearances = [
  {
    kind: "tv" as const,
    outlet: "Canal Sur",
    headline:
      "La tradición artesanal de la pasta calabresa conquista Sevilla",
    href: "https://www.canalsur.es/television/la-tarde-aqui-y-ahora/tradicion-artesanal-pasta-calabresa-conquista_1_1448184.html",
    image: "/press/canal-sur.jpg",
  },
  {
    kind: "press" as const,
    outlet: "La Voz del Sur",
    headline:
      "El sabor ‘gourmet’ de Calabria triunfa en Sevilla gracias a una italiana enamorada de la ciudad",
    href: "https://www.lavozdelsur.es/empresas/sabor-gourmet-calabria-triunfa-en-sevilla-gracias-italiana-enamorada-ciudad_289316_102.html",
    image: "/press/la-voz-del-sur.jpg",
  },
  {
    kind: "press" as const,
    outlet: "Diario de Sevilla",
    headline:
      "El italiano del Arenal que vende sus productos para que cocines como un auténtico chef",
    href: "https://www.diariodesevilla.es/vivirensevilla/restaurante-italiano-arenal-sevilla-cocinera-tremenda_0_2003602349.html",
    image: "/press/diario-de-sevilla.jpg",
  },
  {
    kind: "venue" as const,
    outlet: "Cosas de Comé",
    headline: "Establecimiento \"La Cocinera Tremenda\" en \"Sevilla\"",
    href: "https://sevilla.cosasdecome.es/establecimiento/la-cocinera-tremenda-2/",
    image: "/press/cosas-de-come.jpg",
  },
];

const homeButton = cn(
  buttonVariants({ size: "lg" }),
  "h-auto min-h-12 w-full rounded-sm px-1 py-2 text-center text-sm leading-tight font-semibold tracking-tight whitespace-normal sm:min-h-14 sm:px-3 sm:text-lg",
);

export function HomeHero() {
  const router = useRouter();
  const taps = useRef({ count: 0, last: 0 });
  const [contactOpen, setContactOpen] = useState(false);
  const { lang, ui } = useLanguage();

  function onLogoTap() {
    const now = Date.now();
    if (now - taps.current.last > 4500) taps.current.count = 0;
    taps.current.last = now;
    taps.current.count += 1;
    if (taps.current.count >= 5) {
      taps.current.count = 0;
      router.push("/admin");
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
          <button
            type="button"
            className={cn(
              homeButton,
              "bg-[#ce2b37] text-white hover:bg-[#b42330]",
            )}
            onClick={() => setContactOpen(true)}
          >
            {ui.contact}
          </button>
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
          <div className="mt-10">
            <h2 className="text-center font-heading text-2xl leading-snug font-medium text-[#f4efe6] italic sm:text-3xl">
              {ui.socialHeading}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href="https://www.facebook.com/lacocineratremenda?rdid=1ZlERQudPMscoXzt&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HeTEVuV6A%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm bg-[#1877F2] px-3 text-base font-semibold text-white"
              >
                <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M24 12.073C24 5.446 18.627 0 12 0S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/la_cocinera_tremenda/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-sm px-3 text-base font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(45deg, #f9ce34 0%, #ee2a7b 55%, #6228d7 100%)",
                }}
              >
                <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.3 6.5a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
                  />
                </svg>
                Instagram
              </a>
            </div>
          </div>
          <div className="mt-12 w-full">
            <h2 className="text-center font-heading text-2xl leading-snug font-medium text-[#f4efe6] italic sm:text-3xl">
              {ui.pressHeading}
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pressAppearances.map((item, index) => (
                <li key={item.href} className="min-w-0">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-[#f4efe6]/25 bg-black/40 transition duration-200 hover:border-[#f4efe6]/55 focus-visible:border-[#f4efe6] focus-visible:ring-2 focus-visible:ring-[#f4efe6]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col p-4">
                      <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-italy-green uppercase">
                        {item.kind === "tv"
                          ? ui.pressTv
                          : item.kind === "venue"
                            ? ui.pressVenue
                            : ui.pressPrint}
                      </p>
                      <p className="mt-2 font-sans text-xs tracking-wide text-[#f4efe6]/65">
                        {item.outlet}
                      </p>
                      <h3 className="mt-1.5 font-heading text-lg leading-snug font-medium text-balance text-[#f4efe6]">
                        {item.headline}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#f4efe6]/80">
                        {ui.pressSummaries[index]}
                      </p>
                      <span className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-sm border border-[#f4efe6]/55 px-3 text-sm font-semibold text-[#f4efe6] transition group-hover:bg-[#f4efe6] group-hover:text-[#141210] group-focus-visible:bg-[#f4efe6] group-focus-visible:text-[#141210]">
                        {ui.pressCta}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[calc(100%-1.25rem)] max-w-md gap-0 p-3 sm:max-w-lg"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{ui.contactChoiceTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-1.5">
            <a
              href="https://wa.me/34644744571"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 flex-col items-center justify-center gap-1 rounded-sm bg-[#25D366] px-1 text-center text-sm leading-none font-semibold text-white"
            >
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.42 0 .04 5.37.04 12c0 2.11.55 4.16 1.6 5.98L0 24l6.17-1.62A11.9 11.9 0 0 0 12.04 24C18.66 24 24 18.63 24 12c0-3.2-1.25-6.21-3.48-8.52zM12.04 21.82c-1.84 0-3.63-.5-5.2-1.44l-.37-.22-3.66.96.98-3.57-.24-.37A9.78 9.78 0 0 1 2.22 12c0-5.41 4.41-9.82 9.82-9.82 2.62 0 5.08 1.02 6.93 2.88a9.74 9.74 0 0 1 2.87 6.94c0 5.41-4.41 9.82-9.8 9.82zm5.39-7.35c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.12-.27-.2-.57-.35z"
                />
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:+34644744571"
              className="inline-flex min-h-14 items-center justify-center gap-1 rounded-sm bg-[#f4efe6] px-1 text-center text-sm leading-tight font-semibold text-[#141210]"
            >
              <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"
                />
              </svg>
              {ui.contactCall}
            </a>
            <DialogClose className="inline-flex min-h-14 items-center justify-center rounded-sm bg-[#ce2b37] px-1 text-center text-sm leading-tight font-semibold text-white">
              {ui.contactClose}
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
