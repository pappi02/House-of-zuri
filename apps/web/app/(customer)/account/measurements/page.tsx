import { Container } from "@/src/components/ui/container";

const measurements = [
  { label: "Bust", value: "86 cm" },
  { label: "Waist", value: "68 cm" },
  { label: "Hip", value: "92 cm" },
  { label: "Shoulder", value: "41 cm" },
  { label: "Sleeve", value: "60 cm" },
  { label: "Height", value: "168 cm" },
  { label: "Inseam", value: "76 cm" },
];

export default function AccountMeasurementsPage() {
  return (
    <div className="bg-stone-50 py-10">
      <Container>
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Measurements</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">Keep your measurements saved for bespoke and made-to-order pieces.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {measurements.map((measurement) => (
              <div key={measurement.label} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-stone-500">{measurement.label}</p>
                <p className="mt-2 text-xl font-semibold text-stone-900">{measurement.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
