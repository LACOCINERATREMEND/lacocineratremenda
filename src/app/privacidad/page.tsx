import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Información sobre el tratamiento de datos personales de La Cocinera Tremenda.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Esta información se facilita según el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
        El texto está en español.
      </p>
      <h2>Responsable</h2>
      <p>
        La Cocinera Tremenda, con actividad en Sevilla (España). NIF: [NIF]. Dirección del local: Mercado del
        Arenal, puesto 13, Calle Pastor y Landero 8, Sevilla. Teléfono y WhatsApp: +34 644 744 571.
      </p>
      <h2>Datos que tratamos</h2>
      <p>
        Si te inscribes en un curso: nombre, teléfono, email y, si la escribes, una nota. También el curso y la
        fecha de la inscripción. Las visitas a la web se cuentan de forma agregada (página, idioma, si el
        dispositivo parece un móvil y el día). Esa cuenta no guarda tu IP ni un identificador personal.
      </p>
      <h2>Finalidad y base jurídica</h2>
      <p>
        La inscripción sirve para reservar y gestionar tu plaza. La base es la relación que pides al apuntarte
        (artículo 6.1.b del RGPD). El recuento anónimo de visitas sirve para saber qué páginas se usan; la base
        es el interés legítimo del responsable (artículo 6.1.f), sin identificarte.
      </p>
      <h2>Pago</h2>
      <p>El pago del curso se realiza en el local. Esta web no cobra con tarjeta ni guarda datos de pago.</p>
      <h2>Conservación</h2>
      <p>
        Los datos de la inscripción se conservan hasta que termina el curso y, como máximo, doce meses después,
        salvo que pidas antes su supresión o que debamos guardarlos más tiempo por una obligación legal. Los
        recuentos de visitas se conservan catorce meses.
      </p>
      <h2>Destinatarios</h2>
      <p>
        Aloja la web Vercel y la base de datos está en Supabase. Pueden tratar datos en la Unión Europea o, si
        usan infraestructura fuera, con las garantías previstas en el RGPD. No vendemos tus datos ni los cedemos
        para publicidad.
      </p>
      <h2>Derechos</h2>
      <p>
        Puedes pedir acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad
        llamando o escribiendo por WhatsApp al +34 644 744 571. También puedes reclamar ante la Agencia Española
        de Protección de Datos (<a href="https://www.aepd.es">aepd.es</a>).
      </p>
      <h2>Cookies</h2>
      <p>
        El detalle está en la <Link href="/cookies">política de cookies</Link>.
      </p>
    </LegalPage>
  );
}
