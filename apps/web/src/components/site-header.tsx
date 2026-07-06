"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, Heart, UserRound, X } from "lucide-react";
import { Container } from "./ui/container";

const navItems = [
  { label: "Collections", href: "/collections" },
  { label: "Ready Made", href: "/collections/ready-made" },
  { label: "Custom Tailoring", href: "/custom-tailoring" },
  { label: "Graduation", href: "/collections/graduation" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
      <Container className="py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4 rounded-full border border-stone-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button aria-label="Open menu" className="rounded-full p-2 text-stone-700 md:hidden" onClick={() => setMobileOpen(true)}>
              <Menu size={18} />
            </button>
            <Link href="/" className="text-lg font-semibold uppercase tracking-[0.35em] text-stone-900">
              House of Zuri
            </Link>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-stone-700 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-stone-950">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button aria-label="Search" className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-700">
              <Search size={16} />
            </button>
            <button aria-label="Wishlist" className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-700">
              <Heart size={16} />
            </button>
            <button aria-label="Cart" className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-700">
              <ShoppingBag size={16} />
            </button>
            <button aria-label="Account" className="rounded-full border border-stone-200 bg-white p-2.5 text-stone-700">
              <UserRound size={16} />
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/70 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.32em] text-stone-900">Menu</span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="rounded-full border border-stone-200 p-2 text-stone-700">
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-base text-stone-700">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="transition hover:text-stone-950">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
