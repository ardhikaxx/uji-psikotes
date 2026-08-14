export type QuestionType =
  | "verbal"
  | "numeric"
  | "logical"
  | "personality"
  | "sjt"
  | "accuracy"
  | "data-analysis"
  | "visual"
  | "abstract";

export type Difficulty = "easy" | "medium" | "professional" | "expert";

export type LikertScale = 1 | 2 | 3 | 4 | 5;

export interface ShapeSpec {
  type:
    | "rect"
    | "circle"
    | "triangle"
    | "line"
    | "text"
    | "polygon"
    | "star"
    | "ring"
    | "diamond"
    | "semicircle";
  x: number;
  y: number;
  size?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  rotation?: number;
  points?: number[];
  text?: string;
  pointsCount?: number;
  innerRadius?: number;
  fontSize?: number;
}

export interface PatternConfig {
  width: number;
  height: number;
  shapes: ShapeSpec[];
  questionMark?: boolean;
}

export interface DataChartConfig {
  type: "bar" | "pie" | "line" | "table";
  title: string;
  labels: string[];
  datasets: { label: string; values: number[]; color?: string }[];
}

export interface LikertConfig {
  dimension: string;
  reverse?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  subtype: string;
  category: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  steps?: string[];
  formula?: string;
  useLikert?: boolean;
  likert?: LikertConfig;
  chart?: DataChartConfig;
  pattern?: PatternConfig;
  patternOptions?: PatternConfig[];
  sjtScores?: number[];
  weight?: number;
  image?: string;
}

export interface CategoryWeight {
  name: string;
  weight: number;
}

export interface TestMetadata {
  id: string;
  fieldId: string;
  positionId: string;
  fieldName: string;
  positionName: string;
  title: string;
  description: string;
  duration: number;
  difficulty: Difficulty;
  maxScore: number;
  totalQuestions: number;
  categoryWeights: CategoryWeight[];
}

export interface QuestionBank {
  metadata: TestMetadata;
  questions: Question[];
}

export interface PositionInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  categoryWeights: CategoryWeight[];
  duration: number;
  difficulty: Difficulty;
}

export interface FieldInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "active" | "coming-soon";
  positions: PositionInfo[];
}

export type AnswerValue = number | null;

export interface TestSession {
  sessionId: string;
  bankId: string;
  fieldId: string;
  positionId: string;
  fieldName: string;
  positionName: string;
  answers: Record<string, AnswerValue>;
  markedForReview: string[];
  currentIndex: number;
  startedAt: number;
  remainingSeconds: number;
  totalDuration: number;
  status: "in-progress" | "completed";
}

export interface CategoryResult {
  category: string;
  total: number;
  answered: number;
  correct: number;
  score: number;
  accuracy: number;
}

export interface AnswerDetail {
  questionId: string;
  question: Question;
  userAnswer: AnswerValue;
  isCorrect: boolean;
}

export interface PersonalityProfile {
  model: string;
  dimensions: Record<string, number>;
  dominantTraits: string[];
  interpretation: string;
}

export interface KraepelinColumn {
  column: number;
  numbers: number[];
  answers: number[];
  correctCount: number;
  wrongCount: number;
}

export interface KraepelinResult {
  columns: number;
  totalOperations: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number;
  speedPerMinute: number;
  consistency: number;
  productivity: number;
  stability: number;
  perColumn: { column: number; correct: number; wrong: number; total: number }[];
}

export interface DrawingResult {
  id: string;
  title: string;
  image: string;
  createdAt: number;
}

export interface TestResult {
  sessionId: string;
  fieldId: string;
  positionId: string;
  fieldName: string;
  positionName: string;
  completedAt: number;
  durationUsed: number;
  totalQuestions: number;
  answered: number;
  correct: number;
  wrong: number;
  unanswered: number;
  totalScore: number;
  readinessScore: number;
  accuracy: number;
  rankingPercentile: number;
  categories: CategoryResult[];
  personality: PersonalityProfile | null;
  answerDetails: AnswerDetail[];
}

export interface StatsSummary {
  fieldCount: number;
  positionCount: number;
  totalQuestions: number;
  participants: number;
}