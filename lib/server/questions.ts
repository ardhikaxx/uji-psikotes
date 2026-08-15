import fs from "node:fs";
import path from "node:path";
import type { QuestionBank } from "@/types";

const questionsDir = path.join(process.cwd(), "data", "questions");

export function getQuestionBank(
  fieldId: string,
  positionId: string
): QuestionBank | null {
  const file = path.join(questionsDir, fieldId, `${positionId}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as QuestionBank;
}

export function getCategoryBank(slug: string): QuestionBank | null {
  const file = path.join(questionsDir, "category", `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as QuestionBank;
}

export interface BankIndexEntry {
  fieldId: string;
  positionId: string;
  totalQuestions: number;
  duration: number;
  difficulty: string;
}

export function listBanks(): BankIndexEntry[] {
  if (!fs.existsSync(questionsDir)) return [];
  const entries: BankIndexEntry[] = [];
  for (const fieldDir of fs.readdirSync(questionsDir, { withFileTypes: true })) {
    if (!fieldDir.isDirectory()) continue;
    const dir = path.join(questionsDir, fieldDir.name);
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".json")) continue;
      const bank = getQuestionBank(fieldDir.name, file.replace(".json", ""));
      if (bank) {
        entries.push({
          fieldId: fieldDir.name,
          positionId: bank.metadata.positionId,
          totalQuestions: bank.metadata.totalQuestions,
          duration: bank.metadata.duration,
          difficulty: bank.metadata.difficulty,
        });
      }
    }
  }
  return entries;
}

export function countTotalQuestions(): number {
  return listBanks().reduce((sum, b) => sum + b.totalQuestions, 0);
}