"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  FileQuestion,
  Layers,
  Play,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStats } from "@/hooks/useFields";
import { getParticipantCount } from "@/lib/storage";
import { HeroIllustration } from "@/components/landing/hero-illustration";
import { TestTypeGrid } from "@/components/landing/test-type-grid";
import { IndustryMarquee } from "@/components/landing/industry-marquee";

function StatValue({
  value,
  loading,
}: {
  value: string;
  loading: boolean;
}) {
  if (loading) return <Skeleton className="h-8 w-16" />;
  return <span className="text-3xl font-bold sm:text-4xl">{value}</span>;
}

export default function HomePage() {
  const { data: stats, isLoading } = useStats();
  const [localParticipants, setLocalParticipants] = React.useState(0);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalParticipants(getParticipantCount());
  }, []);

  const participants =
    (stats?.participants ?? 0) + localParticipants;

  const statsItems = [
    {
      icon: Layers,
      label: "Bidang Pekerjaan",
      value: stats?.fieldCount?.toString() ?? "",
      loading: isLoading,
    },
    {
      icon: Briefcase,
      label: "Posisi Jabatan",
      value: stats?.positionCount?.toString() ?? "",
      loading: isLoading,
    },
    {
      icon: FileQuestion,
      label: "Total Soal",
      value: stats?.totalQuestions?.toLocaleString("id-ID") ?? "",
      loading: isLoading,
    },
    {
      icon: Users,
      label: "Peserta Simulasi",
      value: participants.toLocaleString("id-ID"),
      loading: isLoading,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent)]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary/10 text-primary mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
              <Sparkles className="size-4" />
              Platform simulasi psikotes kerja terlengkap
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Siap Hadapi{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Psikotes Kerja
              </span>{" "}
              di Perusahaan Impianmu
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Latihan psikotes berdasarkan bidang pekerjaan dan posisi jabatan
              yang kamu pilih. Tes verbal, numerik, logika, kepribadian, SJT,
              ketelitian, analisis data, Kraepelin, hingga Wartegg — semuanya
              dalam satu platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="h-12 px-6 text-base">
                <Link href="/select-field">
                  Mulai Latihan Sekarang
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-6 text-base"
              >
                <Link href="/test/kraepelin">
                  <Play className="size-5" />
                  Coba Tes Kraepelin
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Trophy className="size-4 text-amber-500" />
                Gratis untuk pelajar & fresh graduate
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 className="size-4 text-emerald-500" />
                Hasil & analisis lengkap
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {statsItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-primary mx-auto mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="size-5" />
              </div>
              <StatValue value={item.value} loading={item.loading} />
              <p className="text-muted-foreground mt-1 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEST TYPES */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Jenis Tes yang Disimulasikan
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
            Seluruh jenis psikotes profesional yang umum digunakan dalam proses
            rekrutmen perusahaan besar.
          </p>
        </div>
        <TestTypeGrid />
      </section>

      <IndustryMarquee />

      {/* HOW IT WORKS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Cara Kerja</h2>
          <p className="text-muted-foreground mt-3">
            Tiga langkah sederhana menuju kesiapan kerja.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pilih Bidang",
              desc: "Pilih bidang pekerjaan yang sesuai minat, dari IT, keuangan, HRD, hingga BUMN.",
            },
            {
              step: "02",
              title: "Pilih Posisi",
              desc: "Pilih posisi jabatan spesifik agar soal otomatis disesuaikan dengan kebutuhan.",
            },
            {
              step: "03",
              title: "Latihan & Analisis",
              desc: "Kerjakan tes dengan timer, autosave, lalu lihat hasil lengkap dan pembahasan.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-xl border bg-card p-6 text-center"
            >
              <span className="bg-primary text-primary-foreground inline-flex size-12 items-center justify-center rounded-full text-lg font-bold">
                {s.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="bg-gradient-to-br from-primary to-purple-700 rounded-2xl px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Mulai Perjalanan Karirmu Hari Ini
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Bergabung dengan ribuan calon karyawan yang telah berlatih di
            PsikoTest Pro.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="mt-7 h-12 px-8 text-base"
          >
            <Link href="/select-field">
              Mulai Latihan Sekarang
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}