import Link from "next/link";
import {
  Brain,
  Calculator,
  FileCheck2,
  Fingerprint,
  BarChart3,
  Eye,
  Shapes,
  UserRound,
  MessagesSquare,
  ScanSearch,
  TreePine,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const testTypes = [
  {
    icon: Brain,
    title: "Tes Verbal",
    desc: "Sinonim, antonim, analogi kata, pemahaman bacaan.",
    href: "/test/verbal",
  },
  {
    icon: Calculator,
    title: "Tes Numerik",
    desc: "Aritmatika, persentase, perbandingan, deret angka.",
    href: "/test/numeric",
  },
  {
    icon: Shapes,
    title: "Tes Logika",
    desc: "Silogisme, penalaran, dan logika formal.",
    href: "/test/logical",
  },
  {
    icon: UserRound,
    title: "Tes Kepribadian",
    desc: "Pemetaan profil Big Five.",
    href: "/test/personality",
  },
  {
    icon: MessagesSquare,
    title: "Situation Judgement",
    desc: "Studi kasus kerja nyata sesuai bidang.",
    href: "/test/sjt",
  },
  {
    icon: ScanSearch,
    title: "Tes Ketelitian",
    desc: "Pencocokan data dan pengecekan detail.",
    href: "/test/accuracy",
  },
  {
    icon: BarChart3,
    title: "Analisis Data",
    desc: "Membaca grafik, tabel, dan diagram.",
    href: "/test/data-analysis",
  },
  {
    icon: Eye,
    title: "Tes Visual",
    desc: "Pola gambar dan hubungan antar bentuk.",
    href: "/test/visual",
  },
  {
    icon: Fingerprint,
    title: "Tes Abstrak",
    desc: "Penalaran non-verbal dan pola abstrak.",
    href: "/test/abstract",
  },
  {
    icon: FileCheck2,
    title: "Tes Kraepelin",
    desc: "Angka berkolom untuk kecepatan dan ketepatan.",
    href: "/test/kraepelin",
  },
  {
    icon: TreePine,
    title: "Tes Gambar",
    desc: "Wartegg, BAUM, dan DAM.",
    href: "/test/drawing",
  },
];

export function TestTypeList({ items = testTypes }: { items?: typeof testTypes }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      {items.map((t, i) => (
        <Link
          key={t.title}
          href={t.href}
          className={cn(
            "group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/60",
            i !== items.length - 1 && "border-b"
          )}
        >
          <span className="bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
            <t.icon className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{t.title}</span>
            <span className="text-muted-foreground block truncate text-sm">
              {t.desc}
            </span>
          </span>
          <ArrowRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        </Link>
      ))}
    </div>
  );
}