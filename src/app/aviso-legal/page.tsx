import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Información legal de La Cocinera Tremenda conforme a la LSSI-CE.",
};

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso legal">
      <p>
        Información exigida por la Ley 34/2002, de servicios de la sociedad de la información y de comercio
        electrónico (LSSI-CE). El texto está en español.
      </p>
      <h2>Titular</h2>
      <p>
        La Cocinera Tremenda. Domicilio del establecimiento: Mercado del Arenal, puesto 13, Calle Pastor y
        Landero 8, Sevilla, España. Teléfono y WhatsApp: +34 644 744 571.
      </p>
      <h2>Actividad</h2>
      <p>
        Gastrobar de especialidad italiana. Esta web informa de la carta, la ubicación y los cursos. La
        inscripción a un curso no es un pago en línea: el pago se realiza en el local.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, la marca y las fotografías propias de esta web pertenecen a La Cocinera Tremenda o se usan
        con autorización. No se pueden copiar para un uso comercial sin permiso.
      </p>
      <h2>Responsabilidad</h2>
      <p>
        La información de la carta y de los cursos puede cambiar. Los enlaces a prensa y redes sociales llevan a
        sitios de terceros, que tienen sus propias condiciones.
      </p>
      <h2>Datos y cookies</h2>
      <p>
        Consulta la <Link href="/privacidad">política de privacidad</Link> y la{" "}
        <Link href="/cookies">política de cookies</Link>.
      </p>
    </LegalPage>
  );
}
