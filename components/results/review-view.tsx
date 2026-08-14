"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PatternCanvas } from "@/components/test/pattern-canvas";
import { DataChart } from "@/components/test/data-chart";
import { MathFormula } from "@/components/test/math-formula";
import { loadResult } from "@/lib/storage";
import { cn, formatDate } from "@/lib/utils";
import type { AnswerDetail } from "@/types";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function ReviewQuestion({
  detail,
  index,
}: {
  detail: AnswerDetail;
  index: number;
}) {
  const q = detail.question;
  const answered = detail.userAnswer !== null;
  const isPattern = q.type === "visual" || q.type === "abstract";

  return (
    <div className="rounded-2xl border bg-card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm font-bold">Soal {index + 1}</span>
          <Badge variant="outline">{q.category}</Badge>
          {answered ? (
            detail.isCorrect ? (
              <Badge className="bg-emerald-500/15 text-emerald-600">
                <CheckCircle2 className="size-3" /> Benar
              </Badge>
            ) : (
              <Badge className="bg-rose-500/15 text-rose-600">
                <XCircle className="size-3" /> Salah
              </Badge>
            )
          ) : (
            <Badge className="bg-amber-500/15 text-amber-600">Tidak dijawab</Badge>
          )}
        </div>
      </div>

      {q.type === "data-analysis" && q.chart && (
        <div className="mx-auto mb-4 w-full max-w-xl rounded-xl border bg-background p-4">
          <DataChart chart={q.chart} />
        </div>
      )}

      {isPattern && q.pattern && (
        <div className="mb-4">
          <PatternCanvas pattern={q.pattern} />
        </div>
      )}

      <p className="mb-3 text-sm leading-relaxed sm:text-base">{q.text}</p>

      {q.formula && (
        <div className="mb-3 rounded-lg border bg-muted/40 px-6 py-4 text-xl">
          <MathFormula formula={q.formula} />
        </div>
      )}

      {isPattern && q.patternOptions ? (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {q.patternOptions.map((opt, i) => {
            const isUser = detail.userAnswer === i;
            const isKey = i === q.correctIndex;
            return (
              <div
                key={i}
                className={cn(
                  "relative rounded-xl border-2 p-2",
                  isKey
                    ? "border-emerald-500 bg-emerald-500/5"
                    : isUser
                      ? "border-rose-500 bg-rose-500/5"
                      : "border-border"
                )}
              >
                <span className="text-muted-foreground mb-1 flex items-center justify-between text-sm font-bold">
                  {LETTERS[i]}
                  {isKey && <CheckCircle2 className="text-emerald-500 size-4" />}
                  {isUser && !isKey && <XCircle className="text-rose-500 size-4" />}
                </span>
                <PatternCanvas pattern={opt} className="mx-auto" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-3 grid gap-2">
          {q.options.map((opt, i) => {
            const isUser = detail.userAnswer === i;
            const isKey = i === q.correctIndex;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-sm",
                  isKey
                    ? "border-emerald-500 bg-emerald-500/5"
                    : isUser
                      ? "border-rose-500 bg-rose-500/5"
                      : "border-border"
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                    isKey
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isUser
                        ? "border-rose-500 bg-rose-500 text-white"
                        : "text-muted-foreground border-muted-foreground/40"
                  )}
                >
                  {LETTERS[i]}
                </span>
                <span className="flex-1">{opt}</span>
                {isKey && (
                  <span className="text-emerald-600 flex items-center gap-1 text-xs font-semibold">
                    <CheckCircle2 className="size-4" /> Kunci
                  </span>
                )}
                {isUser && !isKey && (
                  <span className="text-rose-600 text-xs font-semibold">Jawaban Anda</span>
                )}
                {isUser && isKey && (
                  <span className="text-emerald-600 text-xs font-semibold">Jawaban Anda ✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-lg bg-muted/40 p-4">
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
          <Lightbulb className="text-amber-500 size-4" />
          Pembahasan
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>
        {q.steps && q.steps.length > 0 && (
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            {q.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export function ReviewView({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [details, setDetails] = React.useState<AnswerDetail[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [meta, setMeta] = React.useState<{ positionName: string; completedAt: number } | null>(null);

  React.useEffect(() => {
    const r = loadResult(sessionId);
    if (!r) {
      router.replace("/history");
      return;
    }
    // Baca hasil dari localStorage setelah mount (aman untuk hydration).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails(
      r.answerDetails.filter((d) => d.question.type !== "personality")
    );
    setMeta({
      positionName: r.positionName,
      completedAt: r.completedAt,
    });
    setLoading(false);
  }, [sessionId, router]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    );
  }

  if (!meta) return null;

  const grouped = new Map<string, AnswerDetail[]>();
  for (const d of details) {
    const key = d.question.category;
    grouped.set(key, [...(grouped.get(key) ?? []), d]);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/results/${sessionId}`}>
              <ArrowLeft className="size-4" /> Hasil
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Pembahasan Soal · {meta.positionName}
            </h1>
            <p className="text-muted-foreground text-sm">{formatDate(meta.completedAt)}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-xl border bg-card p-4 text-sm">
        <div className="mb-2 flex items-center gap-2 font-semibold">
          <ListChecks className="text-primary size-5" />
          Keterangan
        </div>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            Kotak berlabel <strong>Kunci</strong> menandakan jawaban yang benar.
          </li>
          <li>
            <strong>Jawaban Anda</strong> menandakan pilihan yang Anda pilih.
          </li>
          <li>Soal kepribadian tidak ditampilkan karena tidak memiliki jawaban benar/salah.</li>
        </ul>
      </div>

      {[...grouped.entries()].map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            {category}
            <Badge variant="secondary">{items.length}</Badge>
          </h2>
          <div className="space-y-4">
            {items.map((d, i) => (
              <ReviewQuestion key={d.questionId} detail={d} index={i} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <Button asChild>
          <Link href="/select-field">Kerjakan Simulasi Lain</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/history">Lihat Riwayat</Link>
        </Button>
      </div>
    </div>
  );
}