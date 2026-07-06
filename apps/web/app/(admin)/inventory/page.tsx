"use client";

import { useState } from "react";
import { AdminWorkspace } from "@/src/features/admin/components/AdminWorkspace";
import { InventoryDetail } from "@/src/features/admin/inventory/components/InventoryDetail";
import { useInventory } from "@/src/features/admin/inventory/hooks/useInventory";

export default function AdminInventoryPage() {
  const { items, isLoading, error } = useInventory();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = items.map((item) => ({
    id: item.id,
    sku: item.sku ?? item.inventoryNumber,
    product: item.productId,
    variant: item.variantId ?? "—",
    available: item.onHand,
    reserved: item.reserved,
    total: item.onHand + item.reserved,
    status: item.status,
  }));

  return (
    <div className="space-y-6">
      <AdminWorkspace
        title="Inventory"
        description="Stock availability, reservations, and replenishment planning"
        columns={[
          { key: "sku", label: "SKU" },
          { key: "product", label: "Product" },
          { key: "variant", label: "Variant" },
          { key: "available", label: "Available" },
          { key: "reserved", label: "Reserved" },
          { key: "total", label: "Total" },
          { key: "status", label: "Status" },
        ]}
        data={rows}
        actions={[
          { id: "receive", label: "Receive stock", onAction: () => {} },
          { id: "adjust", label: "Adjust stock", onAction: () => {} },
        ]}
        onRowClick={(row) => setSelectedId(String(row.id ?? ""))}
      >
        {isLoading ? <p className="text-sm text-stone-500">Loading inventory…</p> : null}
        {error ? <p className="text-sm text-rose-600">{error.message}</p> : null}
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Inventory details</h2>
          <div className="mt-4">
            <InventoryDetail id={selectedId} />
          </div>
        </div>
      </AdminWorkspace>
    </div>
  );
}
