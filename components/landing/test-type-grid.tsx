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
} from "lucide-react";

const testTypes = [
  {
    icon: Brain,
    title: "Tes Verbal",
    desc: "Sinonim, antonim, analogi kata, pemahaman bacaan, dan logika bahasa.",
  },
  {
    icon: Calculator,
    title: "Tes Numerik",
    desc: "Aritmatika, persentase, pecahan, perbandingan, deret angka, dan pola matematika.",
  },
  {
    icon: Shapes,
    title: "Tes Logika",
    desc: "Silogisme, hubungan sebab-akibat, logika formal, dan analisis kasus.",
  },
  {
    icon: UserRound,
    title: "Tes Kepribadian",
    desc: "Model Big Five, DISC, dan pernyataan sikap untuk memetakan profil diri.",
  },
  {
    icon: MessagesSquare,
    title: "Situation Judgement",
    desc: "Studi kasus pekerjaan nyata sesuai bidang yang Anda pilih.",
  },
  {
    icon: ScanSearch,
    title: "Tes Ketelitian",
    desc: "Pencocokan data, identifikasi perbedaan, dan pengecekan dokumen.",
  },
  {
    icon: BarChart3,
    title: "Analisis Data",
    desc: "Grafik, tabel, diagram batang, dan diagram lingkaran untuk diinterpretasi.",
  },
  {
    icon: Eye,
    title: "Visual & Abstrak",
    desc: "Pola gambar, rotasi objek, dan hubungan antar bentuk geometris.",
  },
  {
    icon: Fingerprint,
    title: "Tes Kraepelin",
    desc: "Simulasi tes angka berkolom dengan penilaian kecepatan dan ketepatan.",
  },
  {
    icon: FileCheck2,
    title: "Tes Wartegg",
    desc: "Delapan kotak gambar untuk mengungkap kreativitas dan kepribadian.",
  },
];

export function TestTypeGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {testTypes.map((t) => (
        <div
          key={t.title}
          className="group rounded-xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
        >
          <div className="bg-primary/10 text-primary mb-3 flex size-11 items-center justify-center rounded-lg">
            <t.icon className="size-6" />
          </div>
          <h3 className="font-semibold">{t.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{t.desc}</p>
        </div>
      ))}
    </div>
  );
}