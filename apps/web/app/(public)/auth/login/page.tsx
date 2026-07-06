"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/src/features/customer/api/auth-client";
import { AuthCard } from "@/src/features/customer/components/AuthCard";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/features/auth/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginUser({ email, password, rememberMe });
      await login({ email, password });
      router.push("/account/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome back" description="Sign in to access your wishlist, orders, and measurements.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error ? <div className="rounded-[1rem] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
        <label className="block text-sm font-medium text-stone-700">
          <span className="mb-2 block">Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" placeholder="you@example.com" required />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          <span className="mb-2 block">Password</span>
          <div className="flex items-center rounded-full border border-stone-300 px-4 py-3 focus-within:border-stone-900">
            <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} className="w-full bg-transparent text-sm outline-none" placeholder="••••••••" required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="ml-2 text-stone-500">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>
        <div className="flex items-center justify-between gap-3 text-sm text-stone-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
            <span>Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="font-medium text-stone-900">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
      <div className="mt-6 text-sm text-stone-600">
        New to House of Zuri? <Link href="/auth/register" className="font-semibold text-stone-900">Create an account</Link>
      </div>
    </AuthCard>
  );
}
