import { z } from "zod";

export const checkoutSchema = z.object({
  addressId: z.string().min(1, "Please select an address"),
  useExistingMeasurements: z.boolean().optional(),
  measurements: z.record(z.string()).optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(["paystack", "mpesa"]).default("paystack"),
});
