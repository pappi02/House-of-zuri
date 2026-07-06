export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Setup</p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Settings</h1>
      </div>

      <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Operational defaults</h2>
        <p className="mt-3 text-sm text-stone-600">Configure warehouse rules, payment approvals, and production defaults from this workspace.</p>
      </div>
    </div>
  );
}
