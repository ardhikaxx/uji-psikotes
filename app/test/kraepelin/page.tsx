"use client";

import * as React from "react";
import { AlertTriangle, CheckCircle2, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCountdown } from "@/hooks/useCountdown";
import { cn, formatDurationShort } from "@/lib/utils";
import type { KraepelinResult } from "@/types";

const COLUMNS = 6;
const ROWS = 30;
const SECONDS_PER_COLUMN = 30;

function generateColumn(): number[] {
  return Array.from({ length: ROWS }, () => Math.floor(Math.random() * 9) + 1);
}

function lastDigit(a: number, b: number): number {
  return (a + b) % 10;
}

function computeKraepelinResult(
  columns: number[][],
  answers: (number | null)[][],
  elapsedSeconds: number
): KraepelinResult {
  const perColumn = columns.map((numbers, colIdx) => {
    let correct = 0;
    let wrong = 0;
    let answeredTotal = 0;
    const colAnswers = answers[colIdx] ?? [];
    for (let i = 0; i < ROWS - 1; i++) {
      const expected = lastDigit(numbers[i], numbers[i + 1]);
      const val = colAnswers[i];
      if (val === undefined || val === null) continue;
      answeredTotal++;
      if (val === expected) correct++;
      else wrong++;
    }
    return {
      column: colIdx + 1,
      correct,
      wrong,
      total: answeredTotal,
    };
  });

  const totalOperations = COLUMNS * (ROWS - 1);
  const correct = perColumn.reduce((s, c) => s + c.correct, 0);
  const wrong = perColumn.reduce((s, c) => s + c.wrong, 0);
  const answered = correct + wrong;
  const skipped = totalOperations - answered;
  const minutes = Math.max(elapsedSeconds / 60, 0.25);

  const correctPerCol = perColumn.map((c) => c.correct);
  const meanCorrect = correct / perColumn.length || 1;
  const variance =
    correctPerCol.reduce((s, c) => s + Math.pow(c - meanCorrect, 2), 0) /
    perColumn.length;
  const stdDev = Math.sqrt(variance);
  const consistency = Math.max(
    0,
    Math.min(100, Math.round(100 - (stdDev / meanCorrect) * 100))
  );

  const accPerCol = perColumn.map((c) =>
    c.total > 0 ? (c.correct / c.total) * 100 : 0
  );
  const meanAcc = accPerCol.reduce((s, a) => s + a, 0) / accPerCol.length;
  const accVariance =
    accPerCol.reduce((s, a) => s + Math.pow(a - meanAcc, 2), 0) /
    accPerCol.length;
  const stability = Math.max(
    0,
    Math.min(100, Math.round(100 - Math.sqrt(accVariance)))
  );

  return {
    columns: COLUMNS,
    totalOperations,
    correct,
    wrong,
    skipped,
    accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    speedPerMinute: Math.round(answered / minutes),
    consistency,
    productivity: answered,
    stability,
    perColumn,
  };
}

type Phase = "intro" | "test" | "result";

