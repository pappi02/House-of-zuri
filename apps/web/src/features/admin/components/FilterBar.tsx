export function FilterBar() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-white p-3 shadow-sm">
      <label className="rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-600">Status</label>
      <label className="rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-600">Date range</label>
      <label className="rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-600">Priority</label>
      <button className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white">Apply</button>
    </div>
  );
}
