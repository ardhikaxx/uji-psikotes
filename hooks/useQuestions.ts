"use client";

import { useQuery } from "@tanstack/react-query";
import type { QuestionBank } from "@/types";

export function useQuestionBank(fieldId?: string, positionId?: string) {
  return useQuery({
    queryKey: ["question-bank", fieldId, positionId],
    queryFn: async () => {
      const res = await fetch(
        `/api/questions?field=${fieldId}&position=${positionId}`
      );
      if (!res.ok) throw new Error("Bank soal tidak ditemukan");
      return (await res.json()) as QuestionBank;
    },
    enabled: Boolean(fieldId && positionId),
    staleTime: Infinity,
  });
}