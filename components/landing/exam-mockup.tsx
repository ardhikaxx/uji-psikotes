import { Check, Clock, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockOptions = [
  { label: "A", text: "17", selected: true },
  { label: "B", text: "20", selected: false },
  { label: "C", text: "23", selected: false },
  { label: "D", text: "26", selected: false },
];

export function ExamMockup() {
  return (
    <div className="relative w-full max-w-md">
      <div className="overflow-hidden rounded-xl border bg-card shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Tes Numerik</Badge>
            <span className="text-muted-foreground text-xs">Soal 3 dari 15</span>
          </div>
          <span className="bg-muted flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-sm font-semibold tabular-nums">
            <Clock className="size-3.5" />
            12:34
          </span>
        </div>

        {/* Progress */}
        <div className="px-5 pt-4">
          <Progress value={20} />
          <div className="text-muted-foreground mt-1.5 text-xs">
            3 dari 15 soal dijawab
          </div>
        </div>

        {/* Question */}
        <div className="px-5 py-5">
          <p className="text-base font-medium leading-relaxed">
            Jika x + 7 = 15, berapakah nilai dari 3x − 4?
          </p>
          <div className="mt-4 space-y-2">
            {mockOptions.map((opt) => (
              <div
                key={opt.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3.5 py-2.5",
                  opt.selected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border"
                )}
              >
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-xs font-bold",
                    opt.selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "text-muted-foreground border-muted-foreground/40"
                  )}
                >
                  {opt.label}
                </span>
                <span className="text-sm font-medium">{opt.text}</span>
                {opt.selected && (
                  <Check className="text-primary ml-auto size-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex items-center justify-between border-t px-5 py-3">
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Save className="size-3.5" />
            Tersimpan otomatis
          </span>
          <Button size="sm" variant="outline">
            Selesai
          </Button>
        </div>
      </div>

      {/* Floating score chip */}
      <div className="absolute -bottom-5 -left-3 rounded-lg border bg-background px-4 py-3 shadow-sm sm:-left-6">
        <div className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide">
          Skor prediksi
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold tabular-nums">87</span>
          <span className="text-muted-foreground text-xs">/ 100</span>
        </div>
      </div>
    </div>
  );
}