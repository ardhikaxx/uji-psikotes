import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Situasional (SJT)",
};

export default function SjtPage() {
  return <ExamScreen category="sjt" />;
}