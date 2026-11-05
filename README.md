# La Cocinera Tremenda

Sitio de La Cocinera Tremenda, gastrobar italiano de especialidad en Sevilla.

## Páginas

- `/` inicio, con el logo y tres accesos: carta, cursos y contacto
- `/contacto` página de contacto
- `/carta` la carta impresa, con la misma pizarra del PDF
- `/cursos` vacío hasta que haya cursos publicados
- Los cursos se crean, editan y eliminan tras cinco toques seguidos en el logo de inicio y la contraseña de `ADMIN_PASSWORD`

La contraseña no aparece en la interfaz pública. Cópiala en `.env.local` a partir de `.env.example`.

Los cursos se guardan en `data/courses.json` en el servidor que está en marcha. En un alojamiento sin disco persistente haría falta una base de datos más adelante.

## Arranque local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Producción local:

```bash
npm run build
npm start
```
