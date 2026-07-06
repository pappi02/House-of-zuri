"use client";

import { ReactNode, useState } from "react";
import { BulkActionBar } from "@/src/features/admin/components/BulkActionBar";
import { DataTable } from "@/src/features/admin/components/DataTable";
import { FilterBar } from "@/src/features/admin/components/FilterBar";
import { Pagination } from "@/src/features/admin/components/Pagination";
import { SearchBar } from "@/src/features/admin/components/SearchBar";
import type { AdminBulkAction, AdminColumn } from "@/src/features/admin/types/admin";

export function AdminWorkspace<T extends { id?: string }>({
  title,
  description,
  columns,
  data,
  actions,
  onRowClick,
  children,
}: {
  title: string;
  description?: string;
  columns: AdminColumn<T>[];
  data: T[];
  actions?: AdminBulkAction[];
  onRowClick?: (row: T) => void;
  children?: ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = data.filter((row) => {
    const haystack = Object.values(row).join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  const rows = filteredData.slice((page - 1) * 8, page * 8).map((row) => ({
    ...row,
    selected: (
      <input
        type="checkbox"
        checked={selectedIds.includes(String(row.id ?? ""))}
        onChange={() => setSelectedIds((current) => (row.id ? (current.includes(String(row.id)) ? current.filter((value) => value !== String(row.id)) : [...current, String(row.id)]) : current))}
      />
    ),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">{title}</h1>
        {description ? <p className="text-sm text-stone-600">{description}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar />
      </div>

      <BulkActionBar selectedCount={selectedIds.length} actions={actions?.map((action) => ({ ...action, onAction: () => action.onAction(selectedIds) })) ?? []} />

      <DataTable
        title={title}
        columns={[{ key: "selected", label: "" }, ...columns.map((column) => ({ key: String(column.key), label: column.label }))]}
        rows={rows}
        onRowClick={onRowClick ? (row) => onRowClick(row as T) : undefined}
      />

      <Pagination page={page} pageSize={8} totalItems={filteredData.length} onPageChange={setPage} />

      {children}
    </div>
  );
}
