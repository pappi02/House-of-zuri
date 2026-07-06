"use client";

import { ReactNode } from "react";

export function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      <span className="mb-2 block">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" />
    </label>
  );
}

export function TextAreaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      <span className="mb-2 block">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-h-28 w-full rounded-[1.25rem] border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" />
    </label>
  );
}

export function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      <span className="mb-2 block">{label}</span>
      <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" />
    </label>
  );
}

export function CurrencyField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      <span className="mb-2 block">{label}</span>
      <div className="flex items-center rounded-full border border-stone-300 px-4 py-3 text-sm focus-within:border-stone-900">
        <span className="mr-2 text-stone-500">KES</span>
        <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full bg-transparent outline-none" />
      </div>
    </label>
  );
}

export function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ value: string; label: string }> }) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      <span className="mb-2 block">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900">
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

export function SwitchField({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">
      <span>{label}</span>
      <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4" />
    </label>
  );
}

export function FileUploaderField({ label }: { label: string }) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      <span className="mb-2 block">{label}</span>
      <div className="rounded-[1.25rem] border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center text-sm text-stone-500">Image upload placeholder</div>
    </label>
  );
}

export function SubmitBar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-4">{children}</div>;
}
