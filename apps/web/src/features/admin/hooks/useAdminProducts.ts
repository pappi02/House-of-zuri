"use client";

import { useEffect, useState } from "react";
import { getAdminProducts } from "@/src/features/admin/api/products";

export function useAdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      const data = await getAdminProducts();
      if (mounted) {
        setProducts(data);
        setLoading(false);
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading };
}
