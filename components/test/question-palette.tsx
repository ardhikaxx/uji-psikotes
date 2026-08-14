"use client";

import * as React from "react";
import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question, TestSession } from "@/types";

export function QuestionPalette({
  session,
  questions,
  currentIndex,
  onNavigate,
}: {
  session: TestSession;
  questions: Question[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}) {
  const count = session.answers
    ? Object.values(session.answers).filter((a) => a !== null).length
    : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Palet Soal</h3>
        <span className="text-muted-foreground text-xs">
          {count}/{questions.length} dijawab
        </span>
      </div>

      <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
        {questions.map((q, i) => {
          const answered = session.answers[q.id] !== undefined;
          const marked = session.markedForReview.includes(q.id);
          const current = i === currentIndex;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onNavigate(i)}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-md text-xs font-semibold transition-all",
                current
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/40"
                  : answered
                    ? "bg-emerald-500/90 text-white hover:opacity-80"
                    : "bg-muted text-muted-foreground hover:bg-accent"
              )}
              title={`Soal ${i + 1}`}
            >
              {i + 1}
              {marked && (
                <Flag className="absolute -top-1 -right-1 size-3.5 rounded-sm bg-amber-400 p-0.5 text-white" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="bg-primary size-3 rounded-sm" /> Saat ini
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-emerald-500 size-3 rounded-sm" /> Dijawab
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-muted size-3 rounded-sm" /> Kosong
        </span>
        <span className="flex items-center gap-1.5">
          <Flag className="size-3.5 text-amber-400" /> Ditandai
        </span>
      </div>
    </div>
  );
}