"use client";

function formatDate(value: Date) {
  return value.toLocaleDateString("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ReviewStep({ items, address, measurements, total }: { items: Array<{ name: string; price: number; quantity: number; notes?: string }>; address: string; measurements?: Record<string, string>; total: number }) {
  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
        <h3 className="font-semibold text-stone-900">Items</h3>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-[1rem] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700">
              <div>
                <p className="font-medium text-stone-900">{item.name}</p>
                {item.notes ? <p className="mt-1 text-xs text-stone-500">{item.notes}</p> : null}
              </div>
              <div className="text-right">
                <p className="font-semibold text-stone-900">x{item.quantity}</p>
                <p className="text-xs text-stone-500">KES {item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
        <h3 className="font-semibold text-stone-900">Delivery address</h3>
        <p className="mt-2 text-sm text-stone-600">{address}</p>
      </div>

      {measurements && Object.keys(measurements).length ? (
        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
          <h3 className="font-semibold text-stone-900">Measurements summary</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(measurements).map(([key, value]) => (
              <span key={key} className="rounded-full bg-white px-3 py-1 text-sm text-stone-600">{key}: {value}</span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
        <div className="flex items-center justify-between text-sm text-stone-600">
          <span>Estimated delivery</span>
          <span>{formatDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-base font-semibold text-stone-900">
          <span>Total</span>
          <span>KES {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
