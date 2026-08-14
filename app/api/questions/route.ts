import { NextResponse } from "next/server";
import { getQuestionBank } from "@/lib/server/questions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const field = url.searchParams.get("field");
  const position = url.searchParams.get("position");

  if (!field || !position) {
    return NextResponse.json(
      { error: "Parameter field dan position wajib diisi" },
      { status: 400 }
    );
  }

  const bank = getQuestionBank(field, position);
  if (!bank) {
    return NextResponse.json(
      { error: "Bank soal tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(bank);
}