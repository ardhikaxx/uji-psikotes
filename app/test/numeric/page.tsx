import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Numerik",
};

export default function NumericPage() {
  return <ExamScreen category="numeric" />;
}