import type { Metadata } from "next";
import { ReviewView } from "@/components/results/review-view";

export const metadata: Metadata = {
  title: "Pembahasan Soal",
};

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <ReviewView sessionId={sessionId} />;
}