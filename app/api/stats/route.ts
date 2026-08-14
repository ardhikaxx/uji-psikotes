import { NextResponse } from "next/server";
import { getActiveFields } from "@/lib/server/fields";
import { countTotalQuestions } from "@/lib/server/questions";

export async function GET() {
  const fields = getActiveFields();
  const positionCount = fields.reduce((sum, f) => sum + f.positions.length, 0);

  return NextResponse.json({
    fieldCount: fields.length,
    positionCount,
    totalQuestions: countTotalQuestions(),
    participants: 15240,
  });
}