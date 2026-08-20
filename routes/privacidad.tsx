import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "https://calculadora-pau.com";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad · Calculadora Nota PAU" },
      {
        name: "description",
        content:
          "Política de privacidad y cookies de Calculadora Nota PAU: qué datos tratamos, con qué finalidad y qué derechos tienes.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidad` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="prose prose-neutral mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Responsable</h2>
            <p>
              [SUSTITUYE ESTO] Nombre/razón social, email de contacto y, si
              aplica, NIF/CIF del responsable del sitio web
              Calculadora Nota PAU ({SITE_URL}).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              2. Datos que tratamos
            </h2>
            <p>
              Esta web no requiere registro ni recoge datos personales para su
              funcionalidad principal (el cálculo de la nota se realiza en tu
              propio navegador y no se envía a ningún servidor). Sí podemos
              recoger datos de uso agregados y anónimos a través de
              herramientas de analítica, así como los datos que traten
              terceros a través de cookies publicitarias (ver sección 4).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              3. Finalidad
            </h2>
            <p>
              Los datos de analítica se usan únicamente para entender el uso
              del sitio y mejorarlo. Los datos tratados por proveedores
              publicitarios se usan para mostrar anuncios, en su caso
              personalizados, según su propia política de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              4. Cookies y publicidad — Google AdSense
            </h2>
            <p>
              Este sitio utiliza o puede utilizar Google AdSense para mostrar
              publicidad. Google, como proveedor tercero, usa cookies para
              publicar anuncios basados en visitas previas de un usuario a
              este u otros sitios web. El uso de cookies publicitarias por
              parte de Google permite a Google y sus socios publicar anuncios
              a los usuarios en función de su visita a este sitio y/o a otros
              sitios web.
            </p>
            <p>
              Los usuarios pueden inhabilitar la publicidad personalizada
              visitando los{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Ajustes de anuncios de Google
              </a>
              . También pueden consultar más información en{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Cómo utiliza Google los datos
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              5. Tus derechos
            </h2>
            <p>
              [SUSTITUYE ESTO] Si tratas datos personales identificables (por
              ejemplo, vía formulario de contacto o analítica no anonimizada),
              indica aquí cómo puede el usuario ejercer sus derechos de
              acceso, rectificación, supresión, oposición, limitación y
              portabilidad conforme al RGPD/LOPDGDD, y ante qué autoridad
              (AEPD) puede reclamar.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              6. Cambios en esta política
            </h2>
            <p>
              Podemos actualizar esta política de privacidad para reflejar
              cambios legales o del propio servicio. Te recomendamos
              revisarla periódicamente.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
