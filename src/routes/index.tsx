import { createFileRoute, Link } from "@tanstack/react-router";
import { COMMUNITIES } from "@/data/pau";
import { CommunityFlag } from "@/components/CommunityFlag";
import { Countdown } from "@/components/Countdown";
import { AdSlot } from "@/components/AdSlot";
import { SiteLayout } from "@/components/SiteLayout";
import { FAQ } from "@/components/FAQ";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calculadora Nota PAU 2026 · Rápida, Gratis y Oficial" },
      {
        name: "description",
        content:
          "Calcula tu nota de la PAU (Selectividad) al instante: nota de acceso, admisión, sobre 10 y sobre 14. Para las 17 comunidades autónomas de España. Gratis y sin registro.",
      },
      { property: "og:title", content: "Calculadora Nota PAU · Rápida y Gratis" },
      {
        property: "og:description",
        content:
          "Calcula al instante tu nota de acceso y admisión a la universidad. Todas las comunidades autónomas de España.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Calculadora Nota PAU",
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
          inLanguage: "es-ES",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent"
        />
        <div className="relative mx-auto max-w-4xl px-4 pt-14 pb-8 text-center sm:px-6 sm:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Actualizado para la convocatoria 2026
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-6xl">
            Calculadora de Nota PAU
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            Calcula tu nota de acceso y admisión a la universidad en menos de un
            minuto. Adaptada a las asignaturas oficiales de tu comunidad.
          </p>

          <div className="mx-auto mt-10 max-w-md">
            <Countdown />
          </div>
        </div>
      </section>

      <section id="comunidades" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Elige tu comunidad autónoma
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Cada comunidad tiene su calculadora con sus materias oficiales.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {COMMUNITIES.map((c) => (
            <Link
              key={c.slug}
              to="/$community"
              params={{ community: c.slug }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-gradient-to-b from-card to-secondary/50 p-5 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <CommunityFlag community={c} className="h-11 w-16 shrink-0 transition group-hover:scale-105" />
              <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                {c.name}
              </h3>
              <span className="text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                Calcular →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <AdSlot label="Publicidad · Google AdSense" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <FAQ />
      </section>
    </SiteLayout>
  );
}
