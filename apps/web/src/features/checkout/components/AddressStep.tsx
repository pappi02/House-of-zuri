"use client";

import { useState } from "react";

export function AddressStep({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [showNewAddress, setShowNewAddress] = useState(false);

  const addresses = [
    { id: "home", label: "Home", details: "Westlands, Nairobi • Gate B" },
    { id: "office", label: "Office", details: "Upper Hill, Nairobi • Reception" },
  ];

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {addresses.map((address) => (
          <label key={address.id} className={`flex cursor-pointer items-start gap-3 rounded-[1.25rem] border p-4 ${value === address.id ? "border-stone-900 bg-stone-50" : "border-stone-200 bg-white"}`}>
            <input type="radio" name="address" checked={value === address.id} onChange={() => onChange(address.id)} />
            <div>
              <p className="font-semibold text-stone-900">{address.label}</p>
              <p className="mt-1 text-sm text-stone-600">{address.details}</p>
            </div>
          </label>
        ))}
      </div>

      <button type="button" onClick={() => setShowNewAddress((current) => !current)} className="text-sm font-medium text-stone-700">
        {showNewAddress ? "Hide new address" : "+ Add a new address"}
      </button>

      {showNewAddress ? (
        <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
          <label className="block text-sm font-medium text-stone-700">
            <span className="mb-2 block">Recipient name</span>
            <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" />
          </label>
          <label className="mt-3 block text-sm font-medium text-stone-700">
            <span className="mb-2 block">Address</span>
            <textarea className="min-h-24 w-full rounded-[1.25rem] border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" />
          </label>
        </div>
      ) : null}
    </div>
  );
}
