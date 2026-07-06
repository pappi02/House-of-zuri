"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CommandPalette } from "@/src/features/admin/components/CommandPalette";
import { NotificationCenter } from "@/src/features/admin/components/NotificationCenter";

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/products", label: "Catalog" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/manufacturing", label: "Manufacturing" },
  { href: "/admin/fulfillment", label: "Fulfillment" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/settings", label: "Settings" },
];

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.slice(1).map((segment, index) => ({
    label: segment.replace(/-/g, " "),
    href: `/${segments.slice(1, index + 2).join("/")}`,
  }));

  return crumbs.length ? crumbs : [{ label: "dashboard", href: "/admin/dashboard" }];
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname ?? "/admin/dashboard");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-stone-950/95 px-5 py-6 lg:w-72 lg:border-b-0 lg:border-r lg:px-6">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-400">House of Zuri</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Operations Console</h2>
            </div>
            <div className="rounded-full border border-stone-700 px-3 py-1 text-xs text-stone-300 lg:mt-4">Admin</div>
          </div>

          <nav className="mt-8 grid gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href === "/admin/dashboard" && pathname === "/admin");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm transition ${isActive ? "bg-stone-100 text-stone-900" : "text-stone-300 hover:bg-stone-900 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="border-b border-white/10 bg-stone-950/80 px-5 py-4 backdrop-blur lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm text-stone-400">Operations Workspace</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-500">
                  {breadcrumbs.map((crumb, index) => (
                    <span key={crumb.href} className="flex items-center gap-2">
                      {index > 0 ? <span>/</span> : null}
                      <span className={index === breadcrumbs.length - 1 ? "text-stone-300" : ""}>{crumb.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden rounded-full border border-stone-700 bg-stone-900/70 px-3 py-2 text-sm text-stone-400 md:flex" onClick={() => setCommandPaletteOpen(true)}>
                  <span className="mr-2">⌕</span>
                  Search
                </button>
                <NotificationCenter />
                <div className="rounded-full border border-stone-700 bg-stone-100 px-3 py-2 text-sm font-medium text-stone-900">AM</div>
              </div>
            </div>
          </header>

          <main className="flex-1 bg-stone-50 text-stone-900">
            <div className="mx-auto w-full max-w-7xl p-5 sm:p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </div>

      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </div>
  );
}

