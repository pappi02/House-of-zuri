export function StatusBadge({ status, tone = "neutral" }: { status: string; tone?: "neutral" | "success" | "warning" | "danger" }) {
  const styles = {
    neutral: "bg-stone-100 text-stone-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${styles[tone]}`}>{status}</span>;
}
