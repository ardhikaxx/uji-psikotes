import type {
  AnswerValue,
  CategoryResult,
  PersonalityProfile,
  Question,
  TestMetadata,
  TestResult,
} from "@/types";
import { clamp } from "@/lib/utils";

export type ScoredCategory = CategoryResult;

function isObjective(q: Question): boolean {
  return q.type !== "personality";
}

function scoreQuestion(q: Question, answer: AnswerValue): number {
  if (answer === null) return 0;
  if (q.type === "sjt" && q.sjtScores && q.sjtScores[answer] !== undefined) {
    return q.sjtScores[answer];
  }
  if (q.type === "personality") return 0;
  return answer === q.correctIndex ? 1 : 0;
}

function isCorrect(q: Question, answer: AnswerValue): boolean {
  if (answer === null || !isObjective(q)) return false;
  if (q.type === "sjt" && q.sjtScores) {
    return answer === q.correctIndex;
  }
  return answer === q.correctIndex;
}

function scoreCategories(
  questions: Question[],
  answers: Record<string, AnswerValue>
): Map<string, { total: number; answered: number; scoreSum: number; correct: number }> {
  const map = new Map<
    string,
    { total: number; answered: number; scoreSum: number; correct: number }
  >();
  for (const q of questions) {
    const cur = map.get(q.category) ?? {
      total: 0,
      answered: 0,
      scoreSum: 0,
      correct: 0,
    };
    cur.total += 1;
    const ans = answers[q.id] ?? null;
    if (ans !== null) cur.answered += 1;
    cur.scoreSum += scoreQuestion(q, ans);
    if (isCorrect(q, ans)) cur.correct += 1;
    map.set(q.category, cur);
  }
  return map;
}

function buildPersonalityProfile(
  questions: Question[],
  answers: Record<string, AnswerValue>
): PersonalityProfile | null {
  const dims = new Map<string, { sum: number; count: number }>();
  for (const q of questions) {
    if (q.type !== "personality" || !q.likert) continue;
    const ans = answers[q.id];
    if (ans === null) continue;
    const { dimension, reverse } = q.likert;
    const raw = clamp((ans as number) + 1, 1, 5);
    const value = reverse ? 6 - raw : raw;
    const cur = dims.get(dimension) ?? { sum: 0, count: 0 };
    cur.sum += value;
    cur.count += 1;
    dims.set(dimension, cur);
  }
  if (dims.size === 0) return null;

  const dimensions: Record<string, number> = {};
  const interpretationParts: string[] = [];
  for (const [dim, { sum, count }] of dims) {
    const score = count > 0 ? Math.round((sum / count) * 20) : 0;
    dimensions[dim] = score;
  }

  const profileMap: Record<string, { high: string; low: string }> = {
    Openness: {
      high: "terbuka terhadap ide baru dan mudah beradaptasi dengan perubahan",
      low: "cenderung menyukai rutinitas dan pendekatan yang sudah terbukti",
    },
    Conscientiousness: {
      high: "terorganisir, disiplin, dan dapat diandalkan",
      low: "fleksibel namun kadang kurang memperhatikan detail",
    },
    Extraversion: {
      high: "energik dan nyaman berinteraksi dengan banyak orang",
      low: "cenderung tenang dan lebih suka bekerja secara independen",
    },
    Agreeableness: {
      high: "kooperatif, empatik, dan mudah bekerja sama",
      low: "cenderung tegas dan lebih mengutamakan hasil",
    },
    Neuroticism: {
      high: "peka terhadap tekanan dan perlu mengelola stres dengan baik",
      low: "stabil secara emosi dan tenang dalam tekanan",
    },
  };

  const labels: Record<string, string> = {
    Openness: "Keterbukaan",
    Conscientiousness: "Ketelitian",
    Extraversion: "Ekstroversi",
    Agreeableness: "Keramahan",
    Neuroticism: "Stabilitas Emosi",
  };

  const dominantTraits: string[] = [];
  for (const [dim, score] of Object.entries(dimensions)) {
    const info = profileMap[dim];
    if (score >= 70) {
      dominantTraits.push(info.high);
      interpretationParts.push(`${labels[dim]} Anda ${info.high} (skor ${score}).`);
    } else if (score <= 35) {
      dominantTraits.push(info.low);
      interpretationParts.push(`${labels[dim]} Anda ${info.low} (skor ${score}).`);
    } else {
      interpretationParts.push(
        `${labels[dim]} Anda berada pada tingkat sedang (skor ${score}).`
      );
    }
  }

  return {
    model: "Big Five Personality",
    dimensions,
    dominantTraits,
    interpretation: interpretationParts.join(" "),
  };
}

