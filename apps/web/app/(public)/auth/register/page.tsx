"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/src/features/customer/api/auth-client";
import { AuthCard } from "@/src/features/customer/components/AuthCard";
import { Button } from "@/src/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUser(form);
      router.push("/auth/verify-email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create your account" description="Join House of Zuri to save measurements, track orders, and manage your wardrobe.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error ? <div className="rounded-[1rem] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-stone-700">
            <span className="mb-2 block">First name</span>
            <input value={form.firstName} onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" required />
          </label>
          <label className="block text-sm font-medium text-stone-700">
            <span className="mb-2 block">Last name</span>
            <input value={form.lastName} onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" required />
          </label>
        </div>
        <label className="block text-sm font-medium text-stone-700">
          <span className="mb-2 block">Email</span>
          <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} type="email" className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" required />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          <span className="mb-2 block">Phone</span>
          <input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" required />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          <span className="mb-2 block">Password</span>
          <div className="flex items-center rounded-full border border-stone-300 px-4 py-3 focus-within:border-stone-900">
            <input value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} type={showPassword ? "text" : "password"} className="w-full bg-transparent text-sm outline-none" required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="ml-2 text-stone-500">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>
        <label className="block text-sm font-medium text-stone-700">
          <span className="mb-2 block">Confirm password</span>
          <input value={form.confirmPassword} onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))} type={showPassword ? "text" : "password"} className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" required />
        </label>
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button>
      </form>
      <div className="mt-6 text-sm text-stone-600">
        Already have an account? <Link href="/auth/login" className="font-semibold text-stone-900">Sign in</Link>
      </div>
    </AuthCard>
  );
}
