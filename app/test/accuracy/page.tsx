import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Ketelitian",
};

export default function AccuracyPage() {
  return <ExamScreen category="accuracy" />;
}