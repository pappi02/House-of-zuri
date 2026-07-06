import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  tier: z.enum(["VIP", "Returning", "New"]),
  notes: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

export const customerProfileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  segment: z.enum(["VIP", "Returning", "New"]),
});

export type CustomerProfileValues = z.infer<typeof customerProfileSchema>;
