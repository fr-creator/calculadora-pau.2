// Datos de la PAU (Prueba de Acceso a la Universidad) de España.
// Cada comunidad define sus materias oficiales de la fase general,
// su lengua cooficial (si la tiene) y las materias de modalidad
// disponibles para la fase específica.

export interface CoofficialLanguage {
  /** Nombre de la asignatura tal y como aparece en la PAU. */
  label: string;
  /** Texto de ayuda breve. */
  hint?: string;
}

export interface Community {
  slug: string;
  name: string;
  shortName: string;
  region: string;
  /** Ruta del SVG de la bandera oficial (en /public/flags). */
  flag: string;
  /** Peso de la nota media de Bachillerato en la nota de acceso. */
  bachWeight: number;
  /** Peso de la fase general en la nota de acceso. */
  fgWeight: number;
  /** Lengua cooficial obligatoria en la fase general, si existe. */
  coofficial?: CoofficialLanguage;
  /** Materias de modalidad disponibles en esa comunidad. */
  modalitySubjects: string[];
  /** ¿Se puede elegir Historia de la Filosofía en lugar de Historia de España? */
  allowPhilosophy: boolean;
  /** Nombre oficial de la prueba en esa comunidad (para textos SEO). */
  examName: string;
}

/** Materias de modalidad comunes al modelo estatal de la PAU. */
const MODALITY_COMMON = [
  "Matemáticas II",
  "Matemáticas Aplicadas a las Ciencias Sociales II",
  "Física",
  "Química",
  "Biología",
  "Geología y Ciencias Ambientales",
  "Dibujo Técnico II",
  "Tecnología e Ingeniería II",
  "Economía de la Empresa",
  "Empresa y Diseño de Modelos de Negocio",
  "Geografía",
  "Historia del Arte",
  "Latín II",
  "Griego II",
  "Literatura Dramática",
  "Diseño",
  "Dibujo Artístico II",
  "Fundamentos Artísticos",
  "Artes Escénicas",
  "Análisis Musical II",
  "Coro y Técnica Vocal II",
  "Movimientos Culturales y Artísticos",
  "Historia de la Filosofía",
  "Historia de la Música y de la Danza",
  "Técnicas de Expresión Gráfico-Plástica",
  "Segunda Lengua Extranjera",
];

const base = {
  bachWeight: 0.6,
  fgWeight: 0.4,
  modalitySubjects: MODALITY_COMMON,
  allowPhilosophy: true,
  examName: "PAU",
};

export const COMMUNITIES: Community[] = [
  { ...base, slug: "andalucia", name: "Andalucía", shortName: "AND", region: "Sur", flag: "/flags/andalucia.svg", examName: "PEvAU" },
  { ...base, slug: "aragon", name: "Aragón", shortName: "ARA", region: "Norte", flag: "/flags/aragon.svg" },
  { ...base, slug: "asturias", name: "Principado de Asturias", shortName: "AST", region: "Norte", flag: "/flags/asturias.svg" },
  {
    ...base,
    slug: "baleares",
    name: "Islas Baleares",
    shortName: "IB",
    region: "Este",
    flag: "/flags/baleares.svg",
    coofficial: { label: "Lengua Catalana y Literatura", hint: "Obligatoria en Baleares" },
  },
  { ...base, slug: "canarias", name: "Canarias", shortName: "CAN", region: "Sur", flag: "/flags/canarias.svg" },
  { ...base, slug: "cantabria", name: "Cantabria", shortName: "CNT", region: "Norte", flag: "/flags/cantabria.svg" },
  { ...base, slug: "castilla-la-mancha", name: "Castilla-La Mancha", shortName: "CLM", region: "Centro", flag: "/flags/castilla-la-mancha.svg" },
  { ...base, slug: "castilla-y-leon", name: "Castilla y León", shortName: "CyL", region: "Centro", flag: "/flags/castilla-y-leon.svg" },
  {
    ...base,
    slug: "cataluna",
    name: "Cataluña",
    shortName: "CAT",
    region: "Este",
    flag: "/flags/cataluna.svg",
    examName: "PAU (Selectivitat)",
    allowPhilosophy: false,
    coofficial: { label: "Lengua Catalana y Literatura", hint: "Obligatoria en Cataluña" },
  },
  { ...base, slug: "extremadura", name: "Extremadura", shortName: "EXT", region: "Oeste", flag: "/flags/extremadura.svg" },
  {
    ...base,
    slug: "galicia",
    name: "Galicia",
    shortName: "GAL",
    region: "Norte",
    flag: "/flags/galicia.svg",
    examName: "ABAU",
    coofficial: { label: "Lengua Gallega y Literatura", hint: "Obligatoria en Galicia" },
  },
  { ...base, slug: "madrid", name: "Comunidad de Madrid", shortName: "MAD", region: "Centro", flag: "/flags/madrid.svg", examName: "PAU (EvAU)" },
  { ...base, slug: "murcia", name: "Región de Murcia", shortName: "MUR", region: "Sur", flag: "/flags/murcia.svg" },
  { ...base, slug: "navarra", name: "Comunidad Foral de Navarra", shortName: "NAV", region: "Norte", flag: "/flags/navarra.svg" },
  {
    ...base,
    slug: "pais-vasco",
    name: "País Vasco",
    shortName: "PV",
    region: "Norte",
    flag: "/flags/pais-vasco.svg",
    coofficial: { label: "Lengua Vasca (Euskera) y Literatura", hint: "Obligatoria en el País Vasco" },
  },
  { ...base, slug: "la-rioja", name: "La Rioja", shortName: "LR", region: "Norte", flag: "/flags/la-rioja.svg" },
  {
    ...base,
    slug: "valencia",
    name: "Comunidad Valenciana",
    shortName: "CV",
    region: "Este",
    flag: "/flags/valencia.svg",
    coofficial: { label: "Valenciano: Lengua y Literatura", hint: "Obligatoria en la C. Valenciana" },
  },
];

export function getCommunity(slug: string): Community | undefined {
  return COMMUNITIES.find((c) => c.slug === slug);
}

/**
 * Materias de la fase general para una comunidad concreta.
 * `key` se usa como identificador en el estado de la calculadora.
 */
export function getGeneralSubjects(
  c: Community,
  history: "espana" | "filosofia",
): Array<{ key: string; label: string; hint?: string }> {
  const subjects: Array<{ key: string; label: string; hint?: string }> = [
    { key: "lengua", label: "Lengua Castellana y Literatura" },
    {
      key: "historia",
      label: history === "filosofia" ? "Historia de la Filosofía" : "Historia de España",
    },
    { key: "extranjera", label: "Lengua Extranjera" },
  ];
  if (c.coofficial) {
    subjects.push({ key: "coofficial", label: c.coofficial.label, hint: c.coofficial.hint });
  }
  subjects.push({ key: "modalidad", label: "Materia de modalidad (fase general)" });
  return subjects;
}

/** Próxima fecha aproximada de la PAU (convocatoria ordinaria, primeros de junio). */
export function getNextPauDate(now: Date = new Date()): Date {
  const year = now.getFullYear();
  const june = new Date(year, 5, 3, 9, 0, 0);
  if (now < june) return june;
  return new Date(year + 1, 5, 3, 9, 0, 0);
}
