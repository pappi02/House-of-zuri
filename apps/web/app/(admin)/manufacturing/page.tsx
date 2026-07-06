"use client";

import { useState } from "react";
import { AdminWorkspace } from "@/src/features/admin/components/AdminWorkspace";
import { ManufacturingDetail } from "@/src/features/admin/manufacturing/components/ManufacturingDetail";
import { useManufacturingJobs } from "@/src/features/admin/manufacturing/hooks/useManufacturingJobs";

export default function AdminManufacturingPage() {
  const { jobs, loading, error } = useManufacturingJobs();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = jobs.map((job) => ({
    id: job.id,
    job: job.jobNumber ?? job.id,
    order: job.orderId,
    status: job.status,
    priority: job.priority ?? "Normal",
    started: job.startedAt ? new Date(job.startedAt).toLocaleDateString() : "—",
    completed: job.completedAt ? new Date(job.completedAt).toLocaleDateString() : "—",
  }));

  return (
    <div className="space-y-6">
      <AdminWorkspace
        title="Manufacturing"
        description="Production queue, assignment, and progress tracking"
        columns={[
          { key: "job", label: "Job" },
          { key: "order", label: "Order" },
          { key: "status", label: "Status" },
          { key: "priority", label: "Priority" },
          { key: "started", label: "Started" },
          { key: "completed", label: "Completed" },
        ]}
        data={rows}
        actions={[
          { id: "assign", label: "Assign tailor", onAction: () => {} },
          { id: "status", label: "Update status", onAction: () => {} },
        ]}
        onRowClick={(row) => setSelectedId(String(row.id ?? ""))}
      >
        {loading ? <p className="text-sm text-stone-500">Loading manufacturing jobs…</p> : null}
        {error ? <p className="text-sm text-rose-600">{error.message ?? "Failed to load manufacturing jobs."}</p> : null}
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Job details</h2>
          <div className="mt-4">
            <ManufacturingDetail id={selectedId} />
          </div>
        </div>
      </AdminWorkspace>
    </div>
  );
}
