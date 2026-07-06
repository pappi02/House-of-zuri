export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Analytics</p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Reports</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Revenue trend</h2>
          <p className="mt-3 text-sm text-stone-600">Weekly conversion and ordering performance for the brand.</p>
        </div>
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Fulfillment health</h2>
          <p className="mt-3 text-sm text-stone-600">Average turnaround times and backlog indicators.</p>
        </div>
      </div>
    </div>
  );
}
