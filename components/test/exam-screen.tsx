"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AlignLeft,
  AlertTriangle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  LayoutGrid,
  Maximize,
  X,
} from "lucide-react";
import type { QuestionBank } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuestionRenderer } from "@/components/test/question-renderer";
import { QuestionPalette } from "@/components/test/question-palette";
import { useQuestionBank } from "@/hooks/useQuestions";
import { useTestStore } from "@/store/test-store";
import { useCountdown } from "@/hooks/useCountdown";
import { scoreBank } from "@/lib/scoring";
import { cn, formatDurationShort } from "@/lib/utils";
import { incrementParticipantCount, saveResult, clearSession } from "@/lib/storage";

function IntroScreen({
  bank,
  canResume,
  onStart,
}: {
  bank: QuestionBank;
  canResume: boolean;
  onStart: () => void;
}) {
  const catCounts = bank.metadata.categoryWeights.filter((w) => w.weight > 0);
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
            <BookOpen className="size-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              {bank.metadata.positionName}
            </h1>
            <p className="text-muted-foreground text-sm">
              {bank.metadata.fieldName} · {bank.metadata.difficulty}
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xl font-bold">{bank.metadata.totalQuestions}</div>
            <div className="text-muted-foreground text-xs">Total Soal</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xl font-bold">
              {formatDurationShort(bank.metadata.duration)}
            </div>
            <div className="text-muted-foreground text-xs">Durasi</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-xl font-bold">{bank.metadata.maxScore}</div>
            <div className="text-muted-foreground text-xs">Skor Maks</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold">
            Komposisi tes untuk posisi ini:
          </h3>
          <div className="flex flex-wrap gap-2">
            {catCounts.map((c) => (
              <Badge key={c.name} variant="secondary">
                {c.name.replace("Tes ", "").replace(" (SJT)", "")} · {c.weight}%
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <div className="mb-1 flex items-center gap-2 font-semibold">
            <AlertTriangle className="size-4" /> Petunjuk Pengerjaan
          </div>
          <ul className="list-disc space-y-1 pl-5">
            <li>Kerjakan tes dalam mode layar penuh tanpa distraksi.</li>
            <li>Jawaban tersimpan otomatis, kamu dapat melanjutkan kembali jika browser tertutup.</li>
            <li>Jangan tutup tab sebelum menekan tombol Selesai.</li>
            <li>Soal dapat ditandai untuk ditinjau kembali sebelum dikumpulkan.</li>
          </ul>
        </div>

        <Button size="lg" className="w-full" onClick={onStart}>
          {canResume ? "Lanjutkan Tes" : "Mulai Tes Sekarang"}
        </Button>
      </div>
    </div>
  );
}

export function ExamScreen({
  fieldId,
  positionId,
}: {
  fieldId: string;
  positionId: string;
}) {
  const router = useRouter();
  const { data: bank, isLoading, error } = useQuestionBank(fieldId, positionId);
  const { session, startTest, resumeTest, setAnswer, toggleMark, setCurrentIndex, saveRemaining, complete, clear } =
    useTestStore();

  const [phase, setPhase] = React.useState<"intro" | "exam" | "submitting">("intro");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showPalette, setShowPalette] = React.useState(false);
  const [participantCounted, setParticipantCounted] = React.useState(false);

  const canResume = Boolean(
    bank &&
      session &&
      session.bankId === bank.metadata.id &&
      session.status === "in-progress"
  );

  const remaining = useCountdown(
    session?.remainingSeconds ?? 0,
    phase === "exam",
    () => handleSubmit(true)
  );

  const remainingRef = React.useRef(remaining);
  remainingRef.current = remaining;

  // Autosave timer setiap 10 detik
  React.useEffect(() => {
    if (phase !== "exam") return;
    const id = window.setInterval(() => {
      saveRemaining(remainingRef.current);
    }, 10000);
    return () => window.clearInterval(id);
  }, [phase, saveRemaining]);

  // Blokir keluar dari tab
  React.useEffect(() => {
    if (phase !== "exam") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  function handleStart() {
    if (!bank) return;
    if (canResume) {
      resumeTest(bank);
    } else {
      startTest(bank);
    }
    if (!participantCounted) {
      incrementParticipantCount();
      setParticipantCounted(true);
    }
    setPhase("exam");
  }

  function handleSubmit(auto = false) {
    if (!bank || !session) return;
    if (!auto) {
      setConfirmOpen(true);
      return;
    }
    doSubmit(remainingRef.current);
  }

  function doSubmit(finalRemaining: number) {
    if (!bank || !session) return;
    setPhase("submitting");
    const durationUsed = bank.metadata.duration - finalRemaining;
    const result = scoreBank(
      bank.metadata,
      bank.questions,
      session.answers,
      durationUsed,
      session.sessionId,
      Date.now()
    );
    saveResult(result);
    complete();
    clearSession();
    clear();
    router.push(`/results/${result.sessionId}`);
  }

  if (isLoading || !bank) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold">Bank soal tidak ditemukan</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Periksa kembali pemilihan bidang dan posisi.
        </p>
      </div>
    );
  }

  if (phase === "intro") {
    return <IntroScreen bank={bank} canResume={canResume} onStart={handleStart} />;
  }

  if (phase === "submitting" || !session) {
    return (
      <div className="flex items-center justify-center py-24">
        <Skeleton className="h-40 w-80 rounded-2xl" />
      </div>
    );
  }

const s = session;
  const questions = bank.questions;
  const currentIndex = Math.min(s.currentIndex, questions.length - 1);
  const currentQuestion = questions[currentIndex];
  const answered = Object.values(s.answers).filter((a) => a !== undefined).length;
  const unansweredCount = questions.length - answered;
  const allAnswered = answered === questions.length;
  const progress = Math.round((answered / questions.length) * 100);
  const timeLow = remaining <= 300;
  const timeWarn = remaining <= 600 && !timeLow;

  function selectOption(value: number) {
    const current = s.answers[currentQuestion.id];
    if (current === value) {
      setAnswer(currentQuestion.id, null);
    } else {
      setAnswer(currentQuestion.id, value);
    }
  }

  function goTo(index: number) {
    setCurrentIndex(Math.min(questions.length - 1, Math.max(0, index)));
  }

  function requestFullscreen() {
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } catch {
      // noop
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card/70 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-semibold">
                {bank.metadata.positionName}
              </span>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {currentQuestion.category}
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              Soal {currentIndex + 1} dari {questions.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-lg font-bold tabular-nums",
                timeLow
                  ? "bg-red-100 text-red-600 dark:bg-red-500/20"
                  : timeWarn
                    ? "bg-amber-100 text-amber-600 dark:bg-amber-500/20"
                    : "bg-muted text-foreground"
              )}
            >
              <Clock className="size-5" />
              {formatDurationShort(remaining)}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={requestFullscreen}
            >
              <Maximize className="size-4" />
              Layar Penuh
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden"
              onClick={() => setShowPalette((v) => !v)}
            >
              {showPalette ? (
                <X className="size-4" />
              ) : (
                <LayoutGrid className="size-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="px-4 pb-3 sm:px-6">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Progress pengerjaan</span>
            <span>
              {answered}/{questions.length}
            </span>
          </div>
          <Progress value={progress} />
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <div className="rounded-2xl border bg-card p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge>{currentQuestion.category}</Badge>
              <Badge variant="outline">
                {currentQuestion.subtype}
              </Badge>
              {s.markedForReview.includes(currentQuestion.id) && (
                <Badge className="bg-amber-500/15 text-amber-600">
                  <Flag className="size-3" /> Ditandai
                </Badge>
              )}
            </div>

            <QuestionRenderer
              question={currentQuestion}
              answer={s.answers[currentQuestion.id] ?? null}
              onSelect={selectOption}
            />
          </div>

          {/* Navigation */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => goTo(currentIndex - 1)}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="size-4" />
                Sebelumnya
              </Button>
              <Button
                variant="outline"
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex === questions.length - 1}
              >
                Berikutnya
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex gap-2">
                <Button
                  variant={s.markedForReview.includes(currentQuestion.id) ? "secondary" : "outline"}
                  onClick={() => toggleMark(currentQuestion.id)}
                >
                  <Flag className="size-4" />
                  {s.markedForReview.includes(currentQuestion.id)
                    ? "Hapus Tanda"
                    : "Tandai untuk Ditinjau"}
                </Button>
                <Button
                  variant={allAnswered ? "destructive" : "secondary"}
                  onClick={() => handleSubmit(false)}
                  disabled={!allAnswered}
                  title={
                    allAnswered
                      ? "Kumpulkan semua jawaban"
                      : `${unansweredCount} soal belum dijawab`
                  }
                >
                  Selesai
                </Button>
              </div>
              {!allAnswered && (
                <p className="text-muted-foreground text-xs">
                  Selesaikan dulu {unansweredCount} soal yang belum dijawab
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Palette sidebar */}
        <aside
          className={cn(
            "rounded-2xl border bg-card p-4 lg:sticky lg:top-4 lg:h-fit",
            showPalette ? "block" : "hidden lg:block"
          )}
        >
          <QuestionPalette
            session={s}
            questions={questions}
            currentIndex={currentIndex}
            onNavigate={(i) => {
              goTo(i);
              setShowPalette(false);
            }}
          />
        </aside>
      </div>

      {/* Submit confirm */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500 size-5" />
              Kumpulkan Jawaban?
            </DialogTitle>
<DialogDescription>
              Kamu telah menjawab{" "}
              <strong>
                {answered} dari {questions.length}
              </strong>{" "}
              soal. Setelah dikumpulkan, kamu tidak dapat mengubah jawaban
              lagi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              <AlignLeft className="size-4" />
              Lanjut Mengerjakan
            </Button>
            <Button variant="destructive" onClick={() => doSubmit(remainingRef.current)}>
              Ya, Kumpulkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
