import type { Metadata } from "next";

import { PublicLayout } from "@/src/app-shell/PublicLayout";
import { GuestGuard } from "@/src/features/customer/components/GuestGuard";

export const metadata: Metadata = {
  title: "House of Zuri",
};

export default function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <PublicLayout>{children}</PublicLayout>
    </GuestGuard>
  );
}

