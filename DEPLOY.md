# Despliegue: GitHub + Vercel

## 0. Antes de nada

Este proyecto ya está conectado a Lovable (lo indica `AGENTS.md`). Si en
Lovable ya conectaste GitHub (Project > Settings > GitHub), **ya tienes un
repositorio** con este código sincronizándose automáticamente. En ese caso
salta al paso 2 e importa ESE repo en Vercel, en lugar de crear uno nuevo, o
romperás la sincronización con Lovable.

Si no lo has conectado nunca, sigue el paso 1.

## 1. Subir el código a GitHub (solo si no existe ya un repo)

```bash
cd pau-examenes-main
git init
git add .
git commit -m "SEO técnico: metadatos, sitemap, robots.txt, privacidad, ads.txt"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/pau-examenes.git
git push -u origin main
```

(Crea antes el repo vacío en https://github.com/new — sin README ni
.gitignore, para evitar conflictos con el `git push`.)

## 2. Importar el proyecto en Vercel

1. Entra en https://vercel.com/new
2. Importa el repositorio de GitHub
3. Framework Preset: Vercel debería detectar **Vite** automáticamente. Si te
   pregunta, el build command es `vite build` y no hace falta tocar el output
   directory.
4. **Antes de darle a Deploy**, añade estas variables de entorno (Settings >
   Environment Variables, o en la propia pantalla de importación):

   | Nombre | Valor |
   |---|---|
   | `VITE_SITE_URL` | `https://calculadora-pau.com` (tu dominio real, sin barra final) |
   | `VITE_GSC_VERIFICATION` | el código que te da Google Search Console (paso 4) |
   | `NITRO_PRESET` | `vercel` |

   La variable `NITRO_PRESET=vercel` es importante: el proyecto usa Nitro vía
   TanStack Start, y sin esta variable puede intentar generar un build para
   otro proveedor. Nitro respeta esta variable de entorno en build sin que
   tengas que tocar código.

5. Deploy.

## 3. Conectar tu dominio propio

En el proyecto de Vercel: Settings > Domains > añade tu dominio y sigue las
instrucciones de DNS (normalmente un registro A o CNAME en tu proveedor de
dominios). Actualiza `VITE_SITE_URL` si cambia.

## 4. Google Search Console

1. Ve a https://search.google.com/search-console
2. Añade una propiedad de tipo "Dominio" (verificación por DNS, cubre
   www y subdominios) o "Prefijo de URL" (verificación por etiqueta HTML)
3. Si usas la etiqueta HTML, copia solo el valor de `content="..."` y
   ponlo como `VITE_GSC_VERIFICATION` en Vercel, luego vuelve a desplegar
4. Una vez verificado: Sitemaps > añade `sitemap.xml`
5. Usa "Inspección de URL" en tu home y en 2-3 comunidades → "Solicitar
   indexación" para acelerar el primer rastreo

## 5. Google AdSense

1. Solicita tu cuenta en https://adsense.google.com con el dominio ya en
   producción y con contenido real (evita solicitarlo con el sitio a medio
   construir)
2. Cuando Google te dé tu `pub-XXXXXXXXXXXXXXXX`, sustituye el contenido de
   `public/ads.txt` por la línea exacta que te indiquen
3. Revisa que `src/routes/privacidad.tsx` tenga tus datos reales (responsable,
   contacto) antes de solicitar la cuenta — está marcado con
   `[SUSTITUYE ESTO]` donde falta rellenar. **No es asesoramiento legal**:
   si quieres estar seguro de que cumple el RGPD, que lo revise un abogado.
4. La revisión de Google puede tardar de días a semanas; no hay forma de
   acelerarla técnicamente.

## Checklist rápido antes de lanzar

- [ ] `VITE_SITE_URL` apunta al dominio real (no al de Lovable/preview)
- [ ] `public/og-image.png` sustituido por una imagen definitiva de marca
      (el actual es un placeholder generado automáticamente)
- [ ] `public/ads.txt` con tu `pub-ID` real cuando tengas cuenta de AdSense
- [ ] `src/routes/privacidad.tsx` con tus datos reales
- [ ] Sitemap enviado en Search Console y sin errores
- [ ] Verificado que `https://calculadora-pau.com/robots.txt` y
      `/sitemap.xml` responden en producción
