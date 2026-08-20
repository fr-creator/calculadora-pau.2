import { useEffect, useState } from "react";
import { getNextPauDate } from "@/data/pau";

function diff(target: Date) {
  const now = new Date();
  const ms = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [target] = useState(() => getNextPauDate());
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: Array<[number | null, string]> = [
    [t?.days ?? null, "días"],
    [t?.hours ?? null, "horas"],
    [t?.minutes ?? null, "min"],
    [t?.seconds ?? null, "seg"],
  ];

  return (
    <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-card to-secondary/50 p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Cuenta atrás para la próxima PAU
      </p>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {cells.map(([value, label]) => (
          <div
            key={label}
            className="rounded-xl bg-primary/8 px-2 py-3 text-center ring-1 ring-inset ring-primary/10 sm:px-3 sm:py-4"
          >
            <div className="text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
              {value === null ? "––" : String(value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Fecha estimada: 3 de junio de {target.getFullYear()}
      </p>
    </div>
  );
}
