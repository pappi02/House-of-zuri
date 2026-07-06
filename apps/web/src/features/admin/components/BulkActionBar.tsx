"use client";

export function BulkActionBar({ selectedCount, actions }: { selectedCount: number; actions: Array<{ id: string; label: string; onAction: () => void }> }) {
  if (!selectedCount) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 shadow-sm">
      <span className="text-sm font-medium text-stone-700">{selectedCount} selected</span>
      {actions.map((action) => (
        <button key={action.id} className="rounded-full border border-stone-300 px-3 py-2 text-sm text-stone-700" onClick={action.onAction}>
          {action.label}
        </button>
      ))}
    </div>
  );
}
