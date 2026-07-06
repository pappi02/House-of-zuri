"use client";

import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "@/src/features/customer/api/auth-client";
import { AuthCard } from "@/src/features/customer/components/AuthCard";
import { Button } from "@/src/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send the reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Reset your password" description="Enter your email and we will send a secure reset link.">
      {sent ? (
        <div className="space-y-4 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-700">
          <p className="font-semibold">Check your inbox</p>
          <p>If the email exists in our system, you will receive a secure reset link shortly.</p>
          <Link href="/auth/login" className="font-semibold text-emerald-800">Return to sign in</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {error ? <div className="rounded-[1rem] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
          <label className="block text-sm font-medium text-stone-700">
            <span className="mb-2 block">Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" placeholder="you@example.com" required />
          </label>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Send reset link"}</Button>
        </form>
      )}
    </AuthCard>
  );
}
