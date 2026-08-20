// Lógica de cálculo de la nota PAU.
// La fase general se calcula como la media de las materias oficiales
// de cada comunidad (incluyendo la lengua cooficial cuando existe).

import type { Community } from "@/data/pau";

export type HistoryChoice = "espana" | "filosofia";

export interface Inputs {
  bachillerato: number | null;
  /** Notas de la fase general indexadas por clave de asignatura. */
  general: Record<string, number | null>;
  history: HistoryChoice;
  /** Fase específica (independiente de la fase general). */
  esp1: number | null;
  esp2: number | null;
  esp1Subject: string;
  esp2Subject: string;
  /** Ponderación de la específica 1 (0.1 o 0.2). */
  pond1: number;
  /** Ponderación de la específica 2 (0.1 o 0.2). */
  pond2: number;
}

export interface Results {
  faseGeneral: number | null;
  notaAcceso: number | null;
  notaAdmision: number | null;
  sobre10: number | null;
  sobre14: number | null;
  apto: boolean;
  /** Puntos sumados por la fase específica. */
  puntosEspecifica: number;
}

const round = (n: number, d = 3) => Math.round(n * 10 ** d) / 10 ** d;

export function createInputs(c: Community): Inputs {
  return {
    bachillerato: null,
    general: {
      lengua: null,
      historia: null,
      extranjera: null,
      modalidad: null,
      ...(c.coofficial ? { coofficial: null } : {}),
    },
    history: "espana",
    esp1: null,
    esp2: null,
    esp1Subject: "",
    esp2Subject: "",
    pond1: 0.2,
    pond2: 0.2,
  };
}

export function calcular(i: Inputs, c: Community, keys: string[]): Results {
  const values = keys.map((k) => i.general[k] ?? null);
  const allValid = values.every((v) => typeof v === "number" && !Number.isNaN(v));
  const faseGeneral = allValid
    ? round((values as number[]).reduce((a, b) => a + b, 0) / values.length)
    : null;

  let notaAcceso: number | null = null;
  if (
    typeof i.bachillerato === "number" &&
    !Number.isNaN(i.bachillerato) &&
    faseGeneral !== null
  ) {
    notaAcceso = round(c.bachWeight * i.bachillerato + c.fgWeight * faseGeneral);
  }

  // Requisitos oficiales de acceso: FG >= 4 y nota de acceso >= 5
  const apto = notaAcceso !== null && faseGeneral !== null && faseGeneral >= 4 && notaAcceso >= 5;

  const e1 = typeof i.esp1 === "number" && i.esp1 >= 5 ? i.esp1 * i.pond1 : 0;
  const e2 = typeof i.esp2 === "number" && i.esp2 >= 5 ? i.esp2 * i.pond2 : 0;
  const puntosEspecifica = round(e1 + e2);

  let notaAdmision: number | null = null;
  if (notaAcceso !== null) {
    notaAdmision = Math.min(14, round(notaAcceso + e1 + e2));
  }

  return {
    faseGeneral,
    notaAcceso,
    notaAdmision,
    sobre10: notaAcceso,
    sobre14: notaAdmision,
    apto,
    puntosEspecifica,
  };
}
