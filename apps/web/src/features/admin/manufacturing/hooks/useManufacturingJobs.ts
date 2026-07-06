"use client";

import { useQuery } from "@tanstack/react-query";
import { getManufacturingJobs, type ManufacturingJobDto } from "@/src/features/admin/manufacturing/api/manufacturing";

export function useManufacturingJobs(orderId?: string) {
  const query = useQuery<ManufacturingJobDto[], Error>(["manufacturing", orderId ?? "all"], () => getManufacturingJobs(orderId), {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { jobs: query.data ?? [], loading: query.isLoading, error: query.error };
}
