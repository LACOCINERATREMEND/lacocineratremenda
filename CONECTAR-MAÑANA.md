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

Si falta `STRIPE_SECRET_KEY`, no se llama a Stripe. El panel muestra **Stripe: pendiente de conectar** y la inscripción queda como **pendiente – pagar en el local**. No inventes claves.

El campo **Precio** es el único importe: se enseña en la web y es lo que Stripe cobra. Al guardar un curso, el servidor crea o actualiza un producto de Stripe con el nombre, la descripción y la primera foto, y un precio en EUR (`default_price`). Si cambias el precio, se crea un Price nuevo, pasa a ser el predeterminado y el anterior se archiva. Si ocultas o borras el curso, el producto se archiva. Los identificadores quedan en el curso como `stripeProductId` y `stripePriceId` (en el JSON local y en las columnas `stripe_product_id` y `stripe_price_id`). El pago usa ese `stripe_price_id`.

`NEXT_PUBLIC_SITE_URL` hace falta para las vueltas de Checkout y para que Stripe pueda leer la foto. Sin esa URL el producto se crea igual, pero sin imagen.

## 3. Vercel

1. Importa este repositorio en un proyecto nuevo de Vercel.
2. Añade las variables de arriba en Production.
3. Despliega.
4. Abre `/`, `/carta` y `/cursos` y comprueba que responden.
5. Cinco toques en el logo de inicio abren el panel, sin contraseña.
