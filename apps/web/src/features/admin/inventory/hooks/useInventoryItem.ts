"use client";

import { useQuery } from "@tanstack/react-query";
import { getInventoryItemById, type InventoryItemDto } from "@/src/features/admin/inventory/api/inventory";

export function useInventoryItem(id: string | null) {
  const query = useQuery<InventoryItemDto, Error>(["inventory", id], () => getInventoryItemById(id as string), {
    enabled: Boolean(id),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { item: query.data ?? null, isLoading: query.isLoading, error: query.error };
}
