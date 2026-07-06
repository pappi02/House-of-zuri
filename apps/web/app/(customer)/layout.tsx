import { CustomerShell } from "@/src/features/customer/components/CustomerShell";
import { AuthGuard } from "@/src/features/customer/components/AuthGuard";

export default function CustomerGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <CustomerShell>{children}</CustomerShell>
    </AuthGuard>
  );
}


