# Conectar mañana

Hoy el panel guarda cursos, inscripciones y visitas en archivos locales (`data/`). No hace falta ninguna cuenta. Cuando tengas las claves, solo hay que pegarlas y volver a desplegar.

## 1. Supabase

1. Crea un proyecto en Supabase.
2. En el editor SQL, ejecuta `supabase/migrations/20261110_panel.sql`.
3. Comprueba que existe el bucket público `course-photos`.
4. En Vercel (o en `.env.local` para probar), define:
   - `SUPABASE_URL` — URL del proyecto, sin barra final.
   - `SUPABASE_SERVICE_ROLE_KEY` — clave `service_role`. No la pongas en el navegador.
5. Con esas dos variables el sitio deja el JSON local y usa Supabase. Si faltan, sigue en local.

La clave `service_role` salta las políticas. No la expongas en el cliente.

## 2. Stripe

1. Crea la cuenta de Stripe y copia la clave secreta (`sk_live_...` o `sk_test_...`).
2. Define `STRIPE_SECRET_KEY`.
3. Define `NEXT_PUBLIC_SITE_URL` con la URL pública, sin barra final. Ejemplo: `https://lacocineratremenda.es`.
4. En Stripe → Developers → Webhooks, añade el endpoint:

   `https://TU-DOMINIO/api/stripe/webhook`

5. Eventos: `checkout.session.completed` y `charge.refunded`.
6. Copia el secreto `whsec_...` a `STRIPE_WEBHOOK_SECRET`.

Si falta la clave secreta o la URL del sitio, el botón de inscripción guarda la plaza como **pendiente – pagar en el local** y el panel lo indica. No inventes claves.

En cada curso, «Precio de cobro (€)» es el importe que Stripe cobra. El texto «Precio» es solo lo que se enseña.

## 3. Vercel

1. Importa este repositorio en un proyecto nuevo de Vercel.
2. Añade las variables de arriba en Production.
3. Despliega.
4. Abre `/`, `/carta` y `/cursos` y comprueba que responden.
5. Cinco toques en el logo de inicio abren el panel, sin contraseña.
