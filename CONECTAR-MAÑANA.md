# Conectar mañana

Hoy el panel puede guardar cursos, inscripciones y visitas en archivos locales (`data/`). En Vercel, con Supabase configurado, esos datos van a la base de datos y las fotos al bucket. El pago de los cursos se hace en el local: esta web no cobra en línea.

## 1. Supabase

1. Crea un proyecto en Supabase.
2. En el editor SQL, ejecuta `supabase/migrations/20261110_panel.sql`.
3. Comprueba que existe el bucket público `course-photos`.
4. En Vercel (o en `.env.local` para probar), define:
   - `SUPABASE_URL` — URL del proyecto, sin barra final.
   - `SUPABASE_SERVICE_ROLE_KEY` — clave `service_role` (también vale una clave `sb_secret_`). No la pongas en el navegador. El servidor la envía como `apikey` y como `Authorization: Bearer`.
5. Con esas dos variables el sitio deja el JSON local y usa Supabase. Si faltan, sigue en local.

La clave `service_role` salta las políticas. No la expongas en el cliente.

## 2. Vercel

1. Importa este repositorio en un proyecto de Vercel.
2. Añade `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` y `ADMIN_PASSWORD` en Production.
3. `NEXT_PUBLIC_SITE_URL` puede ser la URL pública, sin barra final. Ejemplo: `https://lacocineratremenda.com`.
4. Despliega.
5. Abre `/`, `/carta` y `/cursos` y comprueba que responden.
6. Cinco toques en el logo de inicio abren el panel. Sin `ADMIN_PASSWORD` el panel queda cerrado.

El campo **Precio** es el importe que se enseña en la web. No hay cobro con tarjeta.
