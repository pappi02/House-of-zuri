"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { resetPassword } from "@/src/features/customer/api/auth-client";
import { AuthCard } from "@/src/features/customer/components/AuthCard";
import { Button } from "@/src/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword({ password, confirmPassword });
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not reset your password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Choose a new password" description="Set a new password to continue accessing your account.">
      {success ? (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-700">
          <div className="flex items-center gap-2 font-semibold"><CheckCircle2 size={16} /> Password updated</div>
          <p className="mt-3">Your password was changed successfully. You will be redirected to the sign in page shortly.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {error ? <div className="rounded-[1rem] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
          <label className="block text-sm font-medium text-stone-700">
            <span className="mb-2 block">New password</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" required />
          </label>
          <label className="block text-sm font-medium text-stone-700">
            <span className="mb-2 block">Confirm new password</span>
            <input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" required />
          </label>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Updating..." : "Update password"}</Button>
        </form>
      )}
    </AuthCard>
  );
}
