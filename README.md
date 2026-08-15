# PsikoTest Pro

Platform simulasi psikotes kerja terlengkap — latihan tes psikotes berdasarkan bidang pekerjaan dan posisi jabatan. Aplikasi ini menyediakan bank soal verbal, numerik, logika, kepribadian, situasional (SJT), ketelitian, analisis data, visual, abstrak, Kraepelin, hingga tes menggambar (Wartegg, BAUM, DAM), lengkap dengan simulasi waktu nyata, pembahasan, dan analisis hasil.

> Dibangun dengan **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS v4**.

---

## Fitur

- **Bank soal per bidang & posisi** — lebih dari 1.900 soal tersebar di 15 bidang aktif dan 40 posisi jabatan, dengan komposisi kategori soal yang menyesuaikan posisi.
- **Latihan per kategori** — 9 jenis tes dapat langsung dicoba tanpa memilih bidang/posisi (`/test/verbal`, `/test/numeric`, dst).
- **Simulasi waktu nyata** — hitung mundur mengikuti durasi psikotes sungguhan, auto-submit saat waktu habis, jawaban tersimpan otomatis tiap 10 detik, dan dapat dilanjutkan dari sesi yang belum selesai.
- **Beragam format soal** — pilihan ganda, skala Likert (kepribadian), pola gambar interaktif, soal berbasis grafik/tabel/diagram, hingga soal berbasis rumus (KaTeX).
- **Penanda & palet soal** — navigasi antar soal, menandai soal untuk di-review, dan palet status soal (dijawab / ditandai / sedang dikerjakan).
- **Analisis hasil lengkap** — skor kesiapan, persentil, akurasi, grafik per kategori, radar profil kepribadian (Big Five), kecocokan bidang, serta tips perbaikan dalam Bahasa Indonesia.
- **Ekspor PDF** — unduh hasil psikotes sebagai file PDF (`jspdf` + `html2canvas`).
- **Pembahasan per soal** — kunci jawaban, langkah penyelesaian, dan penjelasan untuk setiap soal.
- **Tes Kraepelin** — 6 kolom × 30 baris, 30 detik per kolom, dengan analisis kecepatan, akurasi, konsistensi, stabilitas, dan produktivitas.
- **Tes Menggambar** — Wartegg (8 kotak stimulus), BAUM (pohon), dan DAM (manusia) di atas canvas bebas.
- **Tema gelap/terang** — didukung `next-themes`.

---

## Jenis Tes

| Tes | Rute | Keterangan |
|---|---|---|
| Tes Verbal | `/test/verbal` | Sinonim, antonim, analogi, pemahaman bacaan |
| Tes Numerik | `/test/numeric` | Aritmatika, persentase, perbandingan, deret |
| Tes Logika | `/test/logical` | Silogisme dan penalaran formal |
| Tes Kepribadian | `/test/personality` | Pemetaan profil Big Five |
| Tes Situasional (SJT) | `/test/sjt` | Studi kasus kerja sesuai bidang |
| Tes Ketelitian | `/test/accuracy` | Pencocokan data dan pengecekan detail |
| Tes Analisis Data | `/test/data-analysis` | Membaca grafik, tabel, dan diagram |
| Tes Visual | `/test/visual` | Pola gambar dan hubungan antar bentuk |
| Tes Abstrak | `/test/abstract` | Penalaran non-verbal dan pola abstrak |
| Tes Kraepelin | `/test/kraepelin` | Penjumlahan angka berkolom berkecepatan |
| Tes Gambar | `/test/drawing` | Wartegg, BAUM, dan DAM |

---

## Alur Penggunaan

1. **Pilih bidang** di `/select-field` sesuai target karir (IT, Keuangan, BUMN, dll).
2. **Pilih posisi** di `/select-position` — sistem menyusun bank soal sesuai posisi yang dilamar.
3. **Kerjakan simulasi** dengan waktu nyata di layar ujian.
4. **Lihat hasil & pembahasan** di `/results/[sessionId]` dan `/results/[sessionId]/review`, unduh PDF, lalu pelajari tips perbaikan.

---

## Tech Stack

- **Framework:** Next.js 16.3.1 (App Router, React Compiler), React 19.2.8
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui-style components, `tw-animate-css`, `lucide-react`, `motion`
- **State:** Zustand (persist ke `localStorage`), TanStack Query
- **Chart:** Recharts
- **Canvas:** Konva / React-Konva (soal pola), HTML5 Canvas (tes menggambar)
- **Rumus:** KaTeX
- **PDF:** jsPDF + html2canvas (diimpor dinamis)
- **Form/Validasi:** react-hook-form + zod (tersedia, belum dipakai)
- **Tema:** next-themes

---

## Menjalankan Proyek

Prasyarat: **Node.js 20+** dan npm.

