"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

const initialItems = [
  { id: "1", name: "The Zephyr Tailored Suit", price: 32000, quantity: 1, notes: "Navy wool blend" },
  { id: "2", name: "Signature Silk Shirt", price: 18000, quantity: 2, notes: "Custom collar" },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const delivery = subtotal > 0 ? 1500 : 0;
  const total = subtotal + delivery;

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-16 lg:px-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.32em] text-stone-500">Shopping cart</p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Your curated selection</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[2rem] border border-stone-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-stone-900">Your cart is currently empty.</p>
          <p className="mt-2 text-sm text-stone-600">Explore our collections to add pieces to your wardrobe.</p>
          <Link href="/products" className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.8fr_0.9fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-stone-900">{item.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{item.notes}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-stone-200 px-2 py-2">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full p-1 hover:bg-stone-100" aria-label={`Decrease quantity for ${item.name}`}>
                      <Minus size={16} />
                    </button>
                    <span className="min-w-6 text-center text-sm font-semibold text-stone-900">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full p-1 hover:bg-stone-100" aria-label={`Increase quantity for ${item.name}`}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="min-w-[7rem] text-right text-sm font-semibold text-stone-900">KES { (item.price * item.quantity).toLocaleString() }</p>
                  <button type="button" onClick={() => removeItem(item.id)} className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900" aria-label={`Remove ${item.name}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-[2rem] border border-stone-200 bg-stone-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm text-stone-600">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>KES {subtotal.toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span>Delivery</span><span>KES {delivery.toLocaleString()}</span></div>
              <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900"><span>Total</span><span>KES {total.toLocaleString()}</span></div>
            </div>
            <Link href="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white">Proceed to checkout</Link>
            <Link href="/products" className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700">Continue shopping</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
