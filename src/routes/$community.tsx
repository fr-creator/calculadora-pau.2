import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BarChart3, CheckCircle2, GraduationCap, Rocket, Star } from "lucide-react";
import {
  getCommunity,
  COMMUNITIES,
  getGeneralSubjects,
  type Community,
} from "@/data/pau";
import { SiteLayout } from "@/components/SiteLayout";
import { AdSlot } from "@/components/AdSlot";
import { FAQ } from "@/components/FAQ";
import { CommunityFlag } from "@/components/CommunityFlag";
import { calcular, createInputs, type HistoryChoice, type Inputs } from "@/lib/pau-calc";

export const Route = createFileRoute("/$community")({
  loader: ({ params }) => {
    const c = getCommunity(params.community);
    if (!c) throw notFound();
    return { community: c };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.community.name ?? "Comunidad";
    const path = loaderData ? `/${loaderData.community.slug}` : "/";
    const title = `Calculadora Nota PAU ${name} 2026 · Gratis`;
    const description = `Calcula al instante tu nota de la PAU de ${name}: nota de acceso, admisión, sobre 10 y sobre 14, con las asignaturas oficiales de tu comunidad.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: path },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "/" },
              { "@type": "ListItem", position: 2, name: `PAU ${name}`, item: path },
            ],
          }),
        },
      ],
    };
  },
  component: CommunityCalculator,
});

function CommunityCalculator() {
  const { community } = Route.useLoaderData();
  return <Calculator key={community.slug} community={community} />;
}

function Calculator({ community }: { community: Community }) {
  const [inputs, setInputs] = useState<Inputs>(() => createInputs(community));

  const subjects = useMemo(
    () => getGeneralSubjects(community, inputs.history),
    [community, inputs.history],
  );

  const results = useMemo(
    () => calcular(inputs, community, subjects.map((s) => s.key)),
    [inputs, community, subjects],
  );

  const setGeneral = (key: string) => (v: string) => {
    const parsed = v === "" ? null : Number(v.replace(",", "."));
    setInputs((s) => ({ ...s, general: { ...s.general, [key]: parsed } }));
  };

  const setField = (key: "bachillerato" | "esp1" | "esp2") => (v: string) => {
    const parsed = v === "" ? null : Number(v.replace(",", "."));
    setInputs((s) => ({ ...s, [key]: parsed }));
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="transition hover:text-primary">Inicio</Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{community.name}</li>
          </ol>
        </nav>

        <header className="mt-6">
          <div className="flex items-center gap-4">
            <CommunityFlag community={community} className="h-11 w-16 shrink-0" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Calculadora Nota PAU {community.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Asignaturas oficiales de la {community.examName}. El resultado se
                actualiza mientras escribes.
              </p>
            </div>
          </div>
        </header>

        {/* Resultados destacados: primero en móvil y en escritorio */}
        <ResultsPanel results={results} />

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border/70 bg-gradient-to-b from-card to-secondary/40 p-5 shadow-sm sm:p-7">
              <h2 className="text-lg font-bold tracking-tight">Tus notas</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Escala de 0 a 10. Puedes usar decimales.
              </p>

              <div className="mt-6 space-y-5">
                <NumberField
                  label="Nota media de Bachillerato"
                  hint="Media de 1º y 2º"
                  value={inputs.bachillerato}
                  onChange={setField("bachillerato")}
                />

                {community.allowPhilosophy ? (
                  <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                    <div className="text-sm font-semibold">
                      ¿Qué examen de Historia has hecho?
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {(
                        [
                          ["espana", "Historia de España"],
                          ["filosofia", "Historia de la Filosofía"],
                        ] as Array<[HistoryChoice, string]>
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={inputs.history === value}
                          onClick={() => setInputs((s) => ({ ...s, history: value }))}
                          className={`min-h-11 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                            inputs.history === value
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-input bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  {subjects.map((s) => (
                    <NumberField
                      key={s.key}
                      label={s.label}
                      hint={s.hint}
                      value={inputs.general[s.key] ?? null}
                      onChange={setGeneral(s.key)}
                    />
                  ))}
                </div>

                <div className="rounded-2xl border border-border/70 bg-secondary/50 p-4 sm:p-5">
                  <h3 className="text-sm font-bold">Fase específica (opcional)</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Independiente de la fase general. Solo suman las materias
                    aprobadas (≥ 5). Elige la ponderación (0,1 o 0,2) de tu grado.
                  </p>
                  <div className="mt-4 space-y-4">
                    <SpecificField
                      label="Específica 1"
                      subjects={community.modalitySubjects}
                      subject={inputs.esp1Subject}
                      value={inputs.esp1}
                      pond={inputs.pond1}
                      onSubject={(v) => setInputs((s) => ({ ...s, esp1Subject: v }))}
                      onValue={setField("esp1")}
                      onPond={(p) => setInputs((s) => ({ ...s, pond1: p }))}
                    />
                    <SpecificField
                      label="Específica 2"
                      subjects={community.modalitySubjects}
                      subject={inputs.esp2Subject}
                      value={inputs.esp2}
                      pond={inputs.pond2}
                      onSubject={(v) => setInputs((s) => ({ ...s, esp2Subject: v }))}
                      onValue={setField("esp2")}
                      onPond={(p) => setInputs((s) => ({ ...s, pond2: p }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-3">
              <ResultRow label="Fase general (media)" value={results.faseGeneral} max="/ 10" />
              <ResultRow label="Nota de acceso" value={results.notaAcceso} max="/ 10" />
              <ResultRow label="Nota sobre 10" value={results.sobre10} max="/ 10" />
              <ResultRow label="Nota sobre 14" value={results.sobre14} max="/ 14" highlight />
              <div className="rounded-2xl border border-border/70 bg-card px-5 py-4 text-xs text-muted-foreground">
                Materias de la fase general en {community.name}:{" "}
                <strong className="text-foreground">{subjects.length}</strong>
                {community.coofficial ? ` (incluye ${community.coofficial.label})` : ""}.
              </div>
              <AdSlot />
            </div>
          </aside>
        </div>

        <section className="mt-14 rounded-3xl border border-border/70 bg-gradient-to-b from-card to-secondary/40 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Cómo se calcula la nota de la PAU en {community.name}
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Nota de acceso</strong> ={" "}
              <code className="rounded bg-primary/10 px-1.5 py-0.5 text-foreground">
                0,6 · Bachillerato + 0,4 · Media Fase General
              </code>
              . Debe ser 5 o más, con al menos un 4 en la media de la fase general.
            </p>
            <p>
              <strong className="text-foreground">Fase general</strong>: media de{" "}
              {subjects.map((s) => s.label).join(", ")}.
            </p>
            <p>
              <strong className="text-foreground">Fase específica</strong>: voluntaria.
              Solo suman las asignaturas aprobadas (≥ 5) y únicamente las dos mejores
              ponderadas. Cada una se multiplica por 0,1 o 0,2.
            </p>
            <p>
              <strong className="text-foreground">Nota sobre 14</strong>: nota de admisión ={" "}
              <code className="rounded bg-primary/10 px-1.5 py-0.5 text-foreground">
                Nota de acceso + (Esp1 · P1) + (Esp2 · P2)
              </code>
              . Es la que se compara con la nota de corte.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <FAQ />
        </section>

        <section className="mt-14">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">Otras comunidades</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {COMMUNITIES.filter((c) => c.slug !== community.slug).map((c) => (
              <Link
                key={c.slug}
                to="/$community"
                params={{ community: c.slug }}
                className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <CommunityFlag community={c} className="h-4 w-6 shrink-0" />
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

function ResultsPanel({
  results,
}: {
  results: ReturnType<typeof calcular>;
}) {
  const fmt = (v: number | null) => (v !== null ? v.toFixed(3) : "—");
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-primary/80 p-5 text-primary-foreground shadow-lg sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
            Nota de admisión
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-5xl font-bold tabular-nums tracking-tight sm:text-6xl">
              {fmt(results.sobre14)}
            </span>
            <span className="text-xl font-medium text-primary-foreground/70">/ 14</span>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
            results.apto
              ? "bg-primary-foreground/15 text-primary-foreground"
              : "bg-primary-foreground/10 text-primary-foreground/80"
          }`}
        >
          {results.apto ? <CheckCircle2 aria-hidden className="size-4" /> : null}
          {results.apto ? "Apto para el acceso a la universidad" : "Completa tus notas"}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric icon={BarChart3} label="Fase general" value={fmt(results.faseGeneral)} />
        <Metric icon={GraduationCap} label="Nota de acceso" value={fmt(results.notaAcceso)} />
        <Metric icon={Star} label="Sobre 10" value={fmt(results.sobre10)} />
        <Metric
          icon={Rocket}
          label="Específica"
          value={`+${results.puntosEspecifica.toFixed(2)}`}
        />
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BarChart3;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-primary-foreground/10 px-3 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-primary-foreground/75">
        <Icon aria-hidden className="size-3.5" />
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold tabular-nums tracking-tight">{value}</div>
    </div>
  );
}

function NumberField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number | null;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="flex flex-wrap items-center justify-between gap-1">
        <span className="text-sm font-medium">{label}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        max={10}
        step={0.01}
        placeholder="0,00"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 min-h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base tabular-nums outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </label>
  );
}

function SpecificField({
  label,
  subjects,
  subject,
  value,
  pond,
  onSubject,
  onValue,
  onPond,
}: {
  label: string;
  subjects: string[];
  subject: string;
  value: number | null;
  pond: number;
  onSubject: (v: string) => void;
  onValue: (v: string) => void;
  onPond: (p: number) => void;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/70 p-3">
      <div className="text-sm font-semibold">{label}</div>
      <select
        value={subject}
        onChange={(e) => onSubject(e.target.value)}
        aria-label={`Asignatura ${label}`}
        className="mt-2 min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        <option value="">Elige asignatura (opcional)</option>
        {subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="mt-2 flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={10}
          step={0.01}
          placeholder="Nota"
          value={value ?? ""}
          onChange={(e) => onValue(e.target.value)}
          className="min-h-11 w-full rounded-xl border border-input bg-background px-3 text-base tabular-nums outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
        <select
          value={pond}
          onChange={(e) => onPond(Number(e.target.value))}
          className="min-h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          aria-label={`Ponderación ${label}`}
        >
          <option value={0.1}>×0,1</option>
          <option value={0.2}>×0,2</option>
        </select>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  max,
  highlight,
}: {
  label: string;
  value: number | null;
  max?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition ${
        highlight
          ? "border-primary/30 bg-primary/10"
          : "border-border/70 bg-card"
      }`}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-lg font-bold tabular-nums">
        {value !== null ? value.toFixed(3) : "—"}
        {max ? <span className="ml-1 text-xs font-medium text-muted-foreground">{max}</span> : null}
      </span>
    </div>
  );
}
