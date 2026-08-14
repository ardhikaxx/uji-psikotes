import type { Metadata } from "next";
import { ExamScreen } from "@/components/test/exam-screen";

export const metadata: Metadata = {
  title: "Simulasi Psikotes",
};

export default async function TestPage({
  params,
}: {
  params: Promise<{ field: string; position: string }>;
}) {
  const { field, position } = await params;
  return <ExamScreen fieldId={field} positionId={position} />;
}