"use client";

import { useEffect, useState } from "react";

export function useQualityInspections(_jobId: string | null) {
  const [inspections, setInspections] = useState<Array<{ id: string; status: string; inspectedAt: string; notes?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadInspections() {
      // TODO: connect to a quality inspections endpoint when available.
      if (mounted) {
        setInspections([]);
        setLoading(false);
      }
    }

    loadInspections();

    return () => {
      mounted = false;
    };
  }, [_jobId]);

  return { inspections, loading };
}
