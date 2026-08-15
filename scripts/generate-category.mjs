import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { verbalPool } from "./pools/verbal.mjs";
import { numericPool } from "./pools/numeric.mjs";
import { logicalPool } from "./pools/logical.mjs";
import { accuracyPool } from "./pools/accuracy.mjs";
import { dataAnalysisPool } from "./pools/data-analysis.mjs";
import { visualPool } from "./pools/visual.mjs";
import { abstractPool } from "./pools/abstract.mjs";
import { personalityPool } from "./pools/personality.mjs";
import { sjtPools } from "./pools/sjt.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "data", "questions", "category");

function seededRng(seed) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const sjtFlat = Object.values(sjtPools).flat();

const CATEGORIES = [
  {
    slug: "verbal",
    name: "Tes Verbal",
    description:
      "Latihan sinonim, antonim, analogi kata, dan pemahaman bahasa untuk mengasah kemampuan verbal Anda.",
    pool: verbalPool,
    duration: 900,
  },
  {
    slug: "numeric",
    name: "Tes Numerik",
    description:
      "Latihan aritmatika, persentase, perbandingan, dan deret angka untuk mengasah kemampuan numerik Anda.",
    pool: numericPool,
    duration: 900,
  },
  {
    slug: "logical",
    name: "Tes Logika",
    description:
      "Latihan silogisme, penalaran, dan logika formal untuk mengasah kemampuan berpikir kritis Anda.",
    pool: logicalPool,
    duration: 900,
  },
  {
    slug: "personality",
    name: "Tes Kepribadian",
    description:
      "Latihan pernyataan sikap model Big Five untuk memetakan profil kepribadian Anda.",
    pool: personalityPool,
    duration: 600,
  },
  {
    slug: "sjt",
    name: "Tes Situasional (SJT)",
    description:
      "Latihan menghadapi situasi kerja nyata untuk mengukur penilaian Anda dalam mengambil keputusan.",
    pool: sjtFlat,
    duration: 900,
  },
  {
    slug: "accuracy",
    name: "Tes Ketelitian",
    description:
      "Latihan pencocokan data dan pengecekan detail untuk mengukur ketelitian Anda.",
    pool: accuracyPool,
    duration: 900,
  },
  {
    slug: "data-analysis",
    name: "Tes Analisis Data",
    description:
      "Latihan membaca grafik, tabel, dan diagram untuk menarik kesimpulan dari data.",
    pool: dataAnalysisPool,
    duration: 900,
  },
  {
    slug: "visual",
    name: "Tes Visual",
    description:
      "Latihan pola gambar dan hubungan antar bentuk untuk mengasah kemampuan visual-spasial Anda.",
    pool: visualPool,
    duration: 900,
  },
  {
    slug: "abstract",
    name: "Tes Abstrak",
    description:
      "Latihan pola abstrak dan penalaran non-verbal untuk mengukur kemampuan abstraksi Anda.",
    pool: abstractPool,
    duration: 900,
  },
];

const TARGET = 15;

let generated = 0;
fs.mkdirSync(outDir, { recursive: true });

for (const cat of CATEGORIES) {
  const rng = seededRng(cat.slug.split("").reduce((s, c) => s + c.charCodeAt(0), 0));
  const picked = shuffle(cat.pool, rng).slice(0, TARGET);

  const questions = picked.map((q, i) => ({
    ...q,
    id: `cat-${cat.slug}-${String(i).padStart(3, "0")}`,
    category: cat.name,
  }));

  const metadata = {
    id: `cat-${cat.slug}`,
    fieldId: "standalone",
    positionId: cat.slug,
    fieldName: "Latihan Kategori",
    positionName: cat.name,
    title: `${cat.name} - Latihan Psikotes`,
    description: cat.description,
    duration: cat.duration,
    difficulty: "medium",
    maxScore: 100,
    totalQuestions: questions.length,
    categoryWeights: [{ name: cat.name, weight: 100 }],
  };

  const file = path.join(outDir, `${cat.slug}.json`);
  fs.writeFileSync(file, JSON.stringify({ metadata, questions }, null, 2), "utf8");
  generated++;
  console.log(`[OK] category/${cat.slug}.json - ${questions.length} soal`);
}

console.log(`\nSelesai. ${generated} bank soal kategori dibuat.`);