import { http } from "@/src/lib/http";

export async function getAdminOrders() {
  try {
    const orders = await http<any[]>("/orders");
    return orders.map((order) => ({
      id: String(order.orderNumber ?? order.id ?? ""),
      customer: String(order.customer?.name ?? order.customer ?? "Unknown"),
      total: typeof order.total === "number" ? `KES ${order.total.toLocaleString()}` : String(order.total ?? "KES 0"),
      payment: String(order.paymentStatus ?? order.payment ?? "Unknown"),
      fulfillment: String(order.fulfillmentStatus ?? order.status ?? "Unknown"),
      status: String(order.status ?? "Pending"),
    }));
  } catch (error) {
    console.error("Failed to load admin orders", error);
    return [];
  }
}
