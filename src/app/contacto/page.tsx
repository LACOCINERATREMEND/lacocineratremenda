import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "Contacto de La Cocinera Tremenda, gastrobar de especialidad italiana en Sevilla.",
};

export default function ContactoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <PageHeader
          title="Contáctanos"
          lede="Gastrobar de especialidad italiana en Sevilla."
        />
        <p className="max-w-prose text-base leading-relaxed text-[#f4efe6]/78">
          Estamos en Sevilla. El teléfono y el correo se publicarán aquí en
          cuanto estén listos.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
