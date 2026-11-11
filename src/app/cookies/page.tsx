import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Cookies de La Cocinera Tremenda.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Esta página describe las cookies y el almacenamiento que usa La Cocinera Tremenda, según la LSSI-CE. El
        texto está en español.
      </p>
      <h2>Necesarias</h2>
      <p>
        Siempre activas. En el navegador se guarda tu elección del aviso (localStorage, clave lct-consent) y el
        idioma elegido (lct-lang). Si alguien entra al panel con la contraseña, se crea la cookie de sesión
        lct_admin, httpOnly, solo para esa administración. Sin estas piezas el aviso, el idioma o el panel no
        pueden funcionar.
      </p>
      <h2>Analítica</h2>
      <p>
        No se instalan al entrar. Solo si pulsas Aceptar o activas Analítica en Configurar. Entonces el sitio
        puede medir las visitas (página, idioma, móvil o escritorio y día). Una herramienta como Google
        Analytics solo se cargaría en ese caso, mediante la comprobación hasConsent(&quot;analytics&quot;).
      </p>
      <h2>Marketing</h2>
      <p>
        No se instalan al entrar. Cookies de redes sociales o publicidad, por ejemplo Meta Pixel, solo se
        cargarían si pulsas Aceptar o activas Marketing. El sitio lo comprueba con hasConsent(&quot;marketing&quot;).
      </p>
      <h2>Tu elección</h2>
      <p>
        Aceptar activa analítica y marketing. Rechazar las deja apagadas y mantiene solo las necesarias. En
        Configurar eliges cada una. La elección queda en este navegador y puedes cambiarla con «Configurar
        cookies» en el pie. Más información en la <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
