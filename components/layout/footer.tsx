import Link from "next/link";
import { BrainCircuit } from "lucide-react";

const testLinks = [
  { href: "/test/verbal", label: "Tes Verbal" },
  { href: "/test/numeric", label: "Tes Numerik" },
  { href: "/test/logical", label: "Tes Logika" },
  { href: "/test/personality", label: "Tes Kepribadian" },
  { href: "/test/sjt", label: "Tes SJT" },
  { href: "/test/accuracy", label: "Tes Ketelitian" },
  { href: "/test/data-analysis", label: "Analisis Data" },
  { href: "/test/visual", label: "Tes Visual" },
  { href: "/test/abstract", label: "Tes Abstrak" },
  { href: "/test/kraepelin", label: "Tes Kraepelin" },
  { href: "/test/drawing", label: "Tes Gambar" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
                <BrainCircuit className="size-4" />
              </span>
              <span className="text-sm font-semibold">
                PsikoTest<span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">
              Platform simulasi psikotes kerja terlengkap. Latihan sesuai bidang
              dan posisi jabatan untuk pelajar, fresh graduate, dan profesional.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Jenis Tes</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {testLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-muted-foreground text-xs hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Navigasi</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-muted-foreground text-xs hover:text-foreground"
              >
                Beranda
              </Link>
              <Link
                href="/select-field"
                className="text-muted-foreground text-xs hover:text-foreground"
              >
                Latihan Per Bidang
              </Link>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-8 border-t pt-4 text-center text-xs">
          © {new Date().getFullYear()} PsikoTest Pro. Dikembangkan oleh{" "}
          <Link
            href="https://yanuar-ardhika.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium hover:underline"
          >
            Yanuar Ardhika Rahmadhani Ubaidillah
          </Link>
          . Dibuat untuk latihan persiapan psikotes kerja.
        </p>
      </div>
    </footer>
  );
}