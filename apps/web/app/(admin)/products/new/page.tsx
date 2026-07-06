import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Catalog</p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">New product</h1>
        </div>
        <Link href="/admin/products" className="text-sm font-medium text-stone-600">Back to products</Link>
      </div>

      <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-stone-700">
            <span className="mb-2 block">Product name</span>
            <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm" />
          </label>
          <label className="text-sm font-medium text-stone-700">
            <span className="mb-2 block">Product type</span>
            <select className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm">
              <option>Ready Made</option>
              <option>Made-to-Order</option>
              <option>Custom</option>
            </select>
          </label>
          <label className="text-sm font-medium text-stone-700">
            <span className="mb-2 block">Price</span>
            <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm" />
          </label>
          <label className="text-sm font-medium text-stone-700">
            <span className="mb-2 block">Collection</span>
            <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm" />
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white">Save draft</button>
          <button className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700">Upload images</button>
        </div>
      </div>
    </div>
  );
}
