"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { getProducts, searchProducts } from "@/src/lib/catalog-api";
import { ProductCard } from "@/src/components/product-card";
import { Container } from "@/src/components/ui/container";
import { SectionHeading } from "@/src/components/ui/section-heading";
import { ProductCardSkeleton } from "@/src/components/catalog/catalog-skeleton";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    let isMounted = true;
    const run = async () => {
      if (!deferredQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const products = await searchProducts(deferredQuery);
        if (isMounted) {
          setResults(products);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void run();
    return () => {
      isMounted = false;
    };
  }, [deferredQuery]);

  return (
    <div className="bg-stone-50 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Search"
          title="Find the piece that fits your moment"
          description="Search by product name, collection, or style detail and discover something tailored to your taste."
        />
        <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
          <label className="flex items-center gap-3 rounded-full border border-stone-300 px-4 py-3 text-stone-600">
            <SearchIcon size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dresses, tailoring, eveningwear..." className="w-full bg-transparent text-sm outline-none" />
          </label>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-stone-600">
            <span className="rounded-full bg-stone-100 px-3 py-1">Graduation</span>
            <span className="rounded-full bg-stone-100 px-3 py-1">Corporate</span>
            <span className="rounded-full bg-stone-100 px-3 py-1">Evening</span>
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : deferredQuery.trim() && results.length === 0 ? (
            <div className="rounded-[2rem] border border-stone-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900">No results yet</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Try a broader search or explore a curated collection to find the right piece.</p>
            </div>
          ) : deferredQuery.trim() ? (
            <div className="grid gap-8 lg:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.slug} title={product.name} collection={product.collection ?? "House of Zuri"} price={product.price} image={product.images?.[0] ?? ""} availability={product.availability === "Made to Order" ? "Made to Order" : product.availability === "Custom" ? "Made to Order" : "In Stock"} href={`/products/${product.slug}`} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-stone-200 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900">Start your search</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Use the search to explore dresses, tailoring, eveningwear, and more.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
