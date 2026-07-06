"use client";

import { useQuery } from "@tanstack/react-query";
import { getFulfillments, type FulfillmentDto } from "@/src/features/admin/fulfillment/api/fulfillment";

export function useFulfillments() {
  const query = useQuery<FulfillmentDto[], Error>(["fulfillments"], getFulfillments, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { fulfillments: query.data ?? [], loading: query.isLoading, error: query.error };
}
