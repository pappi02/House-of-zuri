"use client";

import { useEffect, useState } from "react";
import type { WorkOrderDto } from "@/src/features/admin/manufacturing/api/manufacturing";

export function useWorkOrders(_jobId: string | null) {
  const [workOrders, setWorkOrders] = useState<WorkOrderDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadWorkOrders() {
      // TODO: wire this to a work orders endpoint once available.
      if (mounted) {
        setWorkOrders([]);
        setLoading(false);
      }
    }

    loadWorkOrders();

    return () => {
      mounted = false;
    };
  }, [_jobId]);

  return { workOrders, loading };
}
