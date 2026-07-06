"use client";

import { ReactNode } from "react";

export function AdminForm({ title, children, onSubmit }: { title: string; children: ReactNode; onSubmit: () => void }) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-stone-900">{title}</h2>
      <div className="mt-6 space-y-4">{children}</div>
    </form>
  );
}
