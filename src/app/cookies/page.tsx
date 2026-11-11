import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Cookies y almacenamiento local de La Cocinera Tremenda.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Esta página explica las cookies y el almacenamiento local de La Cocinera Tremenda, según la LSSI-CE y
        las directrices de la Agencia Española de Protección de Datos. El texto está en español.
      </p>
      <h2>Qué no usamos</h2>
      <p>
        No hay cookies de publicidad, de redes sociales ni de analítica. El recuento de visitas no usa cookies
        ni identificadores: el servidor anota la página, el idioma, si la pantalla es de móvil y el día. No
        guarda la dirección IP.
      </p>
      <h2>Almacenamiento en tu navegador</h2>
      <p>
        El idioma elegido y la respuesta del aviso de privacidad se guardan en el almacenamiento local del
        navegador (localStorage), no en una cookie. Puedes borrarlo desde la configuración del navegador.
      </p>
      <h2>Cookie de administración</h2>
      <p>
        Solo si alguien entra al panel con la contraseña se crea una cookie técnica de sesión (lct_admin),
        httpOnly, para mantener ese acceso. No se instala a quienes solo visitan la carta o se inscriben en un
        curso.
      </p>
      <h2>Tu elección</h2>
      <p>
        Aceptar o rechazar el aviso no activa cookies de terceros. Rechazar no instala ninguna cookie. Puedes
        volver a ver el aviso con «Configurar cookies» en el pie de página. Más información sobre tus datos en
        la <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
