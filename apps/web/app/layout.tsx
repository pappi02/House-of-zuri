import type { Metadata } from "next";

import "./globals.css";
import "@/src/ui/tokens.css";

import { AppProviders } from "@/src/providers/AppProviders";

export const metadata: Metadata = {
  title: "House of Zuri",
  description: "Tailoring and fashion management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

