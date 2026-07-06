"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminForm } from "@/src/features/admin/components/AdminForm";
import { CurrencyField, FileUploaderField, SelectField, SwitchField, TextAreaField, TextField } from "@/src/features/admin/form/fields";
import { productSchema, type ProductFormValues } from "@/src/features/admin/schemas/product.schema";

const product = {
  id: "P-1001",
  name: "The Zephyr Tailored Suit",
  type: "Made-to-Order",
  price: 32000,
  collection: "The Atelier",
  description: "Bespoke tailoring with premium wool",
  published: true,
};

export default function AdminProductDetailPage() {
  const [values, setValues] = useState<ProductFormValues>({
    name: product.name,
    type: product.type as ProductFormValues["type"],
    price: product.price,
    collection: product.collection,
    description: product.description,
    published: product.published,
  });

  const handleSubmit = () => {
    productSchema.parse(values);
    alert("Product saved");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Catalog</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">{product.name}</h1>
        </div>
        <Link href="/admin/products" className="text-sm font-medium text-stone-600">Back to products</Link>
      </div>

      <AdminForm title="Product edit" onSubmit={handleSubmit}>
        <TextField label="Product name" value={values.name} onChange={(value) => setValues({ ...values, name: value })} />
        <SelectField label="Product type" value={values.type} onChange={(value) => setValues({ ...values, type: value as ProductFormValues["type"] })} options={[{ value: "Ready Made", label: "Ready Made" }, { value: "Made-to-Order", label: "Made-to-Order" }, { value: "Custom", label: "Custom" }]} />
        <CurrencyField label="Price" value={values.price} onChange={(value) => setValues({ ...values, price: value })} />
        <TextField label="Collection" value={values.collection ?? ""} onChange={(value) => setValues({ ...values, collection: value })} />
        <TextAreaField label="Description" value={values.description ?? ""} onChange={(value) => setValues({ ...values, description: value })} />
        <SwitchField label="Publish product" value={values.published} onChange={(value) => setValues({ ...values, published: value })} />
        <FileUploaderField label="Images" />
        <div className="flex gap-3">
          <button type="submit" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white">Save product</button>
          <button type="button" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700">Archive</button>
        </div>
      </AdminForm>
    </div>
  );
}
