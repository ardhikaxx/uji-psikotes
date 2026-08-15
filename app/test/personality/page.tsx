import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Kepribadian",
};

export default function PersonalityPage() {
  return <ExamScreen category="personality" />;
}