export default function KraepelinPage() {
  const [phase, setPhase] = React.useState<Phase>("intro");
  const [columns, setColumns] = React.useState<number[][]>([]);
  const [answers, setAnswers] = React.useState<(number | null)[][]>([]);
  const [activeColumn, setActiveColumn] = React.useState(0);
  const [result, setResult] = React.useState<KraepelinResult | null>(null);
  const [elapsed, setElapsed] = React.useState(0);

  const finishTest = React.useCallback(() => {
    setResult(
      computeKraepelinResult(
        columns,
        answers,
        elapsed + SECONDS_PER_COLUMN
      )
    );
    setPhase("result");
  }, [columns, answers, elapsed]);

  const advanceColumn = React.useCallback(() => {
    setElapsed((e) => e + SECONDS_PER_COLUMN);
    if (activeColumn >= COLUMNS - 1) {
      finishTest();
    } else {
      setActiveColumn((c) => c + 1);
    }
  }, [activeColumn, finishTest]);

  const columnTime = useCountdown(
    SECONDS_PER_COLUMN,
    phase === "test",
    advanceColumn
  );

  React.useEffect(() => {
    if (result) {
      saveKraepelinResult(result);
    }
  }, [result]);

  function handleStart() {
    const cols = Array.from({ length: COLUMNS }, () => generateColumn());
    setColumns(cols);
    setAnswers(Array.from({ length: COLUMNS }, () => Array(ROWS - 1).fill(null)));
    setActiveColumn(0);
    setElapsed(0);
    setPhase("test");
  }

  function handleInput(colIdx: number, rowIdx: number, value: string) {
    if (colIdx !== activeColumn) return;
    const digit = value.replace(/\D/g, "").slice(-1);
    setAnswers((prev) => {
      const next = prev.map((col, i) =>
        i === colIdx
          ? col.map((v, j) => (j === rowIdx ? (digit === "" ? null : Number(digit)) : v))
          : col
      );
      return next;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent, colIdx: number, rowIdx: number) {
    if (e.key === "ArrowDown" && rowIdx < ROWS - 2) {
      const el = document.getElementById(`k-${colIdx}-${rowIdx + 1}`);
      el?.focus();
    }
    if (e.key === "ArrowUp" && rowIdx > 0) {
      const el = document.getElementById(`k-${colIdx}-${rowIdx - 1}`);
      el?.focus();
    }
  }

  // Intro
  if (phase === "intro") {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-12">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <Badge className="mb-4">Tes Kraepelin / Pauli</Badge>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Tes Ketelitian Angka Berkolom
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Anda akan mengerjakan <strong>{COLUMNS} kolom angka</strong>, masing-masing{" "}
            <strong>{ROWS} baris</strong>. Jumlahkan dua angka yang berdekatan dan
            tuliskan <strong>digit terakhir</strong> dari hasil penjumlahan pada kolom
            kosong di antara keduanya. Setiap kolom diberikan waktu{" "}
            <strong>{SECONDS_PER_COLUMN} detik</strong> sebelum otomatis berpindah ke
            kolom berikutnya.
          </p>
          <div className="mt-5 rounded-lg bg-muted/50 p-4 text-sm">
            <p className="font-semibold">Contoh:</p>
            <p className="mt-1">
              5 + 7 = 12 → tulis <strong>2</strong>
            </p>
            <p>8 + 9 = 17 → tulis <strong>7</strong></p>
          </div>
          <Button size="lg" className="mt-6 w-full" onClick={handleStart}>
            <Play className="size-5" />
            Mulai Tes
          </Button>
        </div>
      </div>
    );
  }

  // Result
  if (phase === "result" && result) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-emerald-500 size-9" />
            <div>
              <h1 className="text-2xl font-bold">Hasil Tes Kraepelin</h1>
              <p className="text-muted-foreground text-sm">
                Ketelitian, kecepatan, dan stabilitas kerja Anda
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Kecepatan", value: `${result.speedPerMinute}/mnt` },
              { label: "Ketepatan", value: `${result.accuracy}%` },
              { label: "Konsistensi", value: `${result.consistency}%` },
              { label: "Stabilitas", value: `${result.stability}%` },
            ].map((m) => (
              <div key={m.label} className="rounded-lg bg-muted/50 p-3 text-center">
                <div className="text-xl font-bold">{m.value}</div>
                <div className="text-muted-foreground text-xs">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {[
              { label: "Produktivitas", value: result.productivity },
              { label: "Benar", value: result.correct },
              { label: "Salah", value: result.wrong },
              { label: "Tidak dijawab", value: result.skipped },
            ].map((m) => (
              <div key={m.label} className="rounded-lg border p-3">
                <div className="text-lg font-bold">{m.value}</div>
                <div className="text-muted-foreground text-xs">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold">Per Kolom</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {result.perColumn.map((c) => (
                <div
                  key={c.column}
                  className="rounded-lg border p-2 text-center text-xs"
                >
                  <span className="font-semibold">Kolom {c.column}</span>
                  <span className="text-muted-foreground block">
                    {c.correct} benar · {c.wrong} salah
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold">Interpretasi</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {result.accuracy >= 85 && result.speedPerMinute >= 25
                ? "Kecepatan dan ketepatan Anda sangat baik. Anda menunjukkan ketahanan kerja yang kuat dan cocok untuk pekerjaan yang menuntut konsentrasi tinggi dalam waktu lama."
                : result.accuracy >= 70
                  ? "Ketepatan Anda baik. Pertahankan konsistensi dan tingkatkan sedikit kecepatan agar produktivitas meningkat."
                  : "Ketepatan Anda perlu ditingkatkan. Latih konsentrasi dan pemeriksaan ulang agar kesalahan berkurang."}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleStart}>Ulangi Tes</Button>
            <Button variant="outline" onClick={() => setPhase("intro")}>
              Kembali
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Test
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold">Tes Kraepelin</h1>
          <p className="text-muted-foreground text-xs">
            Kolom {activeColumn + 1} dari {COLUMNS}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-lg font-bold",
              columnTime <= 10
                ? "bg-red-100 text-red-600 dark:bg-red-500/20"
                : "bg-muted"
            )}
          >
            <Clock className="size-4" />
            {formatDurationShort(columnTime)}
          </span>
          <Badge variant={activeColumn >= COLUMNS - 1 ? "destructive" : "secondary"}>
            {activeColumn >= COLUMNS - 1 ? "Kolom terakhir" : `Berpindah dalam ${columnTime}s`}
          </Badge>
        </div>
      </header>

      <Progress
        value={((activeColumn + 1) / COLUMNS) * 100}
        className="mb-5"
      />

      <div className="flex items-start justify-center gap-3 overflow-x-auto sm:gap-6">
        {columns.map((numbers, colIdx) => {
          const isActive = colIdx === activeColumn;
          return (
            <div
              key={colIdx}
              className={cn(
                "rounded-xl border p-3 transition-all",
                isActive
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "opacity-50"
              )}
            >
              <div className="text-muted-foreground mb-2 text-center text-xs font-bold">
                {colIdx + 1}
              </div>
              <div className="flex flex-col items-center">
                {numbers.map((num, rowIdx) => (
                  <React.Fragment key={rowIdx}>
                    {rowIdx > 0 && (
                      <input
                        id={`k-${colIdx}-${rowIdx - 1}`}
                        value={answers[colIdx]?.[rowIdx - 1] ?? ""}
                        onChange={(e) =>
                          handleInput(colIdx, rowIdx - 1, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, colIdx, rowIdx - 1)}
                        disabled={!isActive}
                        inputMode="numeric"
                        className={cn(
                          "my-0.5 h-8 w-10 rounded border text-center text-sm font-bold tabular-nums focus:ring-2 focus:ring-primary focus:outline-none",
                          isActive
                            ? "border-primary/40 bg-background"
                            : "border-transparent bg-muted/40 text-muted-foreground"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "flex h-7 w-10 items-center justify-center font-mono text-sm font-bold",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {num}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {activeColumn >= COLUMNS - 1 && columnTime <= 10 && (
        <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-red-600">
          <AlertTriangle className="size-4" />
          Kolom terakhir akan segera berakhir!
        </div>
      )}
    </div>
  );
}

function saveKraepelinResult(result: KraepelinResult) {
  if (typeof window === "undefined") return;
  try {
    const key = "psikotes:kraepelin-results";
    const raw = window.localStorage.getItem(key);
    const list = raw ? (JSON.parse(raw) as (KraepelinResult & { completedAt: number })[]) : [];
    list.push({ ...result, completedAt: Date.now() });
    window.localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
  } catch {
    // noop
  }
}