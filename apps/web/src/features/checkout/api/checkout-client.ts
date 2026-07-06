"use client";

import { z } from "zod";
import { checkoutSchema } from "@/src/features/checkout/schemas/checkout.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export type CheckoutPayload = z.infer<typeof checkoutSchema>;

export async function createCheckout(payload: CheckoutPayload) {
  const parsed = checkoutSchema.parse(payload);
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (!response.ok) {
    throw new Error("We could not create your order right now.");
  }

  return response.json();
}
