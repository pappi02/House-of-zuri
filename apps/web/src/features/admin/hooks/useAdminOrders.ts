"use client";

import { useEffect, useState } from "react";
import { getAdminOrders } from "@/src/features/admin/api/orders";

export function useAdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      const data = await getAdminOrders();
      if (mounted) {
        setOrders(data);
        setLoading(false);
      }
    }

    loadOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return { orders, loading };
}
