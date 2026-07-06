"use client";

export function Timeline({ items }: { items: Array<{ title: string; detail: string; state?: "complete" | "active" | "pending" }> }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const tone = item.state === "complete" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : item.state === "active" ? "border-stone-900 bg-stone-50 text-stone-900" : "border-stone-200 bg-white text-stone-600";
        return (
          <div key={`${item.title}-${index}`} className={`rounded-[1.25rem] border p-4 ${tone}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">{item.title}</p>
              <span className="text-xs uppercase tracking-[0.2em]">{item.state ?? "pending"}</span>
            </div>
            <p className="mt-2 text-sm">{item.detail}</p>
          </div>
        );
      })}
    </div>
  );
}
