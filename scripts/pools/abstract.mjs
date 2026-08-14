import {
  triangle,
  square,
  circle,
  diamond,
  star,
  polygon,
  semicircle,
  lineSeg,
  dotOnCircle,
  pattern,
} from "./patterns.mjs";

function abstractQ({ text, shapes, optionShapes, correctIndex, explanation }) {
  return {
    type: "abstract",
    subtype: "abstract-reasoning",
    category: "Tes Abstrak",
    text,
    options: optionShapes.map((_, i) => `Pilihan ${String.fromCharCode(65 + i)}`),
    correctIndex,
    explanation,
    pattern: pattern(200, 200, shapes, true),
    patternOptions: optionShapes.map((shapes) => pattern(200, 200, shapes, false)),
  };
}

export const abstractPool = [
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [polygon(3, 50, 50, "#10b981"), polygon(4, 150, 50, "#10b981"), polygon(5, 50, 150, "#10b981")],
    optionShapes: [
      [polygon(3, 100, 100, "#10b981")],
      [polygon(4, 100, 100, "#10b981")],
      [polygon(5, 100, 100, "#10b981")],
      [polygon(6, 100, 100, "#10b981")],
    ],
    correctIndex: 3,
    explanation:
      "Jumlah sisi bertambah satu setiap langkah: segitiga (3), segi empat (4), segi lima (5), maka berikutnya segi enam (6).",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [circle(50, 50, "#2563eb", 32, false), circle(150, 50, "#f43f5e", 32, false), circle(50, 150, "#2563eb", 32, false)],
    optionShapes: [
      [circle(100, 100, "#2563eb", 32, false)],
      [circle(100, 100, "#f43f5e", 32, false)],
      [square(100, 100, "#2563eb")],
      [square(100, 100, "#f43f5e")],
    ],
    correctIndex: 1,
    explanation:
      "Warna bergantian biru → merah → biru → merah. Bentuk tetap lingkaran.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [triangle(0, 50, 50, "#0ea5e9"), triangle(1, 150, 50, "#0ea5e9"), triangle(2, 50, 150, "#0ea5e9")],
    optionShapes: [
      [triangle(0, 100, 100, "#0ea5e9")],
      [triangle(1, 100, 100, "#0ea5e9")],
      [triangle(2, 100, 100, "#0ea5e9")],
      [triangle(3, 100, 100, "#0ea5e9")],
    ],
    correctIndex: 3,
    explanation:
      "Segitiga berputar 90° searah jarum jam: atas → kanan → bawah → kiri.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [circle(50, 50, "#8b5cf6", 18, false), circle(150, 50, "#8b5cf6", 26, false), circle(50, 150, "#8b5cf6", 34, false)],
    optionShapes: [
      [circle(100, 100, "#8b5cf6", 34, false)],
      [circle(100, 100, "#8b5cf6", 40, false)],
      [circle(100, 100, "#8b5cf6", 26, false)],
      [circle(100, 100, "#8b5cf6", 18, false)],
    ],
    correctIndex: 1,
    explanation: "Ukuran lingkaran terus membesar dari kecil ke besar.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [
      star(50, 50, "#f43f5e", 3, 38, 16),
      star(150, 50, "#f43f5e", 4, 40, 17),
      star(50, 150, "#f43f5e", 5, 42, 18),
    ],
    optionShapes: [
      [star(100, 100, "#f43f5e", 5, 42, 18)],
      [star(100, 100, "#f43f5e", 6, 44, 19)],
      [star(100, 100, "#f43f5e", 4, 40, 17)],
      [star(100, 100, "#f43f5e", 3, 38, 16)],
    ],
    correctIndex: 1,
    explanation:
      "Jumlah sudut bintang bertambah satu setiap langkah: 3, 4, 5, maka berikutnya 6 sudut.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [
      circle(50, 50, "#2563eb", 30, false),
      diamond(150, 50, "#f59e0b"),
      triangle(0, 50, 150, "#10b981"),
    ],
    optionShapes: [
      [circle(100, 100, "#2563eb", 30, false)],
      [diamond(100, 100, "#f59e0b")],
      [triangle(0, 100, 100, "#10b981")],
      [square(100, 100, "#8b5cf6")],
    ],
    correctIndex: 3,
    explanation:
      "Urutan bentuk mengikuti siklus: lingkaran → belah ketupat → segitiga → persegi.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [
      circle(50, 50, "#2563eb", 32, false),
      circle(150, 50, "transparent", 32, true),
      circle(50, 150, "#2563eb", 32, false),
    ],
    optionShapes: [
      [circle(100, 100, "#2563eb", 32, false)],
      [circle(100, 100, "transparent", 32, true)],
      [square(100, 100, "#2563eb")],
      [square(100, 100, "transparent")],
    ],
    correctIndex: 1,
    explanation:
      "Isian bergantian: penuh → garis luar → penuh → garis luar.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [
      ...dotOnCircle("top", 50, 50),
      ...dotOnCircle("right", 150, 50),
      ...dotOnCircle("bottom", 50, 150),
    ],
    optionShapes: [
      [...dotOnCircle("top", 100, 100)],
      [...dotOnCircle("right", 100, 100)],
      [...dotOnCircle("bottom", 100, 100)],
      [...dotOnCircle("left", 100, 100)],
    ],
    correctIndex: 3,
    explanation:
      "Titik bergerak searah jarum jam: atas → kanan → bawah → kiri.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [
      lineSeg(30, 50, 70, 50),
      lineSeg(20, 50, 80, 50, "#334155"),
      lineSeg(10, 50, 90, 50, "#334155"),
    ],
    optionShapes: [
      [lineSeg(30, 50, 70, 50)],
      [lineSeg(20, 50, 80, 50)],
      [lineSeg(10, 50, 90, 50)],
      [lineSeg(20, 50, 80, 50, "#334155"), lineSeg(30, 60, 70, 60, "#334155")],
    ],
    correctIndex: 3,
    explanation:
      "Jumlah garis bertambah satu setiap langkah: 1 → 2 → 3 → 4 garis.",
  }),
  abstractQ({
    text: "Perhatikan urutan gambar berikut. Manakah yang merupakan gambar berikutnya yang paling tepat?",
    shapes: [semicircle(0, 50, 50, "#f59e0b"), semicircle(1, 150, 50, "#f59e0b"), semicircle(2, 50, 150, "#f59e0b")],
    optionShapes: [
      [semicircle(0, 100, 100, "#f59e0b")],
      [semicircle(1, 100, 100, "#f59e0b")],
      [semicircle(2, 100, 100, "#f59e0b")],
      [semicircle(3, 100, 100, "#f59e0b")],
    ],
    correctIndex: 3,
    explanation:
      "Setengah lingkaran berputar: atas → kanan → bawah → kiri.",
  }),
];