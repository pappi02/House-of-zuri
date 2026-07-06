import Link from "next/link";
import { getProducts } from "@/src/lib/catalog-api";
import { ProductCard } from "@/src/components/product-card";
import { Container } from "@/src/components/ui/container";
import { SectionHeading } from "@/src/components/ui/section-heading";

export default async function ProductsPage() {
  const products = await getProducts({ limit: 12 });

  return (
    <div className="bg-stone-50 py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Catalog"
            title="Discover our latest collections"
            description="Browse ready-made staples, made-to-order tailoring, and custom design experiences."
          />
          <Link href="/search" className="text-sm font-medium text-stone-700 hover:text-stone-950">
            Search the catalog
          </Link>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} title={product.name} collection={product.collection ?? "House of Zuri"} price={product.price} image={product.images?.[0] ?? ""} availability={product.availability === "Made to Order" ? "Made to Order" : product.availability === "Custom" ? "Made to Order" : "In Stock"} href={`/products/${product.slug}`} />
          ))}
        </div>
      </Container>
    </div>
  );
}
