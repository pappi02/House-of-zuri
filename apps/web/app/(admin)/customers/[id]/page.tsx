"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminForm } from "@/src/features/admin/components/AdminForm";
import { SelectField, TextField } from "@/src/features/admin/form/fields";
import { customerProfileSchema, type CustomerProfileValues } from "@/src/features/admin/schemas/customer.schema";

const customer = {
  id: "C-1001",
  name: "Amina Njeri",
  email: "amina@example.com",
  phone: "+254700000001",
  segment: "VIP",
  spend: "KES 480,000",
};

export default function AdminCustomerDetailPage() {
  const [values, setValues] = useState<CustomerProfileValues>({
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    segment: customer.segment as CustomerProfileValues["segment"],
  });

  const handleSubmit = () => {
    customerProfileSchema.parse(values);
    alert("Customer profile updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Client operations</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">{customer.name}</h1>
        </div>
        <Link href="/admin/customers" className="text-sm font-medium text-stone-600">Back to customers</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <AdminForm title="Profile" onSubmit={handleSubmit}>
          <TextField label="Name" value={values.name} onChange={(value) => setValues({ ...values, name: value })} />
          <TextField label="Email" value={values.email} onChange={(value) => setValues({ ...values, email: value })} />
          <TextField label="Phone" value={values.phone} onChange={(value) => setValues({ ...values, phone: value })} />
          <SelectField label="Segment" value={values.segment} onChange={(value) => setValues({ ...values, segment: value as CustomerProfileValues["segment"] })} options={[{ value: "VIP", label: "VIP" }, { value: "Returning", label: "Returning" }, { value: "New", label: "New" }]} />
          <div className="flex gap-3">
            <button type="submit" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white">Save profile</button>
            <button type="button" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700">Reset password</button>
          </div>
        </AdminForm>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">Summary</h2>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <div className="flex items-center justify-between"><span>Lifetime spend</span><span className="font-medium text-stone-900">{customer.spend}</span></div>
              <div className="flex items-center justify-between"><span>Orders</span><span className="font-medium text-stone-900">14</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
