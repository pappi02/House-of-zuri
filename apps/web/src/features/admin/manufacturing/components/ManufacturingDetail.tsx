"use client";

import { useManufacturingJob } from "@/src/features/admin/manufacturing/hooks/useManufacturingJob";

export function ManufacturingDetail({ id }: { id: string | null }) {
  const { job, isLoading, error } = useManufacturingJob(id);

  if (!id) return <p className="text-sm text-stone-500">Select a manufacturing job to view details.</p>;
  if (isLoading) return <p className="text-sm text-stone-500">Loading manufacturing details…</p>;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;
  if (!job) return <p className="text-sm text-stone-500">Manufacturing job not found.</p>;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Job Number</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{job.jobNumber ?? "—"}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Status</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{job.status}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Priority</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{job.priority ?? "Normal"}</p>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Order</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{job.orderId}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-stone-200 bg-white p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Timeline</h3>
        <p className="mt-3 text-sm text-stone-600">Timeline support is pending backend integration.</p>
      </div>
    </div>
  );
}
