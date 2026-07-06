"use client";

import Link from "next/link";
import { ReactNode } from "react";

export function AuthCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center bg-stone-50 px-4 py-16">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_30px_80px_-35px_rgba(0,0,0,0.3)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-[linear-gradient(135deg,#1c1917_0%,#44403c_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-amber-300">House of Zuri</p>
            <h2 className="mt-4 text-3xl font-semibold">Your account, tailored for every appointment and order.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-300">Sign in to view your wishlist, track orders, manage measurements, and continue your shopping journey.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-sm text-stone-200">
            “Every detail, considered.”
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-stone-900">{title}</h1>
            <p className="mt-2 text-sm leading-7 text-stone-600">{description}</p>
          </div>
          {children}
          <div className="mt-8 text-sm text-stone-600">
            Need help? <Link href="/support" className="font-medium text-stone-900">Contact support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
