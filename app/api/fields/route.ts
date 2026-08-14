import { NextResponse } from "next/server";
import { getFields } from "@/lib/server/fields";
import { listBanks } from "@/lib/server/questions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const onlyActive = url.searchParams.get("active") === "true";

  const banks = listBanks();
  const countMap = new Map<string, number>();
  for (const b of banks) {
    countMap.set(b.fieldId, (countMap.get(b.fieldId) ?? 0) + 1);
  }

  const fields = getFields()
    .filter((f) => (onlyActive ? f.status === "active" : true))
    .map((f) => ({
      id: f.id,
      name: f.name,
      description: f.description,
      icon: f.icon,
      status: f.status,
      questionBanks: countMap.get(f.id) ?? 0,
      positions: f.positions.map((p) => ({
        id: p.id,
        name: p.name,
        icon: p.icon,
        description: p.description,
        difficulty: p.difficulty,
        duration: p.duration,
      })),
    }));

  return NextResponse.json({ fields });
}