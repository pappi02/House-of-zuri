import Link from "next/link";
import { Container } from "@/src/components/ui/container";
import { Badge } from "@/src/components/ui/badge";

const recentOrders = [
  { orderNumber: "HZ-1024", status: "Manufacturing", total: 24500 },
  { orderNumber: "HZ-1012", status: "Fulfilled", total: 18600 },
];

const quickLinks = [
  { title: "Profile", href: "/account/profile" },
  { title: "Measurements", href: "/account/measurements" },
  { title: "Addresses", href: "/account/addresses" },
  { title: "Wishlist", href: "/account/wishlist" },
  { title: "Orders", href: "/account/orders" },
];

export default function AccountDashboardPage() {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-amber-600">Welcome back</p>
              <h1 className="mt-3 text-3xl font-semibold text-stone-900">Your customer workspace</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Track orders, manage your measurements, and revisit your wishlist from one calm, premium dashboard.</p>
            </div>
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Authenticated</Badge>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-stone-900">Recent orders</h2>
              <Link href="/account/orders" className="text-sm font-medium text-stone-700">View all</Link>
            </div>
            <div className="mt-6 space-y-4">
              {recentOrders.map((order) => (
                <div key={order.orderNumber} className="flex items-center justify-between rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                  <div>
                    <p className="font-semibold text-stone-900">{order.orderNumber}</p>
                    <p className="mt-1 text-sm text-stone-500">{order.status}</p>
                  </div>
                  <p className="text-sm font-semibold text-stone-900">KES {order.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">Quick access</h2>
            <div className="mt-6 grid gap-3">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-4 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
