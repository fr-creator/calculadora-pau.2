export interface FAQItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    q: "¿Cómo se calcula la nota de la PAU?",
    a: "La nota de acceso se obtiene con el 60% de la nota media de Bachillerato y el 40% de la media de la fase general (Lengua Castellana, Historia de España, Lengua Extranjera y una asignatura de modalidad). Debe ser igual o superior a 5 y la fase general al menos 4.",
  },
  {
    q: "¿Qué es la nota sobre 14?",
    a: "Es la nota de admisión: se suma a la nota de acceso (sobre 10) el resultado de las dos mejores asignaturas de la fase específica multiplicadas por su ponderación (0,1 o 0,2 según el grado y la universidad). El máximo posible es 14.",
  },
  {
    q: "¿Qué asignaturas ponderan?",
    a: "Ponderan las asignaturas de la fase específica según el grado universitario al que quieras acceder. Cada universidad publica su tabla de ponderaciones con valores de 0,1 o 0,2 por asignatura.",
  },
  {
    q: "¿Cómo funciona la fase específica?",
    a: "Es voluntaria y sirve para subir nota. Te examinas de asignaturas de modalidad; solo cuentan las que estén aprobadas (nota ≥ 5) y solo las dos mejores ponderadas para el grado elegido.",
  },
  {
    q: "¿Cuánto vale Bachillerato en la nota PAU?",
    a: "La nota media de Bachillerato supone el 60% de la nota de acceso a la universidad. Los otros 4 puntos vienen de la media de la fase general.",
  },
  {
    q: "¿Qué ocurre si suspendo una asignatura de la PAU?",
    a: "Puedes aprobar la PAU aunque suspendas alguna asignatura, siempre que la media de la fase general sea al menos 4 y la nota de acceso final sea 5 o superior.",
  },
  {
    q: "¿Qué nota necesito para entrar en Medicina?",
    a: "Medicina suele exigir entre 12,5 y 13,7 sobre 14 según la universidad y el año. Es uno de los grados con nota de corte más alta de España.",
  },
];

export function FAQ() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight">Preguntas frecuentes</h2>
      <p className="mt-2 text-muted-foreground">
        Todo lo que necesitas saber sobre la nota de la PAU.
      </p>
      <div className="mt-8 divide-y divide-border rounded-2xl border bg-card">
        {FAQ_ITEMS.map((f) => (
          <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium">
              <span>{f.q}</span>
              <span className="ml-4 text-muted-foreground transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
