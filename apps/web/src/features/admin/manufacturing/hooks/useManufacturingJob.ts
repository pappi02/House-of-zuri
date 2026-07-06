"use client";

import { useQuery } from "@tanstack/react-query";
import { getManufacturingJob, type ManufacturingJobDto } from "@/src/features/admin/manufacturing/api/manufacturing";

export function useManufacturingJob(id: string | null) {
  const query = useQuery<ManufacturingJobDto, Error>(["manufacturing", "job", id], () => getManufacturingJob(id as string), {
    enabled: Boolean(id),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { job: query.data ?? null, loading: query.isLoading, error: query.error };
}
