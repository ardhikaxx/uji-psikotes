import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Tes Logika",
};

export default function LogicalPage() {
  return <ExamScreen category="logical" />;
}