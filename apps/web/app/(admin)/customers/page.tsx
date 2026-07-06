"use client";

import { AdminWorkspace } from "@/src/features/admin/components/AdminWorkspace";
import { useAdminCustomers } from "@/src/features/admin/hooks/useAdminCustomers";

export default function AdminCustomersPage() {
  const { customers, loading } = useAdminCustomers();

  return (
    <AdminWorkspace
      title="Customers"
      description="Customer profile, spend, and order history overview"
      columns={[{ key: "name", label: "Customer" }, { key: "segment", label: "Segment" }, { key: "spend", label: "Lifetime spend" }, { key: "orders", label: "Orders" }, { key: "status", label: "Status" }]}
      data={customers}
      actions={[{ id: "export", label: "Export", onAction: () => {} }]}
    >
      {loading ? <p className="text-sm text-stone-500">Loading customers…</p> : null}
    </AdminWorkspace>
  );
}
