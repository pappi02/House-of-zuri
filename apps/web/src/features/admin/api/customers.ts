import { http } from "@/src/lib/http";

export async function getAdminCustomers() {
  try {
    const customers = await http<any[]>("/admin/customers");
    return customers.map((customer) => ({
      id: String(customer.id ?? customer.customerNumber ?? ""),
      name: String(customer.name ?? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim() || "Unknown Customer"),
      segment: String(customer.segment ?? customer.type ?? "Retail"),
      spend:
        typeof customer.lifetimeSpend === "number"
          ? `KES ${customer.lifetimeSpend.toLocaleString()}`
          : String(customer.spend ?? "KES 0"),
      orders: Number(customer.orderCount ?? customer.orders ?? 0),
      status: String(customer.status ?? "Active"),
    }));
  } catch (error) {
    console.error("Failed to load admin customers", error);
    return [];
  }
}
