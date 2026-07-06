"use client";

import Link from "next/link";
import { useState } from "react";
import { AddressStep } from "@/src/features/checkout/components/AddressStep";
import { CheckoutStepper } from "@/src/features/checkout/components/CheckoutStepper";
import { MeasurementStep } from "@/src/features/checkout/components/MeasurementStep";
import { PaymentStep } from "@/src/features/checkout/components/PaymentStep";
import { ReviewStep } from "@/src/features/checkout/components/ReviewStep";
import { createCheckout } from "@/src/features/checkout/api/checkout-client";

const cartItems = [
  { name: "The Zephyr Tailored Suit", price: 32000, quantity: 1, notes: "Navy wool blend", requiresMeasurements: true },
  { name: "Signature Silk Shirt", price: 18000, quantity: 2, notes: "Custom collar", requiresMeasurements: false },
];

const initialMeasurements = { bust: "88", waist: "72", hip: "94", shoulder: "42" };

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("home");
  const [measurements, setMeasurements] = useState<Record<string, string>>(initialMeasurements);
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 1500;
  const total = subtotal + delivery;

  const nextStep = () => setStep((current) => Math.min(4, current + 1));
  const prevStep = () => setStep((current) => Math.max(1, current - 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await createCheckout({
        addressId: address,
        useExistingMeasurements: true,
        measurements,
        paymentMethod: paymentMethod as "paystack" | "mpesa",
      });
      setStatus("Your order has been placed successfully.");
      setStep(4);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-16 lg:px-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.32em] text-stone-500">Checkout</p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Complete your order</h1>
      </div>

      <CheckoutStepper currentStep={step} />

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Shipping address</h2>
                <p className="mt-2 text-sm text-stone-600">Choose the address we should deliver to.</p>
              </div>
              <AddressStep value={address} onChange={setAddress} />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Measurements</h2>
                <p className="mt-2 text-sm text-stone-600">We will tailor any made-to-order pieces for your fit.</p>
              </div>
              <MeasurementStep items={cartItems} value={measurements} onChange={setMeasurements} />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Review & confirm</h2>
                <p className="mt-2 text-sm text-stone-600">Please verify everything before placing your order.</p>
              </div>
              <ReviewStep items={cartItems.map((item) => ({ name: item.name, price: item.price, quantity: item.quantity, notes: item.notes }))} address={address} measurements={measurements} total={total} />
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-stone-900">Payment</h2>
                <p className="mt-2 text-sm text-stone-600">Choose a secure payment method.</p>
              </div>
              <PaymentStep value={paymentMethod} onChange={setPaymentMethod} />
              {status ? <p className="rounded-[1rem] border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{status}</p> : null}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-6">
            <button type="button" onClick={prevStep} disabled={step === 1} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700 disabled:cursor-not-allowed disabled:opacity-50">Back</button>
            {step < 4 ? (
              <button type="button" onClick={nextStep} className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white">Continue</button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-70">{isSubmitting ? "Placing order..." : "Place order"}</button>
            )}
          </div>
        </section>

        <aside className="rounded-[2rem] border border-stone-200 bg-stone-50 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm text-stone-600">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>KES {subtotal.toLocaleString()}</span></div>
            <div className="flex items-center justify-between"><span>Delivery</span><span>KES {delivery.toLocaleString()}</span></div>
            <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3 text-base font-semibold text-stone-900"><span>Total</span><span>KES {total.toLocaleString()}</span></div>
          </div>
          <Link href="/cart" className="mt-6 inline-flex text-sm font-medium text-stone-700">Return to cart</Link>
        </aside>
      </div>
    </main>
  );
}
