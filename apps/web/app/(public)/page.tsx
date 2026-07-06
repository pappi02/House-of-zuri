import Link from "next/link";
import { ArrowRight, BadgeCheck, MessageCircleHeart, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { CollectionCard } from "@/src/components/collection-card";
import { ProductCard } from "@/src/components/product-card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Container } from "@/src/components/ui/container";
import { SectionHeading } from "@/src/components/ui/section-heading";

const collections = [
  {
    title: "Ready Made",
    description: "Elevated staples and statement essentials crafted for everyday polish.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    href: "/collections/ready-made",
  },
  {
    title: "Custom Tailoring",
    description: "Bespoke silhouettes, precise proportions, and a fit that feels effortless.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    href: "/custom-tailoring",
  },
  {
    title: "Graduation Edit",
    description: "Refined occasionwear for memorable milestones and modern celebrations.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    href: "/collections/graduation",
  },
];

const featuredProducts = [
  {
    title: "Sculpted Wool Coat",
    collection: "Winter Edit",
    price: 24500,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    availability: "In Stock" as const,
    href: "/products/sculpted-wool-coat",
  },
  {
    title: "Signature Silk Dress",
    collection: "Eveningwear",
    price: 18600,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    availability: "Made to Order" as const,
    href: "/products/signature-silk-dress",
  },
  {
    title: "Tailored Linen Set",
    collection: "Studio Essentials",
    price: 15800,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    availability: "In Stock" as const,
    href: "/products/tailored-linen-set",
  },
];

const reasons = [
  {
    title: "Precision fitting",
    description: "Measurements are taken with care and translated into garments that fall beautifully.",
    icon: Sparkles,
  },
  {
    title: "White-glove service",
    description: "From consultation to delivery, every step is coordinated with calm, attentive support.",
    icon: ShieldCheck,
  },
  {
    title: "Fast dispatch",
    description: "Ready-made pieces are packed and dispatched with premium presentation and care.",
    icon: Truck,
  },
  {
    title: "Thoughtful styling",
    description: "Our stylists curate looks that balance confidence, ease, and lasting elegance.",
    icon: BadgeCheck,
  },
];

const testimonials = [
  {
    quote: "Every detail felt considered. The tailoring was immaculate and the experience was luxurious from start to finish.",
    name: "Amina M.",
    role: "Private client",
  },
  {
    quote: "The team helped me create a look that felt modern and timeless at the same time.",
    name: "Naomi T.",
    role: "Custom tailoring client",
  },
  {
    quote: "The ready-made collection feels elevated, chic, and effortlessly wearable.",
    name: "Sarah K.",
    role: "Studio member",
  },
];

export default function PublicHome() {
  return (
    <div className="bg-stone-50 text-stone-900">
      <section className="relative overflow-hidden border-b border-stone-200 bg-[linear-gradient(135deg,#fcfaf7_0%,#f7efe6_45%,#f2e7d8_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_55%)]" />
        <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="max-w-2xl">
            <Badge className="border-amber-200 bg-white/80 text-amber-700">Luxury tailoring • Nairobi</Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Made-to-measure dressing for life’s most memorable moments.
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-600">
              House of Zuri brings together premium ready-made pieces and bespoke tailoring in a distinctly modern wardrobe experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <Link href="/collections">Shop the edit</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/custom-tailoring">Book a fitting</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-stone-600">
              <div>
                <p className="text-2xl font-semibold text-stone-900">120+</p>
                <p>bespoke clients</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-stone-900">48h</p>
                <p>dispatch on ready-made</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-stone-900">4.9/5</p>
                <p>client satisfaction</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 hidden h-32 w-32 rounded-full bg-amber-200/60 blur-3xl lg:block" />
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)]">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
                alt="A luxury fashion client in an elegant House of Zuri look"
                className="h-[520px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="mt-4 flex items-center justify-between rounded-[1.25rem] border border-stone-200 bg-stone-50 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Featured service</p>
                  <p className="mt-1 font-semibold text-stone-900">Private styling consultations</p>
                </div>
                <Link href="/about" className="text-sm font-medium text-stone-700 hover:text-stone-950">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Curated worlds"
            title="Collections shaped for every occasion"
            description="From statement dressing to everyday polish, each edit is designed to feel refined, effortless, and distinctly yours."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.title} {...collection} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-stone-200 bg-white/70 py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Featured pieces"
            title="The wardrobe essentials our clients return to"
            description="Discover tailored staples and elevated classics that transition seamlessly from day to evening."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-stone-900 p-8 text-white shadow-[0_25px_70px_-30px_rgba(0,0,0,0.4)] sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300">Why clients choose us</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A thoughtful experience that feels as elevated as the garments themselves.
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-300">
              We combine premium design, expert fittings, and concierge-level care to make wardrobe building feel effortless.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-stone-200">
              <MessageCircleHeart size={16} className="text-amber-300" />
              <span>Personal guidance from consultation to delivery</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-stone-900">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-24">
        <Container>
          <SectionHeading
            eyebrow="Client love"
            title="Stories from clients who wear House of Zuri"
            description="From special occasions to everyday confidence, our clients trust us to create pieces that feel personal and lasting."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[1.5rem] border border-stone-200 bg-white p-7 shadow-sm">
                <p className="text-base leading-8 text-stone-600">“{item.quote}”</p>
                <div className="mt-6">
                  <p className="font-semibold text-stone-900">{item.name}</p>
                  <p className="text-sm text-stone-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-24">
        <Container>
          <div className="rounded-[2rem] border border-stone-200 bg-stone-900 px-8 py-12 text-white shadow-[0_30px_80px_-35px_rgba(0,0,0,0.55)] sm:px-10 lg:px-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300">Join the private list</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Receive first access to our newest silhouettes, fittings, and private drops.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <Link href="/collections">Explore collections</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white hover:text-stone-900">
                  <Link href="/about">Meet the studio</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

