"use client";

import { useEffect, useState } from "react";

export function useTimeline(_entityId: string) {
  const [events, setEvents] = useState<Array<{ id: string; type: string; timestamp: string; details?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTimeline() {
      // TODO: connect this hook to a real timeline endpoint when available.
      if (mounted) {
        setEvents([]);
        setLoading(false);
      }
    }

    loadTimeline();

    return () => {
      mounted = false;
    };
  }, [_entityId]);

  return { events, loading };
}
