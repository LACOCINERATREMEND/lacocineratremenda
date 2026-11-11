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
        La Cocinera Tremenda, con actividad en Sevilla (España). Dirección del local: Mercado del Arenal, puesto
        13, Calle Pastor y Landero 8, Sevilla. Teléfono y WhatsApp: +34 644 744 571.
      </p>
      <h2>Datos que tratamos</h2>
      <p>
        Si te inscribes en un curso: nombre, teléfono, email y, si la escribes, una nota, además del curso y la
        fecha de la inscripción. Con las cookies de analítica y de marketing podemos tratar datos de navegación,
        identificadores de cookie, páginas vistas, idioma, tipo de dispositivo y la dirección IP asociada a la
        visita.
      </p>
      <h2>Finalidad y base jurídica</h2>
      <p>
        La inscripción sirve para reservar y gestionar tu plaza. La base es la relación que pides al apuntarte
        (artículo 6.1.b del RGPD). Las cookies necesarias se basan en el interés legítimo de prestar el sitio
        (artículo 6.1.f). Las de preferencias, analítica y marketing se usan con tu consentimiento (artículo
        6.1.a), que puedes aceptar, rechazar o configurar.
      </p>
      <h2>Pago</h2>
      <p>El pago del curso se realiza en el local. Esta web no cobra con tarjeta ni guarda datos de pago.</p>
      <h2>Conservación</h2>
      <p>
        Los datos de la inscripción se conservan hasta que termina el curso y, como máximo, doce meses después,
        salvo que pidas antes su supresión o que debamos guardarlos más tiempo por una obligación legal. Los
        datos ligados a cookies de analítica y marketing se conservan durante los plazos propios de esas
        herramientas, y la elección de cookies permanece en tu navegador hasta que la borres o la cambies.
      </p>
      <h2>Destinatarios</h2>
      <p>
        Aloja la web Vercel y la base de datos está en Supabase. Las herramientas de analítica, redes sociales y
        publicidad pueden recibir los datos asociados a sus cookies. Pueden tratar datos en la Unión Europea o,
        si usan infraestructura fuera, con las garantías previstas en el RGPD.
      </p>
      <h2>Derechos</h2>
      <p>
        Puedes pedir acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad
        llamando o escribiendo por WhatsApp al +34 644 744 571.
      </p>
      <h2>Cookies</h2>
      <p>
        El detalle está en la <Link href="/cookies">política de cookies</Link>.
      </p>
    </LegalPage>
  );
}
