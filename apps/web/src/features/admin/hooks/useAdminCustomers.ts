"use client";

import { useEffect, useState } from "react";
import { getAdminCustomers } from "@/src/features/admin/api/customers";

export function useAdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCustomers() {
      const data = await getAdminCustomers();
      if (mounted) {
        setCustomers(data);
        setLoading(false);
      }
    }

    loadCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  return { customers, loading };
}
