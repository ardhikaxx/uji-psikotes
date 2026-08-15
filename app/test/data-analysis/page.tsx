import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Analisis Data",
};

export default function DataAnalysisPage() {
  return <ExamScreen category="data-analysis" />;
}