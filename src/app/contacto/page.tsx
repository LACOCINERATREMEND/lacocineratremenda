import type { Metadata } from "next";
import { ContactView } from "@/components/contact-view";

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "Contacto de La Cocinera Tremenda, gastrobar de especialidad italiana en Sevilla.",
};

export default function ContactoPage() {
  return <ContactView />;
}
