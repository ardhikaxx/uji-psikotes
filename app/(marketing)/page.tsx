"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  Lightbulb,
  Play,
  ShieldCheck,
  Timer,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStats } from "@/hooks/useFields";
import { getParticipantCount } from "@/lib/storage";
import { ExamMockup } from "@/components/landing/exam-mockup";
import { TestTypeList, testTypes } from "@/components/landing/test-type-list";
import { SupportedFields } from "@/components/landing/supported-fields";

function StatValue({
  value,
  loading,
}: {
  value: string;
  loading: boolean;
}) {
  if (loading) return <Skeleton className="h-8 w-16" />;
  return (
    <span className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
      {value}
    </span>
  );
}

export default function HomePage() {
  const { data: stats, isLoading } = useStats();
  const [localParticipants, setLocalParticipants] = React.useState(0);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalParticipants(getParticipantCount());
  }, []);

  const participants = (stats?.participants ?? 0) + localParticipants;

  const statsItems = [
    {
      label: "Bidang Pekerjaan",
      value: stats?.fieldCount?.toString() ?? "",
      loading: isLoading,
    },
    {
      label: "Posisi Jabatan",
      value: stats?.positionCount?.toString() ?? "",
      loading: isLoading,
    },
    {
      label: "Total Soal",
      value: stats?.totalQuestions?.toLocaleString("id-ID") ?? "",
      loading: isLoading,
    },
    {
      label: "Peserta Simulasi",
      value: participants.toLocaleString("id-ID"),
      loading: isLoading,
    },
  ];

  const steps = [
    {
      title: "Pilih Bidang",
      desc: "Tentukan bidang pekerjaan sesuai target karirmu — IT, Keuangan, BUMN, dan lainnya.",
    },
    {
      title: "Pilih Posisi",
      desc: "Sistem menyusun bank soal yang relevan dengan posisi jabatan yang kamu lamar.",
    },
    {
      title: "Latihan & Analisis",
      desc: "Kerjakan simulasi dengan waktu nyata, lalu pelajari pembahasan dan evaluasi hasil.",
    },
  ];

  const features = [
    {
      icon: ClipboardCheck,
      title: "Bank soal spesifik posisi",
      desc: "Kombinasi soal verbal, numerik, logika, kepribadian, hingga SJT yang disusun sesuai posisi yang kamu incar.",
    },
    {
      icon: Timer,
      title: "Waktu pengerjaan realistis",
      desc: "Setiap simulasi mengikuti durasi seperti psikotes sungguhan, lengkap dengan hitung mundur dan jawaban tersimpan otomatis.",
    },
    {
      icon: BookOpenCheck,
      title: "Pembahasan tiap soal",
      desc: "Tidak hanya skor — pelajari kunci jawaban, langkah penyelesaian, dan penjelasan untuk setiap soal.",
    },
    {
      icon: Lightbulb,
      title: "Evaluasi & rekomendasi",
      desc: "Profil kepribadian, skor per kategori, persentil, serta tips perbaikan untuk meningkatkan kesiapanmu.",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* HERO */}
      <section className="relative border-b bg-background">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="flex flex-col items-start">
            <div className="border-primary/30 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <span className="bg-primary size-1.5 rounded-full" />
              Simulasi psikotes kerja terlengkap
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Siap Hadapi{" "}
              <span className="relative whitespace-nowrap">
                Psikotes Kerja
                <span className="bg-primary absolute -bottom-1 left-0 h-1.5 w-full" />
              </span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-lg text-lg leading-relaxed">
              Latihan tes verbal, numerik, logika, kepribadian, Kraepelin, dan
              Wartegg — disusun sesuai bidang dan posisi pekerjaan yang kamu
              lamar.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button size="lg" asChild className="h-12 px-8 text-base">
                <Link href="/select-field">
                  Mulai Latihan Sekarang
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 text-base"
              >
                <Link href="/test/kraepelin">
                  <Play className="mr-2 size-4" />
                  Coba Tes Kraepelin
                </Link>
              </Button>
            </div>
            <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4" />
                Gratis untuk pelajar & fresh graduate
              </span>
              <span className="flex items-center gap-2">
                <BarChart3 className="size-4" />
                Hasil & analisis lengkap
              </span>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <ExamMockup />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b bg-muted/40">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {statsItems.map((item, i) => (
            <div
              key={item.label}
              className={
                "flex flex-col gap-1 " +
                (i % 2 === 1 ? "border-l border-border pl-8 " : "") +
                (i >= 1 ? "lg:border-l lg:border-border lg:pl-8" : "")
              }
            >
              <StatValue value={item.value} loading={item.loading} />
              <p className="text-muted-foreground text-sm font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TEST TYPES */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Semua Jenis Tes yang Disimulasikan
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Setiap tes bisa langsung kamu coba tanpa biaya.
            </p>
          </div>
          <Button variant="outline" asChild className="h-10">
            <Link href="/select-field">
              Lihat Latihan Per Bidang
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <TestTypeList items={testTypes.slice(0, 6)} />
          <TestTypeList items={testTypes.slice(6)} />
        </div>
      </section>

      {/* SUPPORTED FIELDS */}
      <SupportedFields />

      {/* HOW IT WORKS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Cara Kerja
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Tiga langkah sederhana untuk mulai mempersiapkan karirmu.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              {i < steps.length - 1 && (
                <div className="bg-border absolute top-6 left-14 hidden h-px w-[calc(100%-3.5rem)] md:block" />
              )}
              <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full text-lg font-bold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Kenapa Latihan di Sini?
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Pendekatan latihan yang dekat dengan kondisi psikotes asli di
              perusahaan.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="bg-background text-primary flex size-11 shrink-0 items-center justify-center rounded-lg border">
                  <f.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-muted-foreground mt-1.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="bg-foreground text-background rounded-2xl px-6 py-16 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Mulai Persiapan Karirmu Hari Ini
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-70">
            Gratis, tanpa registrasi. Pilih bidang pekerjaanmu dan mulai
            latihan psikotes sekarang juga.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              asChild
              className="bg-background text-foreground hover:bg-background/80 h-12 px-8 text-base"
            >
              <Link href="/select-field">
                Mulai Latihan Sekarang
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          <div className="text-background/60 mt-5 flex items-center justify-center gap-2 text-sm">
            <Users className="size-4" />
            Bergabung dengan ribuan calon karyawan
          </div>
        </div>
      </section>
    </div>
  );
}