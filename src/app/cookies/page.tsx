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
        Siempre activas. En el navegador se guarda la elección de este aviso y el idioma del sitio. También se
        mantiene la sesión de quien gestiona el contenido del sitio.
      </p>
      <h2>Analítica</h2>
      <p>
        Si aceptas esta categoría, el sitio registra las visitas: la página vista, el idioma, si el acceso es
        desde el móvil o el escritorio, y el día.
      </p>
      <h2>Marketing</h2>
      <p>
        Si aceptas esta categoría, esa elección queda guardada con el aviso y se aplica a contenidos de redes
        sociales y publicidad.
      </p>
      <h2>Tu elección</h2>
      <p>
        Aceptar activa analítica y marketing. Rechazar mantiene las necesarias. En Configurar eliges analítica
        y marketing. La elección queda en este navegador y puedes cambiarla con «Configurar cookies» en el pie.
        Más información en la <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
