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
      <h2>Quién tiene tus datos</h2>
      <p>
        El responsable del tratamiento es La Cocinera Tremenda, el restaurante, y es quien conserva tus datos.
        Dirección: Mercado del Arenal, puesto 13, Calle Pastor y Landero 8, Sevilla, España. Teléfono y
        WhatsApp: +34 644 744 571.
      </p>
      <h2>Datos que tratamos</h2>
      <p>
        Si te inscribes en un curso, el restaurante guarda tu nombre, teléfono, email y, si la escribes, una
        nota, junto con el curso y la fecha de la inscripción. Si aceptas la analítica, se registran la página
        vista, el idioma y el tipo de dispositivo para medir el uso de la web. Si aceptas el marketing, esa
        elección se aplica a contenidos de redes sociales y publicidad. El alojamiento (Vercel) y la base de
        datos (Supabase) pueden tratar datos técnicos de la conexión, como la dirección IP, en sus registros
        de servidor.
      </p>
      <h2>Finalidad y base jurídica</h2>
      <p>
        La inscripción sirve para reservar y gestionar tu plaza. La base es la relación que pides al apuntarte
        (artículo 6.1.b del RGPD). Las cookies necesarias se basan en el interés de poder ofrecer el sitio
        (artículo 6.1.f). La analítica y el marketing se usan cuando los aceptas en el aviso (artículo 6.1.a).
      </p>
      <h2>Pago</h2>
      <p>El pago del curso se realiza en el local.</p>
      <h2>Conservación</h2>
      <p>
        Los datos de la inscripción se conservan hasta que termina el curso y, como máximo, doce meses después,
        salvo que pidas antes su supresión o que haya que guardarlos más tiempo por una obligación legal. La
        elección de cookies permanece en tu navegador hasta que la borres o la cambies. Los registros técnicos
        del alojamiento siguen los plazos de Vercel y Supabase.
      </p>
      <h2>Destinatarios</h2>
      <p>
        Vercel aloja la web y Supabase guarda la base de datos. Si aceptas la analítica, el registro de visitas
        se guarda con el resto de datos del sitio. Pueden tratar datos en la Unión Europea o fuera de ella con
        las garantías del RGPD.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad se ejercen ante
        La Cocinera Tremenda, que es quien conserva los datos. Llama o escribe por WhatsApp al +34 644 744 571.
        Si la respuesta no te convence, puedes presentar una reclamación ante la Agencia Española de Protección
        de Datos (www.aepd.es). La Agencia es la autoridad de control; tus datos los conserva La Cocinera
        Tremenda.
      </p>
      <h2>Cookies</h2>
      <p>
        El detalle está en la <Link href="/cookies">política de cookies</Link>.
      </p>
    </LegalPage>
  );
}
