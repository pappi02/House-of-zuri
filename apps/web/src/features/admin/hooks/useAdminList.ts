"use client";

import { useMemo, useState } from "react";
import type { AdminListState } from "@/src/features/admin/types/admin";

export function useAdminList(initialPageSize = 10) {
  const [state, setState] = useState<AdminListState>({
    page: 1,
    pageSize: initialPageSize,
    search: "",
    filters: {},
    selectedIds: [],
  });

  const update = (changes: Partial<AdminListState>) => {
    setState((current) => ({ ...current, ...changes }));
  };

  const toggleSelection = (id: string) => {
    setState((current) => ({
      ...current,
      selectedIds: current.selectedIds.includes(id)
        ? current.selectedIds.filter((value) => value !== id)
        : [...current.selectedIds, id],
    }));
  };

  const clearSelection = () => {
    setState((current) => ({ ...current, selectedIds: [] }));
  };

  return useMemo(
    () => ({ state, update, toggleSelection, clearSelection }),
    [state, update, toggleSelection, clearSelection],
  );
}
