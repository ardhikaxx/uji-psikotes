import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <BrainCircuit className="size-4" />
          </span>
          <span className="text-sm font-semibold">
            PsikoTest<span className="text-primary">Pro</span>
          </span>
        </div>
        <p className="text-muted-foreground text-center text-xs">
          Platform simulasi psikotes kerja terlengkap. Latihan sesuai bidang dan
          posisi jabatan untuk pelajar, fresh graduate, dan profesional.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link href="/select-field" className="hover:text-foreground">
            Bidang Pekerjaan
          </Link>
          <Link href="/test/kraepelin" className="hover:text-foreground">
            Tes Kraepelin
          </Link>
          <Link href="/test/drawing" className="hover:text-foreground">
            Tes Wartegg
          </Link>
        </div>
      </div>
    </footer>
  );
}