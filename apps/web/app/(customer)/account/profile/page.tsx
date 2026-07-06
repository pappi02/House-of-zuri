import { Container } from "@/src/components/ui/container";

export default function AccountProfilePage() {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Profile</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">Edit your name, phone, and account details here.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-stone-700">
              <span className="mb-2 block">First name</span>
              <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" defaultValue="Amina" />
            </label>
            <label className="block text-sm font-medium text-stone-700">
              <span className="mb-2 block">Last name</span>
              <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" defaultValue="Njeri" />
            </label>
            <label className="block text-sm font-medium text-stone-700">
              <span className="mb-2 block">Phone</span>
              <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" defaultValue="+254700000000" />
            </label>
            <label className="block text-sm font-medium text-stone-700">
              <span className="mb-2 block">Email</span>
              <input className="w-full rounded-full border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900" defaultValue="amina@example.com" />
            </label>
          </div>
        </div>
      </Container>
    </div>
  );
}
