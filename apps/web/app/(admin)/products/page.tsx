"use client";

import Link from "next/link";
import { AdminWorkspace } from "@/src/features/admin/components/AdminWorkspace";
import { useAdminProducts } from "@/src/features/admin/hooks/useAdminProducts";

export default function AdminProductsPage() {
  const { products, loading } = useAdminProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Catalog</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Products</h1>
        </div>
        <Link href="/admin/products/new" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white">New product</Link>
      </div>

      <AdminWorkspace
        title="Products"
        description="Manage catalog listings, publishing, and product variants"
        columns={[{ key: "name", label: "Product" }, { key: "type", label: "Type" }, { key: "price", label: "Price" }, { key: "status", label: "Status" }]}
        data={products}
        actions={[{ id: "publish", label: "Publish", onAction: () => {} }, { id: "archive", label: "Archive", onAction: () => {} }]}
      >
        {loading ? <p className="text-sm text-stone-500">Loading products…</p> : null}
      </AdminWorkspace>
    </div>
  );
}
