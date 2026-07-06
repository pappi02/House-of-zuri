import { z } from "zod";

export const orderUpdateSchema = z.object({
  status: z.enum(["Processing", "Confirmed", "Packed", "Shipped", "Completed", "Cancelled"]),
  paymentStatus: z.enum(["Pending", "Paid", "Refunded", "Failed"]),
  fulfillmentStatus: z.enum(["Queued", "Picking", "Packed", "Shipped", "Delivered"]),
  notes: z.string().optional(),
});

export type OrderUpdateValues = z.infer<typeof orderUpdateSchema>;
