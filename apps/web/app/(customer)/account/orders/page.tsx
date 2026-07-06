import Link from "next/link";
import { Container } from "@/src/components/ui/container";

const orders = [
  { orderNumber: "HZ-1024", date: "04 Jul 2026", status: "Manufacturing", total: "KES 24,500" },
  { orderNumber: "HZ-1012", date: "19 Jun 2026", status: "Fulfilled", total: "KES 18,600" },
];

export default function AccountOrdersPage() {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Orders</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">Track the progress of your recent purchases and custom pieces.</p>
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <div key={order.orderNumber} className="flex flex-col gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-stone-900">{order.orderNumber}</p>
                  <p className="mt-1 text-sm text-stone-500">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white px-3 py-1 text-sm text-stone-600">{order.status}</span>
                  <span className="text-sm font-semibold text-stone-900">{order.total}</span>
                  <Link href={`/account/orders/${order.orderNumber}`} className="text-sm font-medium text-stone-700">View details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
