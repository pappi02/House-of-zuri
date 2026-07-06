"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Home, LayoutGrid, MapPin, Ruler, Settings, ShoppingBag, Heart, UserRound, LogOut } from "lucide-react";
import { useAuth } from "@/src/features/auth/AuthProvider";
import { Button } from "@/src/components/ui/button";

const links = [
  { href: "/account/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/account/profile", label: "Profile", icon: UserRound },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/measurements", label: "Measurements", icon: Ruler },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/orders", label: "Orders", icon: ShoppingBag },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export function CustomerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-stone-200 bg-white/90 p-6 lg:w-72 lg:border-b-0 lg:border-r lg:py-8">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-amber-600">Customer workspace</p>
              <h2 className="mt-2 text-xl font-semibold text-stone-900">House of Zuri</h2>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-700 lg:mt-6">
              <ArrowLeft size={14} /> Back to store
            </Link>
          </div>

          <nav className="mt-8 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link key={link.href} href={link.href} className={`flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-medium transition ${active ? "bg-stone-900 text-white" : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"}`}>
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">AZ</div>
              <div>
                <p className="font-semibold text-stone-900">Amina Njeri</p>
                <p className="text-sm text-stone-500">Premium client</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full justify-center" onClick={() => logout()}>
              <LogOut size={16} /> Sign out
            </Button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-stone-200 bg-white/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">Account</p>
                <h1 className="text-lg font-semibold text-stone-900">Your account overview</h1>
              </div>
              <Link href="/account/dashboard" className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-700">
                <Home size={14} /> Dashboard
              </Link>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
