"use client";

import { useEffect, useState } from "react";
import { getFulfillment, type FulfillmentDto } from "@/src/features/admin/fulfillment/api/fulfillment";

export function FulfillmentDetail({ id }: { id: string | null }) {
  const [fulfillment, setFulfillment] = useState<FulfillmentDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadFulfillment() {
      if (!id) return;
      try {
        const response = await getFulfillment(id);
        if (mounted) {
          setFulfillment(response);
        }
      } catch (err) {
        if (mounted) {
          setError((err as Error).message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFulfillment();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!id) return <p className="text-sm text-stone-500">Select a fulfillment to view details.</p>;
  if (loading) return <p className="text-sm text-stone-500">Loading fulfillment details…</p>;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;
  if (!fulfillment) return <p className="text-sm text-stone-500">Fulfillment not found.</p>;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Fulfillment</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{fulfillment.fulfillmentNumber ?? "—"}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Order</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{fulfillment.orderId}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Status</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{fulfillment.status}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Dispatch</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{fulfillment.dispatchRecordId ?? "Pending"}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Packing Slip</h3>
        <p className="mt-3 text-sm text-stone-600">Packing slip details are not yet connected.</p>
      </div>
    </div>
  );
}
