import { http } from "@/src/lib/http";

export type FulfillmentDto = {
  id: string;
  fulfillmentNumber: string | null;
  orderId: string;
  status: string;
  packingSlipId?: string | null;
  dispatchRecordId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FulfillmentItemDto = {
  id: string;
  orderItemId: string;
  productId: string;
  variantId?: string | null;
  quantity: number;
  status: string;
};

export async function getFulfillments() {
  return http<FulfillmentDto[]>("/admin/fulfillments");
}

export async function getFulfillment(id: string) {
  return http<FulfillmentDto>(`/admin/fulfillments/${id}`);
}

export async function startPacking(id: string) {
  return http(`/admin/fulfillments/${id}/start-packing`, { method: "PATCH" });
}

export async function completePacking(id: string, items: FulfillmentItemDto[]) {
  return http(`/admin/fulfillments/${id}/complete-packing`, {
    method: "PATCH",
    body: { items },
  });
}

export async function markReadyForDispatch(id: string) {
  return http(`/admin/fulfillments/${id}/ready-for-dispatch`, { method: "PATCH" });
}

export async function dispatchFulfillment(id: string, carrier?: string, trackingNumber?: string) {
  return http(`/admin/fulfillments/${id}/dispatch`, {
    method: "PATCH",
    body: { carrier: carrier ?? null, trackingNumber: trackingNumber ?? null },
  });
}

export async function completeFulfillment(id: string) {
  return http(`/admin/fulfillments/${id}/complete`, { method: "PATCH" });
}