```bash
# install dependensi
npm install

# mode pengembangan
npm run dev
# buka http://localhost:3000

# lint
npm run lint

# type-check
npx tsc --noEmit

# build produksi
npm run build

# jalankan hasil build
npm start
```

---

## Struktur Proyek

```
app/
├── (marketing)/            # halaman ber-navbar: landing, select-field,
│   ├── select-field/       #   select-position, results, review
│   ├── select-position/
│   ├── results/[sessionId]/        # hasil simulasi + pembahasan
│   └── page.tsx            # halaman utama (landing)
├── test/                   # layar ujian fullscreen
│   ├── [field]/[position]/ # ujian berdasarkan bidang + posisi
│   ├── kraepelin/          # tes Kraepelin
│   ├── drawing/            # tes Wartegg/BAUM/DAM
│   └── verbal, numeric, …  # 9 halaman latihan per kategori
├── api/
│   ├── questions/          # GET bank soal
│   ├── fields/             # GET katalog bidang & posisi
│   └── stats/              # GET statistik platform
└── layout.tsx

components/
├── ui/                     # primitif shadcn/ui
├── layout/                 # navbar, footer
├── landing/                # komponen halaman utama
├── test/                   # exam-screen, question-renderer, palette,
│                           # pattern-canvas, data-chart, math-formula, drawing-canvas
└── results/                # results-view, review-view

data/
├── fields/index.json       # katalog 15 bidang aktif + 8 segera hadir
└── questions/              # 40 bank posisi + 9 bank kategori

lib/
├── server/                 # pembaca data bidang & soal (server-only)
├── scoring.ts              # mesin penskoran, profil Big Five, interpretasi
├── storage.ts              # helper localStorage
└── utils.ts                # cn, format durasi/tanggal, slug, shuffle, dll

hooks/                      # useQuestionBank, useCountdown, useFields, useStats
scripts/                    # generator bank soal (data & kategori)
store/                      # zustand store sesi ujian
types/                      # definisi tipe
```

---

## Bank Soal & Generator

Soal disimpan sebagai JSON dan dibaca langsung dari disk (tanpa database):

- **`data/questions/<fieldId>/<positionId>.json`** — 40 bank posisi.
- **`data/questions/category/<slug>.json`** — 9 bank kategori (latihan mandiri).

Bank soal dibuat oleh skrip generator dari kumpulan soal sumber di `scripts/pools/`, menggunakan RNG dengan seed deterministik (FNV-1a + mulberry32) sehingga hasil generasi selalu konsisten:

```bash
node scripts/generate-data.mjs        # regenerasi 40 bank posisi
node scripts/generate-category.mjs    # regenerasi 9 bank kategori
```

Jalankan dari root proyek. Setiap bank berisi `metadata` (bidang, posisi, durasi, tingkat kesulitan, komposisi kategori, skor maksimal) dan daftar `questions` dengan tipe beragam (pilihan ganda, Likert, pola gambar, grafik data, rumus).

---

## API

| Endpoint | Parameter | Deskripsi |
|---|---|---|
| `GET /api/questions` | `type=category&category=<slug>` | Bank soal per kategori |
| `GET /api/questions` | `field=<fieldId>&position=<positionId>` | Bank soal per bidang + posisi |
| `GET /api/fields` | `active=true` (opsional) | Katalog bidang & posisi beserta jumlah bank |
| `GET /api/stats` | — | Jumlah bidang, posisi, total soal, peserta |

---

## Penyimpanan Lokal

Data sesi dan hasil disimpan di `localStorage` perangkat pengguna:

| Key | Isi |
|---|---|
| `psikotes-test-store` | Sesi ujian aktif (zustand persist) |
| `psikotes:current-session` | Referensi sesi yang sedang berjalan |
| `psikotes:results` | Hasil ujian (maks. 50 entri) |
| `psikotes:drawings` | Gambar tes Wartegg/BAUM/DAM (maks. 40) |
| `psikotes:kraepelin-results` | Riwayat hasil Kraepelin (maks. 20) |
| `psikotes:participant-count` | Penghitung peserta lokal |

---

## Deployment

Aplikasi ini berjalan penuh secara statis di sisi klien (data dibaca dari JSON, tidak ada database). Dapat di-deploy ke Vercel, Netlify, atau server Node biasa:

1. `npm run build`
2. `npm start` (atau gunakan adaptor platform sesuai pilihan)

Pastikan variabel lingkungan tidak diperlukan — seluruh data disertakan dalam repositori.

---

## Penulis

- **Nama:** Yanuar Ardhika Rahmadhani Ubaidillah
- **Portofolio:** https://yanuar-ardhika.vercel.app/
- **GitHub:** https://github.com/ardhikaxx

Proyek ini dikembangkan secara pribadi oleh penulis di atas. Dilarang mengaku sebagai karya sendiri tanpa izin.

---

## Lisensi

Proyek privat. Seluruh konten soal dan kode adalah milik pemilik repositori.