"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllInventoryItems, type InventoryItemDto } from "@/src/features/admin/inventory/api/inventory";

export function useInventory() {
  const query = useQuery<InventoryItemDto[], Error>(["inventory"], getAllInventoryItems, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { items: query.data ?? [], isLoading: query.isLoading, error: query.error };
}
