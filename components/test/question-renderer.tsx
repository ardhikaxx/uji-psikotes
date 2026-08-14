"use client";

import * as React from "react";
import { Check } from "lucide-react";
import type { AnswerValue, Question } from "@/types";
import { cn } from "@/lib/utils";
import { PatternCanvas } from "@/components/test/pattern-canvas";
import { DataChart } from "@/components/test/data-chart";
import { MathFormula } from "@/components/test/math-formula";

const LETTERS = ["A", "B", "C", "D", "E"];

const LIKERT_LABELS = [
  { label: "STS", text: "Sangat Tidak Setuju" },
  { label: "TS", text: "Tidak Setuju" },
  { label: "N", text: "Netral" },
  { label: "S", text: "Setuju" },
  { label: "SS", text: "Sangat Setuju" },
];

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all",
        selected
          ? "border-primary bg-primary/10 ring-2 ring-primary/30"
          : "hover:border-primary/40 hover:bg-accent/50"
      )}
    >
      {children}
    </button>
  );
}

export function QuestionRenderer({
  question,
  answer,
  onSelect,
}: {
  question: Question;
  answer: AnswerValue;
  onSelect: (value: number) => void;
}) {
  const isPattern = question.type === "visual" || question.type === "abstract";

  return (
    <div className="flex flex-col gap-6">
      {/* Chart for data analysis */}
      {question.type === "data-analysis" && question.chart && (
        <div className="mx-auto w-full max-w-xl rounded-xl border bg-background p-4">
          <DataChart chart={question.chart} />
        </div>
      )}

      {/* Pattern for visual / abstract */}
      {isPattern && question.pattern && (
        <div className="mx-auto">
          <PatternCanvas pattern={question.pattern} />
        </div>
      )}

      <div className="text-base leading-relaxed sm:text-lg">
        {question.text.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < question.text.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>

      {question.formula && (
        <div className="mx-auto rounded-lg border bg-muted/40 px-6 py-4 text-xl">
          <MathFormula formula={question.formula} />
        </div>
      )}

      {/* Likert for personality */}
      {question.useLikert ? (
        <div className="grid gap-2">
          {LIKERT_LABELS.map((item, i) => (
            <OptionButton
              key={i}
              selected={answer === i}
              onClick={() => onSelect(i)}
            >
              <span
                className={cn(
                  "text-primary flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
                  answer === i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40"
                )}
              >
                {item.label}
              </span>
              <span className="flex-1 text-sm sm:text-base">{item.text}</span>
            </OptionButton>
          ))}
        </div>
      ) : isPattern && question.patternOptions ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {question.patternOptions.map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                "relative rounded-xl border-2 p-2 transition-all",
                answer === i
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                  : "hover:border-primary/40"
              )}
            >
              <span className="text-muted-foreground mb-1 flex items-center justify-between text-sm font-bold">
                {LETTERS[i]}
                {answer === i && (
                  <Check className="text-primary size-4" />
                )}
              </span>
              <PatternCanvas pattern={opt} className="mx-auto" />
            </button>
          ))}
        </div>
      ) : (
        <div className="grid gap-2.5">
          {question.options.map((opt, i) => (
            <OptionButton
              key={i}
              selected={answer === i}
              onClick={() => onSelect(i)}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                  answer === i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "text-muted-foreground group-hover:border-primary/50"
                )}
              >
                {LETTERS[i]}
              </span>
              <span className="flex-1 text-sm sm:text-base">{opt}</span>
              {answer === i && (
                <Check className="text-primary size-5 shrink-0" />
              )}
            </OptionButton>
          ))}
        </div>
      )}
    </div>
  );
}