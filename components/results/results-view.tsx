"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Download,
  FileText,
  History,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { loadResult } from "@/lib/storage";
import { buildInterpretation } from "@/lib/scoring";
import { formatDate, formatDurationShort } from "@/lib/utils";
import type { TestResult } from "@/types";

const DIM_LABELS: Record<string, string> = {
  Openness: "Keterbukaan",
  Conscientiousness: "Ketelitian",
  Extraversion: "Ekstroversi",
  Agreeableness: "Keramahan",
  Neuroticism: "Stabilitas Emosi",
};

const PIE_COLORS = ["#10b981", "#f43f5e", "#cbd5e1"];

function Ring({ value, label }: { value: number; label: string }) {
  const r = 80;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color =
    value >= 80 ? "#10b981" : value >= 60 ? "#f59e0b" : "#f43f5e";
  return (
    <div className="relative flex flex-col items-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-muted"
          strokeWidth="14"
        />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-extrabold">{value}</div>
        <div className="text-muted-foreground text-xs">{label}</div>
      </div>
    </div>
  );
}

export function ResultsView({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [result, setResult] = React.useState<TestResult | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [exporting, setExporting] = React.useState(false);
  const printRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const r = loadResult(sessionId);
    if (!r) {
      router.replace("/history");
      return;
    }
    // Baca hasil dari localStorage setelah mount (aman untuk hydration).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(r);
    setLoading(false);
  }, [sessionId, router]);

  async function handleExport() {
    if (!result) return;
    setExporting(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);
      const node = printRef.current;
      if (!node) return;
      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
      pdf.save(`hasil-psikotes-${result.positionName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    );
  }

  if (!result) return null;

  const objective = result.categories.filter((c) => c.category !== "Tes Kepribadian");
  const objTotal = objective.reduce((s, c) => s + c.total, 0);
  const objAnswered = objective.reduce((s, c) => s + c.answered, 0);
  const objCorrect = objective.reduce((s, c) => s + c.correct, 0);
  const objWrong = objAnswered - objCorrect;
  const objUnanswered = objTotal - objAnswered;
  const tips = buildInterpretation(result);

  const barData = objective.map((c) => ({
    name: c.category.replace("Tes ", "").replace(" (SJT)", ""),
    score: c.score,
    fill: "#6366f1",
  }));

  const pieData = [
    { name: "Benar", value: objCorrect },
    { name: "Salah", value: objWrong },
    { name: "Tidak dijawab", value: objUnanswered },
  ].filter((d) => d.value > 0);

  const radarData = result.personality
    ? Object.entries(result.personality.dimensions).map(([dim, score]) => ({
        dimension: DIM_LABELS[dim] ?? dim,
        score,
      }))
    : [];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="size-4" /> Beranda
            </Link>
          </Button>
          <Badge variant="secondary">
            <History className="size-3" /> {formatDate(result.completedAt)}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/history">
              <History className="size-4" /> Riwayat
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={exporting}>
            {exporting ? <Download className="animate-spin size-4" /> : <Download className="size-4" />}
            Unduh PDF
          </Button>
        </div>
      </div>

      <div ref={printRef} className="rounded-2xl border bg-card p-6 sm:p-8 print:shadow-none">
        {/* Hero */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Badge className="mb-3">{result.fieldName}</Badge>
          <h1 className="text-2xl font-bold sm:text-3xl">{result.positionName}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Simulasi selesai dalam {formatDurationShort(result.durationUsed)}
          </p>
          <div className="mt-6">
            <Ring value={result.readinessScore} label="Kesiapan Kerja" />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-xl bg-muted/60 px-4 py-3 text-center">
              <div className="text-2xl font-bold text-primary">{result.totalScore}</div>
              <div className="text-muted-foreground text-xs">Skor Total</div>
            </div>
            <div className="rounded-xl bg-muted/60 px-4 py-3 text-center">
              <div className="text-2xl font-bold">{result.rankingPercentile}%</div>
              <div className="text-muted-foreground text-xs">Persentil</div>
            </div>
            <div className="rounded-xl bg-muted/60 px-4 py-3 text-center">
              <div className="text-2xl font-bold">{result.accuracy}%</div>
              <div className="text-muted-foreground text-xs">Akurasi</div>
            </div>
          </div>
        </div>

        {/* Category scores */}
        <Card className="mb-6 print:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary size-5" />
              Skor per Kategori
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis domain={[0, 100]} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="score" name="Skor" radius={[6, 6, 0, 0]}>
                    {barData.map((d, i) => (
                      <Cell key={i} fill={d.score >= 75 ? "#10b981" : d.score >= 55 ? "#6366f1" : "#f43f5e"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Personality radar */}
        {result.personality && radarData.length > 0 && (
          <Card className="mb-6 print:shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary size-5" />
                Profil Kepribadian (Big Five)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto h-72 max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="dimension" fontSize={12} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      dataKey="score"
                      name="Skor Anda"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.35}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
                {result.personality.interpretation}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Answer breakdown */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Card className="print:shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="text-primary size-4" />
                Rincian Jawaban
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {pieData.map((d, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="print:shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="text-primary size-4" />
                Ringkasan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {[
                ["Total soal", `${result.totalQuestions}`],
                ["Dijawab", `${result.answered}`],
                ["Benar", `${result.correct}`],
                ["Salah", `${result.wrong}`],
                ["Tidak dijawab", `${result.unanswered}`],
                ["Durasi pengerjaan", formatDurationShort(result.durationUsed)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Interpretation */}
        <Card className="mb-6 print:shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-amber-500 size-5" />
              Rekomendasi & Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-relaxed">
              {tips.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/select-field">
            <RotateCcw className="size-4" /> Kerjakan Lagi
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/results/${sessionId}/review`}>
            <BookOpen className="size-4" /> Lihat Pembahasan Soal
          </Link>
        </Button>
      </div>
    </div>
  );
}