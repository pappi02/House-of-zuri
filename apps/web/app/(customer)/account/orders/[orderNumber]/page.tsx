import { Container } from "@/src/components/ui/container";

export default function AccountOrderDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Order details</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">Review order items, payment, manufacturing, and fulfillment progress.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-500">Order</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">{(async () => (await params).orderNumber)()}</p>
            </div>
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-500">Payment status</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">Paid</p>
            </div>
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-500">Manufacturing status</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">In progress</p>
            </div>
            <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-500">Fulfillment status</p>
              <p className="mt-2 text-lg font-semibold text-stone-900">Packed</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
