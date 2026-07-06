"use client";

import { useEffect, useState } from "react";
import type { InventoryMovementDto } from "@/src/features/admin/inventory/api/inventory";

// Note: backend currently does not expose a dedicated movement endpoint,
// so this hook is a placeholder for future implementation when available.
export function useInventoryMovements(_inventoryItemId: string) {
  const [movements, setMovements] = useState<InventoryMovementDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadMovements() {
      // TODO: connect to /inventory/movements or item-specific movement endpoint
      if (mounted) {
        setMovements([]);
        setLoading(false);
      }
    }

    loadMovements();

    return () => {
      mounted = false;
    };
  }, [_inventoryItemId]);

  return { movements, loading };
}