const idealProfiles: Record<string, Record<string, number>> = {
  "information-technology": {
    Openness: 0.9,
    Conscientiousness: 0.9,
    Extraversion: 0.5,
    Agreeableness: 0.6,
    Neuroticism: 0.3,
  },
  "software-engineering": {
    Openness: 0.9,
    Conscientiousness: 0.85,
    Extraversion: 0.5,
    Agreeableness: 0.6,
    Neuroticism: 0.35,
  },
  "finance-accounting": {
    Openness: 0.5,
    Conscientiousness: 1.0,
    Extraversion: 0.45,
    Agreeableness: 0.6,
    Neuroticism: 0.3,
  },
  "human-resource": {
    Openness: 0.7,
    Conscientiousness: 0.85,
    Extraversion: 0.85,
    Agreeableness: 0.9,
    Neuroticism: 0.3,
  },
  "marketing-digital": {
    Openness: 0.9,
    Conscientiousness: 0.75,
    Extraversion: 0.85,
    Agreeableness: 0.7,
    Neuroticism: 0.4,
  },
  "customer-service-sales": {
    Openness: 0.6,
    Conscientiousness: 0.75,
    Extraversion: 0.9,
    Agreeableness: 0.9,
    Neuroticism: 0.3,
  },
  "administration": {
    Openness: 0.4,
    Conscientiousness: 1.0,
    Extraversion: 0.5,
    Agreeableness: 0.75,
    Neuroticism: 0.35,
  },
  "supply-chain-logistics": {
    Openness: 0.55,
    Conscientiousness: 0.95,
    Extraversion: 0.55,
    Agreeableness: 0.7,
    Neuroticism: 0.3,
  },
  manufacturing: {
    Openness: 0.5,
    Conscientiousness: 0.95,
    Extraversion: 0.5,
    Agreeableness: 0.7,
    Neuroticism: 0.3,
  },
  engineering: {
    Openness: 0.75,
    Conscientiousness: 0.9,
    Extraversion: 0.5,
    Agreeableness: 0.6,
    Neuroticism: 0.35,
  },
  healthcare: {
    Openness: 0.6,
    Conscientiousness: 0.95,
    Extraversion: 0.65,
    Agreeableness: 0.9,
    Neuroticism: 0.25,
  },
  education: {
    Openness: 0.85,
    Conscientiousness: 0.85,
    Extraversion: 0.7,
    Agreeableness: 0.85,
    Neuroticism: 0.35,
  },
  "hospitality-tourism": {
    Openness: 0.7,
    Conscientiousness: 0.8,
    Extraversion: 0.9,
    Agreeableness: 0.9,
    Neuroticism: 0.3,
  },
  "retail-ecommerce": {
    Openness: 0.7,
    Conscientiousness: 0.8,
    Extraversion: 0.8,
    Agreeableness: 0.75,
    Neuroticism: 0.35,
  },
  "bumn-government": {
    Openness: 0.55,
    Conscientiousness: 0.95,
    Extraversion: 0.6,
    Agreeableness: 0.8,
    Neuroticism: 0.25,
  },
};

function computeFieldFit(
  fieldId: string,
  profile: PersonalityProfile | null
): number {
  if (!profile) return 50;
  const ideal = idealProfiles[fieldId] ?? idealProfiles["information-technology"];
  const dims = profile.dimensions;
  let total = 0;
  let count = 0;
  for (const [dim, weight] of Object.entries(ideal)) {
    const score = dims[dim] ?? 50;
    total += Math.abs(score - weight * 100) <= 100 ? (100 - Math.abs(score - weight * 100)) * weight : 0;
    count += weight;
  }
  return clamp(Math.round(total / count), 0, 100);
}

function percentileOf(score: number): number {
  return clamp(Math.round(100 / (1 + Math.exp(-(score - 65) / 12))), 1, 99);
}

