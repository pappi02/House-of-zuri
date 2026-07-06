"use client";

import { useEffect, useState } from "react";

export function useDispatches(_fulfillmentId: string) {
  const [dispatches, setDispatches] = useState<Array<{ id: string; carrier: string; trackingNumber: string; status: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadDispatches() {
      // TODO: connect to a dispatch history endpoint when available.
      if (mounted) {
        setDispatches([]);
        setLoading(false);
      }
    }

    loadDispatches();

    return () => {
      mounted = false;
    };
  }, [_fulfillmentId]);

  return { dispatches, loading };
}
