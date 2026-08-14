import {
  arrow,
  triangle,
  square,
  circle,
  star,
  semicircle,
  dotOnCircle,
  pattern,
} from "./patterns.mjs";

function visualQ({ text, shapes, optionShapes, correctIndex, explanation }) {
  return {
    type: "visual",
    subtype: "visual-reasoning",
    category: "Tes Visual",
    text,
    options: optionShapes.map((_, i) => `Pilihan ${String.fromCharCode(65 + i)}`),
    correctIndex,
    explanation,
    pattern: pattern(200, 200, shapes, true),
    patternOptions: optionShapes.map((shapes) => pattern(200, 200, shapes, false)),
  };
}

export const visualPool = [
  visualQ({
    text: "Perhatikan gambar berikut. Manakah yang merupakan hasil rotasi 90° searah jarum jam dari gambar tersebut?",
    shapes: [arrow(0, 100, 100, "#2563eb")],
    optionShapes: [
      [arrow(0, 100, 100, "#2563eb")],
      [arrow(1, 100, 100, "#2563eb")],
      [arrow(2, 100, 100, "#2563eb")],
      [arrow(3, 100, 100, "#2563eb")],
    ],
    correctIndex: 1,
    explanation:
      "Rotasi 90° searah jarum jam mengubah arah panah dari atas menjadi ke kanan.",
  }),
  visualQ({
    text: "Perhatikan gambar berikut. Manakah yang merupakan rotasi 180° dari gambar tersebut?",
    shapes: [triangle(0, 100, 100, "#0ea5e9")],
    optionShapes: [
      [triangle(0, 100, 100, "#0ea5e9")],
      [triangle(1, 100, 100, "#0ea5e9")],
      [triangle(2, 100, 100, "#0ea5e9")],
      [triangle(3, 100, 100, "#0ea5e9")],
    ],
    correctIndex: 2,
    explanation: "Rotasi 180° membuat segitiga menghadap ke bawah.",
  }),
  visualQ({
    text: "Perhatikan pola pada gambar. Manakah yang melengkapi kotak yang kosong dengan benar?",
    shapes: [
      circle(50, 50, "#2563eb", 34, false),
      circle(150, 50, "transparent", 34, true),
      square(50, 150, "#f59e0b"),
    ],
    optionShapes: [
      [square(100, 100, "#f59e0b")],
      [square(100, 100, "transparent")],
      [circle(100, 100, "#2563eb", 34, false)],
      [circle(100, 100, "transparent", 34, true)],
    ],
    correctIndex: 1,
    explanation:
      "Pola: bentuk berganti per baris (lingkaran → persegi) dan isian berganti per kolom (penuh → garis luar). Kotak kosong = persegi garis luar.",
  }),
  visualQ({
    text: "Perhatikan pola rotasi pada gambar. Manakah yang melengkapi kotak kosong dengan benar?",
    shapes: [
      triangle(0, 50, 50, "#0ea5e9"),
      triangle(1, 150, 50, "#0ea5e9"),
      triangle(0, 50, 150, "#f43f5e"),
    ],
    optionShapes: [
      [triangle(0, 100, 100, "#f43f5e")],
      [triangle(1, 100, 100, "#f43f5e")],
      [triangle(0, 100, 100, "#0ea5e9")],
      [triangle(1, 100, 100, "#0ea5e9")],
    ],
    correctIndex: 1,
    explanation:
      "Setiap baris diputar 90° searah jarum jam. Baris bawah = segitiga merah yang menghadap ke kanan.",
  }),
  visualQ({
    text: "Perhatikan gambar berikut. Manakah yang merupakan cermin (refleksi vertikal) dari gambar tersebut?",
    shapes: [{ ...arrow(0, 100, 100, "#2563eb"), rotation: 45 }],
    optionShapes: [
      [{ ...arrow(0, 100, 100, "#2563eb"), rotation: 45 }],
      [{ ...arrow(0, 100, 100, "#2563eb"), rotation: 135 }],
      [{ ...arrow(0, 100, 100, "#2563eb"), rotation: 225 }],
      [{ ...arrow(0, 100, 100, "#2563eb"), rotation: 315 }],
    ],
    correctIndex: 1,
    explanation:
      "Refleksi vertikal mengubah arah panah kanan-atas menjadi kiri-atas, yaitu rotasi 135°.",
  }),
  visualQ({
    text: "Perhatikan gambar berikut. Manakah yang merupakan cermin (refleksi vertikal) dari gambar tersebut?",
    shapes: [triangle(1, 100, 100, "#0ea5e9")],
    optionShapes: [
      [triangle(0, 100, 100, "#0ea5e9")],
      [triangle(1, 100, 100, "#0ea5e9")],
      [triangle(2, 100, 100, "#0ea5e9")],
      [triangle(3, 100, 100, "#0ea5e9")],
    ],
    correctIndex: 3,
    explanation:
      "Refleksi vertikal mengubah segitiga yang menghadap kanan menjadi menghadap kiri.",
  }),
  visualQ({
    text: "Perhatikan pola pergerakan titik pada gambar. Manakah yang melengkapi kotak kosong dengan benar?",
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
      "Titik bergerak searah jarum jam: atas → kanan → bawah → kiri. Kotak kosong = titik di kiri.",
  }),
  visualQ({
    text: "Perhatikan pola ukuran pada gambar. Manakah yang melengkapi kotak kosong dengan benar?",
    shapes: [
      circle(50, 50, "#10b981", 22, false),
      circle(150, 50, "#10b981", 30, false),
      circle(50, 150, "#10b981", 38, false),
    ],
    optionShapes: [
      [circle(100, 100, "#10b981", 38, false)],
      [circle(100, 100, "#10b981", 44, false)],
      [circle(100, 100, "#10b981", 30, false)],
      [circle(100, 100, "#10b981", 22, false)],
    ],
    correctIndex: 1,
    explanation: "Ukuran lingkaran membesar secara berurutan dari kecil ke besar.",
  }),
  visualQ({
    text: "Perhatikan pola jumlah sudut pada gambar. Manakah yang melengkapi kotak kosong dengan benar?",
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
  visualQ({
    text: "Perhatikan gambar berikut. Manakah yang merupakan hasil rotasi 270° searah jarum jam dari gambar tersebut?",
    shapes: [semicircle(0, 100, 100, "#f59e0b")],
    optionShapes: [
      [semicircle(0, 100, 100, "#f59e0b")],
      [semicircle(1, 100, 100, "#f59e0b")],
      [semicircle(2, 100, 100, "#f59e0b")],
      [semicircle(3, 100, 100, "#f59e0b")],
    ],
    correctIndex: 3,
    explanation:
      "Rotasi 270° searah jarum jam mengubah setengah lingkaran terbuka ke atas menjadi terbuka ke kiri.",
  }),
];