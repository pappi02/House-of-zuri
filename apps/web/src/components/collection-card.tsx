import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CollectionCard({ title, description, image, href = "/" }: { title: string; description: string; image: string; href?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1">
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-6">
        <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
        <p className="text-sm leading-6 text-stone-600">{description}</p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-700">
          Explore collection <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
