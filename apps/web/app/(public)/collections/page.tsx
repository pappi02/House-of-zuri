import Link from "next/link";
import { Suspense } from "react";
import { getCollections } from "@/src/lib/catalog-api";
import { CollectionCard } from "@/src/components/collection-card";
import { Container } from "@/src/components/ui/container";
import { SectionHeading } from "@/src/components/ui/section-heading";
import { ProductCardSkeleton } from "@/src/components/catalog/catalog-skeleton";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="bg-stone-50 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="Browse the House of Zuri wardrobe"
          description="Every edit is designed around a different part of modern dressing, from celebration to corporate polish."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.slug} href={`/collections/${collection.slug}`} className="block">
              <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img src={collection.imageUrl ?? ""} alt={collection.name} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-stone-900">{collection.name}</h2>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-stone-600">
                      {collection.productCount ?? 0} products
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-stone-600">{collection.description}</p>
                  {collection.featuredProduct ? (
                    <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Featured product</p>
                      <p className="mt-2 font-semibold text-stone-900">{collection.featuredProduct.name}</p>
                    </div>
                  ) : null}
                  <span className="inline-flex text-sm font-medium text-stone-700">Explore collection →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
