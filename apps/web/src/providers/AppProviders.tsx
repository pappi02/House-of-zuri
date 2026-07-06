"use client";

import * as React from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "../features/auth/AuthProvider";
import { ToastProvider } from "@/src/features/admin/components/ToastProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

