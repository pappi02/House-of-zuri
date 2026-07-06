import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Badge } from "./ui/badge";
import { Price } from "./ui/price";

export type ProductCardProps = {
  title: string;
  collection: string;
  price: number;
  image: string;
  availability?: "In Stock" | "Made to Order";
  href?: string;
};

export function ProductCard({ title, collection, price, image, availability = "In Stock", href = "/" }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <Badge>New Arrival</Badge>
          <button aria-label={`Save ${title}`} className="rounded-full border border-white/70 bg-white/90 p-2 text-stone-700 backdrop-blur">
            <Heart size={16} />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
          <span className="text-xs uppercase tracking-[0.3em]">{collection}</span>
          <span className="rounded-full border border-white/50 px-3 py-1 text-[10px] uppercase tracking-[0.3em]">{availability}</span>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
            <p className="mt-1 text-sm text-stone-500">{collection}</p>
          </div>
          <Price amount={price} />
        </div>
        <div className="flex items-center gap-3">
          <Link href={href} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-800">
            <ShoppingBag size={16} /> Add to Cart
          </Link>
          <button aria-label={`Quick view ${title}`} className="rounded-full border border-stone-300 p-3 text-stone-600 transition hover:border-stone-900 hover:text-stone-900">
            <Eye size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
