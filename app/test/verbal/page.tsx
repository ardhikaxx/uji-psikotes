import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Verbal",
};

export default function VerbalPage() {
  return <ExamScreen category="verbal" />;
}