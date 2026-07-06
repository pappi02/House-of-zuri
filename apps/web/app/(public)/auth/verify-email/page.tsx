"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AuthCard } from "@/src/features/customer/components/AuthCard";
import { Button } from "@/src/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Verify your email" description="We have sent you a confirmation message. Please check your inbox to continue.">
      <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-700">
        <div className="flex items-center gap-2 font-semibold"><CheckCircle2 size={16} /> Email verification pending</div>
        <p className="mt-3 leading-7">Once your email is verified, you can continue shopping and access your customer workspace.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <Link href="/auth/login">Continue to sign in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/collections">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
