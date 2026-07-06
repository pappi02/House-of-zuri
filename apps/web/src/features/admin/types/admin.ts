import type { ReactNode } from "react";

export type AdminEntity = "orders" | "customers" | "products" | "inventory" | "manufacturing" | "fulfillment" | "payments";

export type SortDirection = "asc" | "desc";

export interface AdminColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  visible?: boolean;
}

export interface AdminFilterOption {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export interface AdminBulkAction {
  id: string;
  label: string;
  onAction: (selectedIds: string[]) => void;
}

export interface AdminListState {
  page: number;
  pageSize: number;
  search: string;
  sortKey?: string;
  sortDirection?: SortDirection;
  filters: Record<string, string>;
  selectedIds: string[];
}
