export function Price({ amount, currency = "KES" }: { amount: number; currency?: string }) {
  return <span className="text-sm font-semibold text-stone-900">{currency} {amount.toLocaleString()}</span>;
}
