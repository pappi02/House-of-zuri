"use client";

import { useInventoryItem } from "@/src/features/admin/inventory/hooks/useInventoryItem";

export function InventoryDetail({ id }: { id: string | null }) {
  const { item, isLoading, error } = useInventoryItem(id);

  if (!id) return <p className="text-sm text-stone-500">Select an inventory item to view details.</p>;
  if (isLoading) return <p className="text-sm text-stone-500">Loading inventory details…</p>;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;
  if (!item) return <p className="text-sm text-stone-500">Inventory item not found.</p>;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">SKU</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{item.sku ?? "—"}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Variant</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{item.variantId ?? "N/A"}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Available</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{item.onHand}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Reserved</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{item.reserved}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Movements</h3>
        <p className="mt-3 text-sm text-stone-600">Movement history is not yet available for this inventory item.</p>
      </div>
    </div>
  );
}
