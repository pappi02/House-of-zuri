import Link from "next/link";

import { SiteHeader } from "@/src/components/site-header";
import { Container } from "@/src/components/ui/container";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
      <SiteHeader />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-stone-200 bg-white">
        <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-900">House of Zuri</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-stone-600">
              Luxury tailoring and elevated essentials crafted for modern life.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-stone-600">
            <Link href="/collections" className="transition hover:text-stone-950">
              Collections
            </Link>
            <Link href="/custom-tailoring" className="transition hover:text-stone-950">
              Tailoring
            </Link>
            <Link href="/about" className="transition hover:text-stone-950">
              About
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}

