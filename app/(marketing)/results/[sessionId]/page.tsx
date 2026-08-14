import type { Metadata } from "next";
import { ResultsView } from "@/components/results/results-view";

export const metadata: Metadata = {
  title: "Hasil Psikotes",
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <ResultsView sessionId={sessionId} />;
}