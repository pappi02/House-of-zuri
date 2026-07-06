import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.enum(["Ready Made", "Made-to-Order", "Custom"]),
  price: z.coerce.number().min(0),
  collection: z.string().optional(),
  description: z.string().optional(),
  published: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;
