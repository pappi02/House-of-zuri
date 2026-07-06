"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import type { CatalogProduct } from "@/src/types/catalog";

export function PurchaseExperience({ product }: { product: CatalogProduct }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "M");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  if (product.productType === "READY_MADE") {
    return (
      <div className="space-y-6 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Ready made</p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-900">Add it to your wardrobe</h3>
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-stone-700" htmlFor="size">Select size</label>
          <select id="size" value={size} onChange={(event) => setSize(event.target.value)} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm">
            {product.sizes?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-stone-700" htmlFor="quantity">Quantity</label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="h-10 w-10 rounded-full border border-stone-300 text-lg">
              −
            </button>
            <span className="min-w-10 text-center text-base font-semibold text-stone-900">{quantity}</span>
            <button type="button" onClick={() => setQuantity((current) => current + 1)} className="h-10 w-10 rounded-full border border-stone-300 text-lg">
              +
            </button>
          </div>
        </div>
        <Button className="w-full">Add to cart</Button>
      </div>
    );
  }

  if (product.productType === "MADE_TO_ORDER") {
    return (
      <div className="space-y-6 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Made to order</p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-900">Reserve your piece</h3>
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-stone-700" htmlFor="size">Select size</label>
          <select id="size" value={size} onChange={(event) => setSize(event.target.value)} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm">
            {product.sizes?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded-[1.25rem] bg-stone-50 p-4 text-sm text-stone-600">
          Estimated production time: {product.estimatedProductionDays ?? 10} days
        </div>
        <Button className="w-full">Add to cart</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Custom design</p>
        <h3 className="mt-3 text-2xl font-semibold text-stone-900">Start your design journey</h3>
      </div>
      <div className="rounded-[1.25rem] bg-stone-50 p-4 text-sm leading-7 text-stone-600">
        We will create a bespoke experience around your measurements, inspiration, and styling preferences.
      </div>
      <Button className="w-full">Request a consultation</Button>
      <Button variant="outline" className="w-full">
        Upload inspiration images
      </Button>
      <label className="block text-sm font-medium text-stone-700">
        <span className="mb-2 block">Tell us about your vision</span>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-28 w-full rounded-[1.25rem] border border-stone-300 px-4 py-3 text-sm" placeholder="Share notes, styling references, and fit preferences." />
      </label>
      <Button variant="secondary" className="w-full">
        Book a measurement
      </Button>
    </div>
  );
}
