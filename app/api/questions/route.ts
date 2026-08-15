import { NextResponse } from "next/server";
import { getCategoryBank, getQuestionBank } from "@/lib/server/questions";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const field = url.searchParams.get("field");
  const position = url.searchParams.get("position");
  const category = url.searchParams.get("category");

  if (type === "category") {
    if (!category) {
      return NextResponse.json(
        { error: "Parameter category wajib diisi" },
        { status: 400 }
      );
    }
    const bank = getCategoryBank(category);
    if (!bank) {
      return NextResponse.json(
        { error: "Bank soal kategori tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(bank);
  }

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