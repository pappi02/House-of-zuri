"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminForm } from "@/src/features/admin/components/AdminForm";
import { CurrencyField, SelectField, TextAreaField, TextField } from "@/src/features/admin/form/fields";
import { orderUpdateSchema, type OrderUpdateValues } from "@/src/features/admin/schemas/order.schema";

const order = {
  orderNumber: "HZ-1024",
  customer: "Amina Njeri",
  total: 84500,
  paymentStatus: "Paid",
  fulfillmentStatus: "Packed",
  status: "Processing",
  notes: "Rush production requested",
};

export default function AdminOrderDetailPage() {
  const [values, setValues] = useState<OrderUpdateValues>({
    status: order.status as OrderUpdateValues["status"],
    paymentStatus: order.paymentStatus as OrderUpdateValues["paymentStatus"],
    fulfillmentStatus: order.fulfillmentStatus as OrderUpdateValues["fulfillmentStatus"],
    notes: order.notes,
  });

  const handleSubmit = () => {
    orderUpdateSchema.parse(values);
    alert("Order updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Operations</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">{order.orderNumber}</h1>
        </div>
        <Link href="/admin/orders" className="text-sm font-medium text-stone-600">Back to orders</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <AdminForm title="Order update" onSubmit={handleSubmit}>
          <SelectField label="Status" value={values.status} onChange={(value) => setValues({ ...values, status: value as OrderUpdateValues["status"] })} options={[{ value: "Processing", label: "Processing" }, { value: "Confirmed", label: "Confirmed" }, { value: "Packed", label: "Packed" }, { value: "Shipped", label: "Shipped" }, { value: "Completed", label: "Completed" }, { value: "Cancelled", label: "Cancelled" }]} />
          <SelectField label="Payment status" value={values.paymentStatus} onChange={(value) => setValues({ ...values, paymentStatus: value as OrderUpdateValues["paymentStatus"] })} options={[{ value: "Pending", label: "Pending" }, { value: "Paid", label: "Paid" }, { value: "Refunded", label: "Refunded" }, { value: "Failed", label: "Failed" }]} />
          <SelectField label="Fulfillment status" value={values.fulfillmentStatus} onChange={(value) => setValues({ ...values, fulfillmentStatus: value as OrderUpdateValues["fulfillmentStatus"] })} options={[{ value: "Queued", label: "Queued" }, { value: "Picking", label: "Picking" }, { value: "Packed", label: "Packed" }, { value: "Shipped", label: "Shipped" }, { value: "Delivered", label: "Delivered" }]} />
          <TextAreaField label="Notes" value={values.notes ?? ""} onChange={(value) => setValues({ ...values, notes: value })} />
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white">Save changes</button>
            <button type="button" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700">Print invoice</button>
          </div>
        </AdminForm>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">Summary</h2>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <div className="flex items-center justify-between"><span>Customer</span><span className="font-medium text-stone-900">{order.customer}</span></div>
              <div className="flex items-center justify-between"><span>Total</span><span className="font-medium text-stone-900">KES {order.total.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">Timeline</h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li>Placed • 09:30</li>
              <li>Payment confirmed • 10:05</li>
              <li>Manufacturing started • 12:00</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
