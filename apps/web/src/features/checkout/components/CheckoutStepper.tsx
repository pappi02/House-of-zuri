"use client";

import { CheckCircle2 } from "lucide-react";

const steps = ["Shipping", "Measurements", "Review", "Payment"];

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isComplete = index + 1 < currentStep;

        return (
          <div key={step} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${isActive ? "border-stone-900 bg-stone-900 text-white" : isComplete ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-stone-200 bg-white text-stone-600"}`}>
            {isComplete ? <CheckCircle2 size={15} /> : <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[11px]">{index + 1}</span>}
            {step}
          </div>
        );
      })}
    </div>
  );
}
