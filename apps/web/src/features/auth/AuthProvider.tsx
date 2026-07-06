"use client";

import * as React from "react";

export type Role = "Admin" | "Tailor" | "Manager" | "Customer";

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  // Placeholder APIs for Sprint F1. Hook real endpoints later.
  login: (args: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    async login() {
      // TODO: wire to real API
      setUser({ id: "seed", email: "demo@houseofzuri.com", role: "Customer" });
    },
    async logout() {
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

