/**
 * Espacio reservado para Google AdSense.
 * Sustituye el contenido por el snippet de AdSense una vez aprobada la cuenta.
 * Se muestra como placeholder discreto y no intrusivo.
 */
export function AdSlot({ label = "Publicidad", className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={
        "flex min-h-[90px] items-center justify-center rounded-xl border border-dashed bg-muted/30 text-xs text-muted-foreground " +
        className
      }
      aria-label="Espacio publicitario"
    >
      {label}
    </div>
  );
}
