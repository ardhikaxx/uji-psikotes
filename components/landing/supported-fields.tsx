const fields = [
  "Teknologi Informasi",
  "Software Engineering",
  "Perbankan & Keuangan",
  "BUMN & Pemerintahan",
  "ASN / CPNS",
  "TNI / POLRI",
  "Manufaktur",
  "Kesehatan",
  "Pendidikan",
  "Retail & E-Commerce",
  "Logistik & Rantai Pasok",
  "Hospitality & Pariwisata",
  "Marketing Digital",
  "Sumber Daya Manusia",
  "Rekayasa (Engineering)",
];

export function SupportedFields() {
  return (
    <div className="border-y bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="text-muted-foreground mr-2 text-xs font-semibold uppercase tracking-widest">
            Didukung untuk
          </span>
          {fields.map((f) => (
            <span
              key={f}
              className="bg-background text-muted-foreground rounded-md border px-3 py-1.5 text-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}