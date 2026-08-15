import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Visual",
};

export default function VisualPage() {
  return <ExamScreen category="visual" />;
}