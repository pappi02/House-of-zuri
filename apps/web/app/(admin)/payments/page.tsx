import { DataTable } from "@/src/features/admin/components/DataTable";
import { StatusBadge } from "@/src/features/admin/components/StatusBadge";

const payments = [
  { reference: "PAY-1001", customer: "Amina Njeri", amount: "KES 84,500", status: <StatusBadge status="Completed" tone="success" /> },
  { reference: "PAY-1002", customer: "Lily Otieno", amount: "KES 128,900", status: <StatusBadge status="Review" tone="warning" /> },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Finance</p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">Payments</h1>
      </div>

      <DataTable title="Payment ledger" columns={[{ key: "reference", label: "Reference" }, { key: "customer", label: "Customer" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" }]} rows={payments} />
    </div>
  );
}
