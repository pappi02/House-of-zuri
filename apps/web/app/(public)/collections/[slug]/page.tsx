import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollection, getProducts } from "@/src/lib/catalog-api";
import { ProductCard } from "@/src/components/product-card";
import { Container } from "@/src/components/ui/container";
import { SectionHeading } from "@/src/components/ui/section-heading";

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  const products = (await getProducts({ collection: collection.id, limit: 12 })).filter((item) => item.collectionId === collection.id || item.collection === collection.name);

  return (
    <div className="bg-stone-50 py-16 lg:py-24">
      <Container>
        <nav className="mb-8 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-stone-900">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-900">{collection.name}</span>
        </nav>
        <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
            <div className="relative min-h-[280px]">
              <img src={collection.imageUrl ?? ""} alt={collection.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-amber-600">Collection</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{collection.name}</h1>
              <p className="mt-4 text-base leading-8 text-stone-600">{collection.description}</p>
              <div className="mt-8 flex items-center gap-4 text-sm text-stone-600">
                <span className="rounded-full bg-stone-100 px-3 py-1">{products.length} pieces</span>
                <span className="rounded-full bg-stone-100 px-3 py-1">Curated edit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="In this collection" title={`Signature pieces for ${collection.name.toLowerCase()} dressing`} />
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} title={product.name} collection={product.collection ?? collection.name} price={product.price} image={product.images?.[0] ?? ""} availability={product.availability === "Made to Order" ? "Made to Order" : product.availability === "Custom" ? "Made to Order" : "In Stock"} href={`/products/${product.slug}`} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
