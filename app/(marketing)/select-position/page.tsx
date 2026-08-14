"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Clock,
  FileQuestion,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FieldIcon } from "@/components/field-icons";
import { useFields, type FieldApi } from "@/hooks/useFields";
import { formatDuration } from "@/lib/utils";

function difficultyLabel(difficulty: string): { text: string; color: string } {
  switch (difficulty) {
    case "easy":
      return { text: "Dasar", color: "bg-emerald-500/10 text-emerald-600" };
    case "medium":
      return { text: "Menengah", color: "bg-sky-500/10 text-sky-600" };
    case "professional":
      return { text: "Profesional", color: "bg-primary/10 text-primary" };
    default:
      return { text: "Ahli", color: "bg-purple-500/10 text-purple-600" };
  }
}

function PositionGrid({ field }: { field: FieldApi }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {field.positions.map((position) => {
        const diff = difficultyLabel(position.difficulty);
        return (
          <Card
            key={position.id}
            className="group flex flex-col transition-all hover:border-primary/50 hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col gap-4 p-5">
              <div className="flex items-start justify-between">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                  <FieldIcon name={position.icon} className="size-6" />
                </div>
                <Badge className={diff.color}>{diff.text}</Badge>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{position.name}</h2>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                  {position.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                  <FileQuestion className="size-3.5" />
                  ~45 soal
                </span>
                <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                  <Clock className="size-3.5" />
                  {formatDuration(position.duration)}
                </span>
                <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                  <ShieldCheck className="size-3.5" />
                  Skor maks 100
                </span>
              </div>

              <div className="mt-auto pt-2">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Bobot tes yang disimulasikan:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Tes Verbal",
                    "Tes Numerik",
                    "Tes Logika",
                    "Tes Kepribadian",
                    "Tes Situasional (SJT)",
                  ].map((c) => (
                    <Badge key={c} variant="secondary">
                      {c.replace("Tes ", "").replace(" (SJT)", "")}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button asChild className="mt-2 w-full">
                <Link href={`/test/${field.id}/${position.id}`}>
                  Mulai Tes Ini
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function SelectPositionContent() {
  const searchParams = useSearchParams();
  const fieldId = searchParams.get("field") ?? "";
  const { data: fields, isLoading } = useFields();

  const field = (fields ?? []).find((f) => f.id === fieldId);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <Skeleton className="mb-4 h-10 w-64" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!field) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold">Bidang tidak ditemukan</h1>
        <p className="text-muted-foreground mt-2">
          Silakan pilih bidang pekerjaan kembali.
        </p>
        <Button asChild className="mt-6">
          <Link href="/select-field">
            <ArrowLeft className="size-4" />
            Kembali ke Bidang
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/select-field">
          <ArrowLeft className="size-4" />
          Pilih Bidang Lain
        </Link>
      </Button>

      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="bg-primary/10 text-primary flex size-16 items-center justify-center rounded-2xl">
          <FieldIcon name={field.icon} className="size-8" />
        </div>
        <div>
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <BarChart3 className="size-4" />
            {field.questionBanks} paket simulasi tersedia
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{field.name}</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            {field.description}
          </p>
        </div>
      </div>

      <PositionGrid field={field} />
    </div>
  );
}

export default function SelectPositionPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <Skeleton className="mb-4 h-10 w-64" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      }
    >
      <SelectPositionContent />
    </Suspense>
  );
}