export function scoreBank(
  metadata: TestMetadata,
  questions: Question[],
  answers: Record<string, AnswerValue>,
  durationUsed: number,
  sessionId: string,
  completedAt: number
): TestResult {
  const catRaw = scoreCategories(questions, answers);
  const categories: ScoredCategory[] = [];
  let totalScoreSum = 0;
  let totalWeight = 0;
  let correct = 0;
  let answered = 0;

  for (const [name, c] of catRaw) {
    const weight =
      metadata.categoryWeights.find((w) => w.name === name)?.weight ?? 0;
    const catScore =
      c.total > 0 ? Math.round((c.scoreSum / c.total) * 100) : 0;
    const acc = c.answered > 0 ? Math.round((c.correct / c.answered) * 100) : 0;
    categories.push({
      category: name,
      total: c.total,
      answered: c.answered,
      correct: c.correct,
      score: catScore,
      accuracy: acc,
    });
    if (name !== "Tes Kepribadian") {
      totalScoreSum += catScore * weight;
      totalWeight += weight;
    }
    correct += c.correct;
    answered += c.answered;
  }

  const totalScore =
    totalWeight > 0 ? Math.round(totalScoreSum / totalWeight) : 0;
  const personality = buildPersonalityProfile(questions, answers);
  const fieldFit = computeFieldFit(metadata.fieldId, personality);
  const readinessScore = clamp(
    Math.round(totalScore * 0.7 + fieldFit * 0.3),
    0,
    100
  );

  const answerDetails = questions.map((q) => ({
    questionId: q.id,
    question: q,
    userAnswer: answers[q.id] ?? null,
    isCorrect: isCorrect(q, answers[q.id] ?? null),
  }));

  return {
    sessionId,
    fieldId: metadata.fieldId,
    positionId: metadata.positionId,
    fieldName: metadata.fieldName,
    positionName: metadata.positionName,
    completedAt,
    durationUsed,
    totalQuestions: questions.length,
    answered,
    correct,
    wrong: answered - correct,
    unanswered: questions.length - answered,
    totalScore,
    readinessScore,
    accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    rankingPercentile: percentileOf(totalScore),
    categories,
    personality,
    answerDetails,
  };
}

export function buildInterpretation(result: TestResult): string[] {
  const tips: string[] = [];
  const logicScore =
    result.categories.find((c) => c.category === "Tes Logika")?.score ?? 0;
  const numScore =
    result.categories.find((c) => c.category === "Tes Numerik")?.score ?? 0;
  const verbalScore =
    result.categories.find((c) => c.category === "Tes Verbal")?.score ?? 0;
  const accScore =
    result.categories.find((c) => c.category === "Tes Ketelitian")?.score ?? 0;

  if (logicScore >= 75 && result.accuracy >= 75) {
    tips.push(
      "Kemampuan logika Anda sangat baik. Pertahankan ketelitian dan manfaatkan kekuatan ini untuk menangani masalah kompleks di pekerjaan."
    );
  } else if (logicScore < 55) {
    tips.push(
      "Skor logika Anda masih bisa ditingkatkan. Latih soal silogisme, deret angka, dan pola secara rutin untuk memperkuat penalaran."
    );
  }

  if (numScore >= 75 && verbalScore < 55) {
    tips.push(
      "Numerik Anda kuat namun verbal perlu diasah. Perbanyak membaca dan latihan sinonim-antonim untuk menyeimbangkan kemampuan."
    );
  }

  if (verbalScore >= 75 && numScore < 55) {
    tips.push(
      "Verbal Anda unggul. Tingkatkan kemampuan numerik dengan latihan persentase, perbandingan, dan interpretasi data."
    );
  }

  if (accScore < 60) {
    tips.push(
      "Ketelitian perlu ditingkatkan. Biasakan memeriksa ulang hasil kerja dan melatih konsentrasi pada detail."
    );
  }

  const personality = result.personality;
  if (personality) {
    const consc = personality.dimensions["Conscientiousness"] ?? 50;
    const extra = personality.dimensions["Extraversion"] ?? 50;
    if (consc < 45) {
      tips.push(
        "Tingkat ketelitian dalam kepribadian Anda relatif rendah. Terapkan manajemen waktu, daftar tugas, dan target harian untuk menjadi lebih terorganisir."
      );
    }
    if (extra < 45 && result.fieldName.includes("Layanan") === false) {
      tips.push(
        "Anda cenderung introvert. Manfaatkan kekuatan bekerja mandiri dan latih komunikasi secara bertahap untuk lingkungan kolaboratif."
      );
    }
  }

  if (result.readinessScore >= 80) {
    tips.push(
      "Kesiapan kerja Anda sangat baik. Anda siap menghadapi seleksi kerja dengan percaya diri."
    );
  } else if (result.readinessScore >= 60) {
    tips.push(
      "Kesiapan kerja Anda cukup baik. Fokus pada kategori yang masih rendah untuk meningkatkan peluang lolos seleksi."
    );
  } else {
    tips.push(
      "Kesiapan kerja Anda masih perlu ditingkatkan. Kerjakan simulasi secara rutin dan pelajari pembahasan setiap jawaban."
    );
  }

  return tips;
}