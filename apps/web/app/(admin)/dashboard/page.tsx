"use client";

import { useMemo, useState } from "react";
import { BulkActionBar } from "@/src/features/admin/components/BulkActionBar";
import { DataTable } from "@/src/features/admin/components/DataTable";
import { FilterBar } from "@/src/features/admin/components/FilterBar";
import { Pagination } from "@/src/features/admin/components/Pagination";
import { SearchBar } from "@/src/features/admin/components/SearchBar";
import { StatusBadge } from "@/src/features/admin/components/StatusBadge";

const kpis = [
  { label: "Today's Orders", value: "24", detail: "+12% vs yesterday" },
  { label: "Revenue", value: "KES 3.2M", detail: "Projected this week" },
  { label: "Products in Production", value: "18", detail: "6 urgent" },
  { label: "Pending Fulfillments", value: "7", detail: "2 high priority" },
  { label: "Inventory Alerts", value: "5", detail: "3 low stock" },
  { label: "Recent Payments", value: "12", detail: "2 pending review" },
];

const recentOrders = [
  { orderNumber: "HZ-1024", customer: "Amina Njeri", total: "KES 84,500", status: <StatusBadge status="Processing" tone="warning" /> },
  { orderNumber: "HZ-1025", customer: "Lily Otieno", total: "KES 128,900", status: <StatusBadge status="Packed" tone="success" /> },
  { orderNumber: "HZ-1026", customer: "Daniel Mugo", total: "KES 45,200", status: <StatusBadge status="Awaiting payment" tone="danger" /> },
];

export default function AdminDashboardPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredOrders = useMemo(() => {
    return recentOrders.filter((order) => order.orderNumber.toLowerCase().includes(search.toLowerCase()) || order.customer.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Operations overview</p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Executive dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">{kpi.label}</p>
            <p className="mt-3 text-3xl font-semibold text-stone-900">{kpi.value}</p>
            <p className="mt-2 text-sm text-stone-500">{kpi.detail}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar />
      </div>

      <BulkActionBar selectedCount={selectedIds.length} actions={[{ id: "export", label: "Export", onAction: () => {} }, { id: "cancel", label: "Cancel", onAction: () => {} }]} />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <DataTable
          title="Recent orders"
          columns={[{ key: "orderNumber", label: "Order" }, { key: "customer", label: "Customer" }, { key: "total", label: "Total" }, { key: "status", label: "Status" }]}
          rows={filteredOrders.slice((page - 1) * 2, page * 2).map((order) => ({
            ...order,
            orderNumber: <button className="font-medium text-stone-900" onClick={() => setSelectedIds((current) => current.includes(order.orderNumber) ? current.filter((value) => value !== order.orderNumber) : [...current, order.orderNumber])}>{order.orderNumber}</button>,
          }))}
        />

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Manufacturing queue</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-700">
              <li className="rounded-2xl bg-stone-50 p-3">Tailored suit • Due today</li>
              <li className="rounded-2xl bg-stone-50 p-3">Silk shirt • Due tomorrow</li>
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Low stock alerts</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-700">
              <li className="rounded-2xl bg-stone-50 p-3">Linen fabric • 3 units left</li>
              <li className="rounded-2xl bg-stone-50 p-3">Buttons • 8 units left</li>
            </ul>
          </div>
        </div>
      </div>

      <Pagination page={page} pageSize={2} totalItems={filteredOrders.length} onPageChange={setPage} />
    </div>
  );
}
