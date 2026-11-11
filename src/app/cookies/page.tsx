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
        Esta página explica las cookies que utiliza La Cocinera Tremenda, según la LSSI-CE. El texto está en
        español. Una cookie es un archivo que el sitio guarda en tu dispositivo.
      </p>
      <h2>Necesarias</h2>
      <p>
        Permiten navegar, mantener la seguridad y, si entras al panel con la contraseña, la sesión de
        administración (cookie técnica lct_admin, httpOnly). Están siempre activas.
      </p>
      <h2>Preferencias</h2>
      <p>Recuerdan el idioma y otras opciones de visualización para que el sitio se muestre como lo dejaste.</p>
      <h2>Analítica</h2>
      <p>
        Cookies de herramientas de analítica para medir las visitas, las páginas vistas, el idioma y el tipo de
        dispositivo, y así conocer el uso de la web.
      </p>
      <h2>Marketing</h2>
      <p>
        Cookies de redes sociales y de publicidad para mostrar anuncios y contenidos relacionados con tus
        visitas, también de terceros.
      </p>
      <h2>Tu elección</h2>
      <p>
        Puedes aceptar todas, rechazar las no necesarias o configurar cada categoría. La elección se guarda en
        este navegador. Puedes cambiarla con «Configurar cookies» en el pie de página. Más información en la{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
