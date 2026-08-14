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
const root = path.resolve(__dirname, "..");
const fieldsIndex = JSON.parse(fs.readFileSync(path.join(root, "data", "fields", "index.json"), "utf8"));
const outDir = path.join(root, "data", "questions");

const poolByCategory = {
  "Tes Verbal": verbalPool,
  "Tes Numerik": numericPool,
  "Tes Logika": logicalPool,
  "Tes Ketelitian": accuracyPool,
  "Tes Analisis Data": dataAnalysisPool,
  "Tes Visual": visualPool,
  "Tes Abstrak": abstractPool,
  "Tes Kepribadian": personalityPool,
};

function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleSeeded(arr, rng) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const targetTotalByDifficulty = { easy: 36, medium: 42, professional: 48, expert: 54 };

let generated = 0;
let skipped = 0;

for (const field of fieldsIndex.fields) {
  if (field.status !== "active" || !field.positions.length) {
    skipped++;
    continue;
  }
  const sjtPool = sjtPools[field.id] || [];

  for (const position of field.positions) {
    const rng = mulberry32(hashSeed(`${field.id}:${position.id}`));
    const total = targetTotalByDifficulty[position.difficulty] || 42;

    const weights = position.categoryWeights;
    let counts = {};
    for (const w of weights) {
      counts[w.name] = Math.max(0, Math.round((total * w.weight) / 100));
    }

    counts["Tes Kepribadian"] = Math.max(counts["Tes Kepribadian"] || 0, 6);
    counts["Tes Situasional (SJT)"] = Math.max(counts["Tes Situasional (SJT)"] || 0, 2);

    const cap = (name) => {
      let pool;
      if (name === "Tes Situasional (SJT)") pool = sjtPool;
      else pool = poolByCategory[name] || [];
      return pool.length;
    };

    let overflow = 0;
    for (const name of Object.keys(counts)) {
      const c = cap(name);
      if (counts[name] > c) {
        overflow += counts[name] - c;
        counts[name] = c;
      }
    }

    if (overflow > 0) {
      const personalityCap = personalityPool.length;
      const room = personalityCap - counts["Tes Kepribadian"];
      counts["Tes Kepribadian"] += Math.min(overflow, room);
      overflow -= Math.min(overflow, room);
      if (overflow > 0) {
        for (const name of Object.keys(counts)) {
          if (overflow <= 0) break;
          const room = cap(name) - counts[name];
          const add = Math.min(overflow, room);
          counts[name] += add;
          overflow -= add;
        }
      }
    }

    let questions = [];
    let idx = 1;
    for (const w of weights) {
      const name = w.name;
      const n = counts[name] || 0;
      let pool;
      if (name === "Tes Situasional (SJT)") pool = sjtPool;
      else pool = poolByCategory[name] || [];
      if (n <= 0 || pool.length === 0) continue;
      const picked = shuffleSeeded(pool, rng).slice(0, n);
      for (const q of picked) {
        const { ...rest } = q;
        questions.push({
          ...rest,
          id: `${position.id}-${String(idx).padStart(3, "0")}`,
          type: q.type,
          category: name,
          subtype: q.subtype || name,
        });
        idx++;
      }
    }

    const metadata = {
      id: position.id,
      fieldId: field.id,
      positionId: position.id,
      fieldName: field.name,
      positionName: position.name,
      title: `${position.name} - Simulasi Psikotes Kerja`,
      description: position.description,
      duration: position.duration,
      difficulty: position.difficulty,
      maxScore: 100,
      totalQuestions: questions.length,
      categoryWeights: position.categoryWeights,
    };

    const dir = path.join(outDir, field.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${position.id}.json`), JSON.stringify({ metadata, questions }, null, 2), "utf8");
    generated++;
    console.log(`[OK] ${field.id}/${position.id}.json - ${questions.length} soal`);
  }
}

console.log(`\nSelesai. ${generated} bank soal dibuat, ${skipped} bidang dilewati.`);