# PAU Prep Hub

Quiero que desarrolles una aplicación web moderna, extremadamente rápida y optimizada para SEO dedicada EXCLUSIVAMENTE a la PAU (Prueba de Acceso a la Universidad) de España.

El objetivo es crear la web más completa de España sobre la PAU, donde cualquier estudiante pueda encontrar todos los exámenes oficiales de todas las comunidades autónomas desde el año 2000 hasta la actualidad.

La web debe ser responsive, profesional, minimalista, muy rápida y preparada para monetizar con Google AdSense.

## DISEÑO

Quiero un diseño moderno inspirado en Apple, Stripe, Linear y Vercel.

Debe transmitir confianza.

Modo claro.

Animaciones suaves.

Responsive perfecto.

Optimización máxima para Core Web Vitals.

Carga instantánea.

## PÁGINA PRINCIPAL

En la parte superior debe aparecer un hero moderno con el título:

"Todos los exámenes oficiales de la PAU de España"

Subtítulo explicando que se pueden consultar y descargar gratuitamente todos los exámenes oficiales organizados por comunidad autónoma, año, convocatoria y asignatura.

Debe existir un buscador grande capaz de buscar:

- Comunidad Autónoma

- Asignatura

- Año

- Convocatoria

Debajo debe mostrarse un contador en tiempo real indicando:

"Faltan X días, X horas y X minutos para la próxima PAU"

El contador debe actualizarse automáticamente.

Después mostrar las 17 Comunidades Autónomas mediante tarjetas modernas.

Al pulsar una comunidad debe accederse a su página específica.

## PÁGINA DE CADA COMUNIDAD

Cada comunidad tendrá su propia página.

Ejemplo:

/madrid

Dentro aparecerán todos los años disponibles.

Al seleccionar un año aparecerán:

- Convocatoria Ordinaria

- Convocatoria Extraordinaria

Al seleccionar una convocatoria aparecerán todas las asignaturas disponibles.

## PÁGINA DEL EXAMEN

Cada examen tendrá una URL única.

Ejemplo:

/madrid/2024/ordinaria/matematicas-ii

La página incluirá:

Título

Comunidad Autónoma

Año

Convocatoria

Asignatura

Botón para descargar el PDF

Botón imprimir

Botón compartir

Exámenes relacionados

Navegación entre examen anterior y siguiente.

## ORGANIZACIÓN

Toda la navegación debe ser muy sencilla.

Comunidad

↓

Año

↓

Convocatoria

↓

Asignatura

## BUSCADOR

El buscador debe encontrar instantáneamente:

Comunidades

Asignaturas

Años

Convocatorias

Mostrando resultados mientras se escribe.

## SEO

Todas las páginas deben tener automáticamente:

Title únicos

Meta Description

Canonical

Open Graph

Twitter Cards

Schema.org

Breadcrumbs

Sitemap.xml

robots.txt

URLs amigables

## RENDIMIENTO

Optimizar al máximo la velocidad.

Lazy Loading.

Carga diferida de imágenes.

Código limpio.

Componentes reutilizables.

Preparado para desplegar en Vercel.

## MONETIZACIÓN

Preparar espacios para Google AdSense sin perjudicar la experiencia de usuario.

No utilizar anuncios intrusivos.

## IMPORTANTE

Toda la estructura debe estar preparada para almacenar miles de exámenes sin modificar el código.

Los datos deben estar separados de la interfaz para facilitar futuras actualizaciones.

Toda la web debe ser escalable y fácilmente mantenible.

El código debe ser profesional, limpio, organizado y siguiendo las mejores prácticas de desarrollo.

El objetivo es construir la mejor web de España dedicada exclusivamente a la PAU.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pau-examenes.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5ff044b9-dd6b-4954-b95f-50296181d3d1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
