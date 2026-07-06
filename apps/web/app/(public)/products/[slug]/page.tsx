import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/src/lib/catalog-api";
import { ProductGallery } from "@/src/components/catalog/product-gallery";
import { PurchaseExperience } from "@/src/components/catalog/purchase-experience";
import { ProductPageSkeleton } from "@/src/components/catalog/catalog-skeleton";
import { Container } from "@/src/components/ui/container";
import { Price } from "@/src/components/ui/price";
import { Badge } from "@/src/components/ui/badge";
import { ProductCard } from "@/src/components/product-card";
import { SectionHeading } from "@/src/components/ui/section-heading";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product not found | House of Zuri",
    };
  }

  return {
    title: `${product.name} | House of Zuri`,
    description: product.seoDescription ?? product.description ?? "House of Zuri product",
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.seoDescription ?? product.description ?? undefined,
      url: `/products/${product.slug}`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.seoDescription ?? product.description ?? undefined,
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts({ limit: 6 })).filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <div className="bg-stone-50 py-16 lg:py-24">
      <Container>
        <nav className="mb-8 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-stone-900">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-900">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={product.images ?? ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"]} name={product.name} />
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge className="border-stone-200 bg-white text-stone-700">{product.collection ?? "House of Zuri"}</Badge>
              <Badge className="border-amber-200 bg-amber-50 text-amber-700">{product.productType.replace(/_/g, " ")}</Badge>
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{product.name}</h1>
              <p className="mt-4 text-base leading-8 text-stone-600">{product.description}</p>
            </div>
            <div className="flex items-end justify-between gap-4 rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Starting from</p>
                <div className="mt-2 text-3xl font-semibold text-stone-900">
                  <Price amount={product.price} />
                </div>
              </div>
              <div className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700">{product.availability ?? "In Stock"}</div>
            </div>
            <div className="grid gap-4 rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-stone-500">SKU</p>
                <p className="mt-2 text-sm text-stone-900">{product.sku ?? "HZ-001"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-500">Fabric</p>
                <p className="mt-2 text-sm text-stone-900">{product.fabric ?? "Premium fabric"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-500">Availability</p>
                <p className="mt-2 text-sm text-stone-900">{product.availability ?? "In Stock"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-500">Care</p>
                <p className="mt-2 text-sm text-stone-900">{product.careInstructions ?? "Dry clean only"}</p>
              </div>
            </div>
            <PurchaseExperience product={product} />
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="You may also like" title="Related pieces to complete the look" />
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} title={item.name} collection={item.collection ?? "House of Zuri"} price={item.price} image={item.images?.[0] ?? ""} availability={item.availability === "Made to Order" ? "Made to Order" : item.availability === "Custom" ? "Made to Order" : "In Stock"} href={`/products/${item.slug}`} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
