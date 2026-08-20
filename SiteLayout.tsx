import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              P
            </span>
            <span>Calculadora PAU</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Inicio</Link>
            <a href="/#comunidades" className="hidden hover:text-foreground sm:inline">Comunidades</a>
          </nav>
        </div>
      </header>
      <main>{children ?? <Outlet />}</main>
      <footer className="mt-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Calculadora PAU · Nota de acceso y admisión</p>
            <div className="flex items-center gap-4">
              <Link to="/privacidad" className="text-xs hover:text-foreground">
                Política de privacidad
              </Link>
              <p className="text-xs">Herramienta gratuita para estudiantes. No oficial.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
