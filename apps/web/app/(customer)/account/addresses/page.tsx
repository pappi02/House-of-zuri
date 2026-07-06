import { Container } from "@/src/components/ui/container";

export default function AccountAddressesPage() {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Address book</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">Save your preferred delivery locations for future orders and fittings.</p>
          <div className="mt-8 space-y-4">
            {[
              { label: "Home", details: "Westlands, Nairobi • 2nd floor • Gate B" },
              { label: "Office", details: "Upper Hill, Nairobi • Reception desk" },
            ].map((address) => (
              <div key={address.label} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
                <p className="font-semibold text-stone-900">{address.label}</p>
                <p className="mt-2 text-sm text-stone-600">{address.details}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
