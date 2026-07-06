"use client";

import { useMemo, useState } from "react";

export function MeasurementStep({ items, value, onChange }: { items: Array<{ name: string; requiresMeasurements?: boolean }>; value: Record<string, string>; onChange: (value: Record<string, string>) => void }) {
  const requiresMeasurements = useMemo(() => items.some((item) => item.requiresMeasurements), [items]);
  const [measurements, setMeasurements] = useState(value);

  if (!requiresMeasurements) {
    return <div className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">Your cart contains ready-made items only, so this step is automatically skipped.</div>;
  }

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input type="checkbox" checked={Boolean(measurements.useExisting)} onChange={(event) => {
          const next = { ...measurements, useExisting: event.target.checked ? "true" : "false" };
          setMeasurements(next);
          onChange(next);
        }} />
        Use my saved measurement profile
      </label>
      {[
        { key: "bust", label: "Bust" },
        { key: "waist", label: "Waist" },
        { key: "hip", label: "Hip" },
        { key: "shoulder", label: "Shoulder" },
      ].map((field) => (
        <label key={field.key} className="block text-sm font-medium text-stone-700">
          <span className="mb-2 block">{field.label}</span>
          <input value={measurements[field.key] ?? ""} onChange={(event) => {
            const next = { ...measurements, [field.key]: event.target.value };
            setMeasurements(next);
            onChange(next);
          }} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" />
        </label>
      ))}
    </div>
  );
}
