"use client";

import { useState } from "react";
import { AdminWorkspace } from "@/src/features/admin/components/AdminWorkspace";
import { FulfillmentDetail } from "@/src/features/admin/fulfillment/components/FulfillmentDetail";
import { useFulfillments } from "@/src/features/admin/fulfillment/hooks/useFulfillments";

export default function AdminFulfillmentPage() {
  const { fulfillments, loading, error } = useFulfillments();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = fulfillments.map((fulfillment) => ({
    id: fulfillment.id,
    fulfillment: fulfillment.fulfillmentNumber ?? fulfillment.id,
    order: fulfillment.orderId,
    status: fulfillment.status,
    packingSlip: fulfillment.packingSlipId ?? "Pending",
    dispatch: fulfillment.dispatchRecordId ?? "Pending",
    createdAt: new Date(fulfillment.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="space-y-6">
      <AdminWorkspace
        title="Fulfillment"
        description="Packing, dispatch coordination, and completion tracking"
        columns={[
          { key: "fulfillment", label: "Fulfillment" },
          { key: "order", label: "Order" },
          { key: "status", label: "Status" },
          { key: "packingSlip", label: "Packing slip" },
          { key: "dispatch", label: "Dispatch" },
          { key: "createdAt", label: "Created" },
        ]}
        data={rows}
        actions={[
          { id: "pack", label: "Mark packed", onAction: () => {} },
          { id: "dispatch", label: "Dispatch", onAction: () => {} },
        ]}
        onRowClick={(row) => setSelectedId(String(row.id ?? ""))}
      >
        {loading ? <p className="text-sm text-stone-500">Loading fulfillment queue…</p> : null}
        {error ? <p className="text-sm text-rose-600">{error.message ?? "Failed to load fulfillments."}</p> : null}
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Fulfillment details</h2>
          <div className="mt-4">
            <FulfillmentDetail id={selectedId} />
          </div>
        </div>
      </AdminWorkspace>
    </div>
  );
}
