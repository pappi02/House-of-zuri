"use client";

import { useEffect, useState } from "react";

export function usePackingSlip(_fulfillmentId: string) {
  const [slip, setSlip] = useState<{ id: string; items: Array<{ productId: string; quantity: number }> } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadPackingSlip() {
      // TODO: connect to a packing slip endpoint when available.
      if (mounted) {
        setSlip(null);
        setLoading(false);
      }
    }

    loadPackingSlip();

    return () => {
      mounted = false;
    };
  }, [_fulfillmentId]);

  return { slip, loading };
}
