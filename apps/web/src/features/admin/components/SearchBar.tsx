"use client";

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500 shadow-sm">
      <span>⌕</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search" className="w-full bg-transparent outline-none" />
    </label>
  );
}
