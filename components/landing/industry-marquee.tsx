const industries = [
  "Teknologi Informasi",
  "Software Engineer",
  "Perbankan",
  "BUMN",
  "ASN / CPNS",
  "TNI / POLRI",
  "Manufaktur",
  "Kesehatan",
  "Pendidikan",
  "Retail & E-Commerce",
  "Pertambangan",
  "Telekomunikasi",
  "Logistik",
  "Hospitality",
  "Keuangan & Akuntansi",
  "Startup",
  "Human Resource",
  "Pemasaran Digital",
  "Konstruksi",
  "Energi",
];

export function IndustryMarquee() {
  const row = [...industries, ...industries];
  return (
    <div className="relative overflow-hidden border-y bg-muted/40 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-3">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="bg-card shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            {name}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}