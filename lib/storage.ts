import type { DrawingResult, TestResult, TestSession } from "@/types";

const SESSION_KEY = "psikotes:current-session";
const RESULTS_KEY = "psikotes:results";
const DRAWINGS_KEY = "psikotes:drawings";
const PARTICIPANTS_KEY = "psikotes:participant-count";

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // kuota terpenuhi - abaikan
  }
}

function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // noop
  }
}

export function saveSession(session: TestSession): void {
  safeSet(SESSION_KEY, session);
}

export function loadSession(): TestSession | null {
  return safeGet<TestSession>(SESSION_KEY);
}

export function clearSession(): void {
  safeRemove(SESSION_KEY);
}

export function saveResult(result: TestResult): void {
  const results = loadResults();
  results.push(result);
  results.sort((a, b) => b.completedAt - a.completedAt);
  safeSet(RESULTS_KEY, results.slice(0, 50));
}

export function loadResults(): TestResult[] {
  return safeGet<TestResult[]>(RESULTS_KEY) ?? [];
}

export function loadResult(sessionId: string): TestResult | null {
  return loadResults().find((r) => r.sessionId === sessionId) ?? null;
}

export function clearResults(): void {
  safeRemove(RESULTS_KEY);
}

export function saveDrawings(drawings: DrawingResult[]): void {
  safeSet(DRAWINGS_KEY, drawings);
}

export function loadDrawings(): DrawingResult[] {
  return safeGet<DrawingResult[]>(DRAWINGS_KEY) ?? [];
}

export function clearDrawings(): void {
  safeRemove(DRAWINGS_KEY);
}

export function incrementParticipantCount(): number {
  const current = Number(safeGet<string>(PARTICIPANTS_KEY) ?? "0");
  const next = current + 1;
  safeSet(PARTICIPANTS_KEY, String(next));
  return next;
}

export function getParticipantCount(): number {
  return Number(safeGet<string>(PARTICIPANTS_KEY) ?? "0");
}