"use client";

import { z } from "zod";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "@/src/features/customer/schemas/auth.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;

export async function loginUser(payload: LoginPayload) {
  const parsed = loginSchema.parse(payload);
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (!response.ok) {
    throw new Error("Unable to sign in right now. Please try again.");
  }

  return response.json();
}

export async function registerUser(payload: RegisterPayload) {
  const parsed = registerSchema.parse(payload);
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (!response.ok) {
    throw new Error("We could not create your account right now.");
  }

  return response.json();
}

export async function forgotPassword(payload: ForgotPasswordPayload) {
  const parsed = forgotPasswordSchema.parse(payload);
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (!response.ok) {
    throw new Error("We could not send the reset link right now.");
  }

  return response.json();
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const parsed = resetPasswordSchema.parse(payload);
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (!response.ok) {
    throw new Error("We could not reset your password right now.");
  }

  return response.json();
}
