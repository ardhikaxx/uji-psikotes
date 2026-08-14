"use client";

import { useQuery } from "@tanstack/react-query";

export interface FieldApi {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: string;
  questionBanks: number;
  positions: {
    id: string;
    name: string;
    icon: string;
    description: string;
    difficulty: string;
    duration: number;
  }[];
}

export function useFields(activeOnly = false) {
  return useQuery({
    queryKey: ["fields", activeOnly],
    queryFn: async () => {
      const res = await fetch(`/api/fields${activeOnly ? "?active=true" : ""}`);
      if (!res.ok) throw new Error("Gagal memuat bidang");
      const data = (await res.json()) as { fields: FieldApi[] };
      return data.fields;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Gagal memuat statistik");
      return (await res.json()) as {
        fieldCount: number;
        positionCount: number;
        totalQuestions: number;
        participants: number;
      };
    },
    staleTime: 10 * 60 * 1000,
  });
}