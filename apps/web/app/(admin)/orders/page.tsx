"use client";

import { AdminWorkspace } from "@/src/features/admin/components/AdminWorkspace";
import { useAdminOrders } from "@/src/features/admin/hooks/useAdminOrders";

export default function AdminOrdersPage() {
  const { orders, loading } = useAdminOrders();

  return (
    <AdminWorkspace
      title="Orders"
      description="Operations queue for order review, fulfillment, and status updates"
      columns={[{ key: "id", label: "Order" }, { key: "customer", label: "Customer" }, { key: "total", label: "Total" }, { key: "payment", label: "Payment" }, { key: "fulfillment", label: "Fulfillment" }, { key: "status", label: "Status" }]}
      data={orders.map((order) => ({ ...order, id: order.id }))}
      actions={[{ id: "export", label: "Export", onAction: () => {} }, { id: "cancel", label: "Cancel", onAction: () => {} }]}
    >
      {loading ? <p className="text-sm text-stone-500">Loading orders…</p> : null}
    </AdminWorkspace>
  );
}
