import { http } from "@/src/lib/http";

export type InventoryItemDto = {
  id: string;
  inventoryNumber: string;
  productId: string;
  variantId: string | null;
  sku: string | null;
  onHand: number;
  reserved: number;
  status: string;
  location?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type InventoryMovementDto = {
  id: string;
  inventoryItemId: string;
  type: string;
  quantity: number;
  reason?: string | null;
  createdAt: string;
};

export async function getAllInventoryItems(): Promise<InventoryItemDto[]> {
  try {
    return await http<InventoryItemDto[]>("/inventory");
  } catch (error) {
    console.warn("Inventory list endpoint unavailable", error);
    return [];
  }
}

export async function getInventoryItemById(id: string): Promise<InventoryItemDto> {
  return http<InventoryItemDto>(`/inventory/${id}`);
}

export async function getInventoryItemByVariant(productId: string, variantId: string): Promise<InventoryItemDto> {
  return http<InventoryItemDto>(`/inventory/variants/${productId}/${variantId}`);
}

export async function createInventoryItem(data: Partial<InventoryItemDto>) {
  return http<InventoryItemDto>("/inventory", { method: "POST", body: data });
}

export async function updateInventoryItem(id: string, data: Partial<InventoryItemDto>) {
  return http<InventoryItemDto>(`/inventory/${id}`, { method: "PATCH", body: data });
}

export async function removeInventoryItem(id: string) {
  return http<unknown>(`/inventory/${id}`, { method: "DELETE" });
}

export async function receiveInventoryStock(productId: string, variantId: string, quantity: number) {
  return http<InventoryItemDto>("/inventory/receive", {
    method: "POST",
    body: { productId, variantId, quantity },
  });
}

export async function reserveInventoryStock(orderId: string, orderItemId: string, productId: string, variantId: string, quantity: number) {
  return http(`/inventory/reserve`, {
    method: "POST",
    body: { orderId, orderItemId, productId, variantId, quantity },
  });
}
