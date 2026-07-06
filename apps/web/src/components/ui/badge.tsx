import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full border border-stone-300 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-stone-600 ${className}`}>{children}</span>;
}
