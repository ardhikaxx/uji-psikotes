import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Abstrak",
};

export default function AbstractPage() {
  return <ExamScreen category="abstract" />;
}