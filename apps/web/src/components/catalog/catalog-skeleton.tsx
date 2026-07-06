export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
      <div className="aspect-[4/5] rounded-[1.25rem] bg-stone-200" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-24 rounded bg-stone-200" />
        <div className="h-6 w-3/4 rounded bg-stone-200" />
        <div className="h-4 w-full rounded bg-stone-200" />
        <div className="h-10 rounded-full bg-stone-200" />
      </div>
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="aspect-[4/5] animate-pulse rounded-[2rem] bg-stone-200" />
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-stone-200" />
          <div className="h-8 w-3/4 rounded bg-stone-200" />
          <div className="h-4 w-full rounded bg-stone-200" />
          <div className="h-4 w-5/6 rounded bg-stone-200" />
          <div className="h-12 rounded-[1.5rem] bg-stone-200" />
        </div>
      </div>
    </div>
  );
}
