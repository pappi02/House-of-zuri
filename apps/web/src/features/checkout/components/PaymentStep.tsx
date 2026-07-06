"use client";

import { CreditCard, Smartphone } from "lucide-react";

export function PaymentStep({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-4">
      <label className={`flex cursor-pointer items-center justify-between rounded-[1.25rem] border p-4 ${value === "paystack" ? "border-stone-900 bg-stone-50" : "border-stone-200 bg-white"}`}>
        <div className="flex items-center gap-3">
          <CreditCard size={18} />
          <div>
            <p className="font-semibold text-stone-900">Paystack</p>
            <p className="text-sm text-stone-600">Card, mobile money, or bank transfer</p>
          </div>
        </div>
        <input type="radio" name="payment" checked={value === "paystack"} onChange={() => onChange("paystack")} />
      </label>

      <label className={`flex cursor-pointer items-center justify-between rounded-[1.25rem] border p-4 ${value === "mpesa" ? "border-stone-900 bg-stone-50" : "border-stone-200 bg-white"}`}>
        <div className="flex items-center gap-3">
          <Smartphone size={18} />
          <div>
            <p className="font-semibold text-stone-900">M-Pesa</p>
            <p className="text-sm text-stone-600">Fast mobile checkout for Kenya</p>
          </div>
        </div>
        <input type="radio" name="payment" checked={value === "mpesa"} onChange={() => onChange("mpesa")} />
      </label>
    </div>
  );
}
