import { http } from "@/src/lib/http";

export type ManufacturingJobDto = {
  id: string;
  jobNumber: string | null;
  orderId: string;
  status: string;
  priority?: number | null;
  startedAt?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type WorkOrderDto = {
  id: string;
  workOrderNumber: string | null;
  manufacturingJobId: string;
  orderItemId: string;
  productId: string;
  variantId: string | null;
  assignedTailorId?: string | null;
  status: string;
  estimatedCompletionDate?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function getManufacturingJobs(orderId?: string) {
  const path = orderId ? `/admin/manufacturing/jobs?orderId=${encodeURIComponent(orderId)}` : "/admin/manufacturing/jobs";
  return http<ManufacturingJobDto[]>(path);
}

export async function getManufacturingJob(id: string) {
  return http<ManufacturingJobDto>(`/admin/manufacturing/jobs/${id}`);
}

export async function createManufacturingJob(orderId: string, priority?: number) {
  return http<ManufacturingJobDto>("/admin/manufacturing/jobs", {
    method: "POST",
    body: { orderId, priority },
  });
}

export async function startWorkOrderCutting(id: string) {
  return http(`/admin/manufacturing/work-orders/${id}/start-cutting`, { method: "PATCH" });
}

export async function startWorkOrderSewing(id: string) {
  return http(`/admin/manufacturing/work-orders/${id}/start-sewing`, { method: "PATCH" });
}

export async function finishWorkOrder(id: string) {
  return http(`/admin/manufacturing/work-orders/${id}/finish`, { method: "PATCH" });
}
