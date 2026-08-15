"use client";

import { useQuery } from "@tanstack/react-query";
import type { QuestionBank } from "@/types";

export function useQuestionBank(
  fieldId?: string,
  positionId?: string,
  category?: string
) {
  const url = category
    ? `/api/questions?type=category&category=${category}`
    : `/api/questions?field=${fieldId}&position=${positionId}`;
  return useQuery({
    queryKey: ["question-bank", fieldId, positionId, category],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Bank soal tidak ditemukan");
      return (await res.json()) as QuestionBank;
    },
    enabled: Boolean(category || (fieldId && positionId)),
    staleTime: Infinity,
  });
}