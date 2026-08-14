import fs from "node:fs";
import path from "node:path";
import type { FieldInfo, PositionInfo } from "@/types";

const fieldsPath = path.join(process.cwd(), "data", "fields", "index.json");

export function getFields(): FieldInfo[] {
  const raw = fs.readFileSync(fieldsPath, "utf8");
  return JSON.parse(raw).fields as FieldInfo[];
}

export function getActiveFields(): FieldInfo[] {
  return getFields().filter((f) => f.status === "active");
}

export function getFieldById(id: string): FieldInfo | null {
  return getFields().find((f) => f.id === id) ?? null;
}

export function getPosition(
  fieldId: string,
  positionId: string
): PositionInfo | null {
  const field = getFieldById(fieldId);
  if (!field) return null;
  return field.positions.find((p) => p.id === positionId) ?? null;
}

export function countPositions(field: FieldInfo): number {
  return field.positions.length;
}