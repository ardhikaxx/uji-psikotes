import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PsikoTest Pro - Latihan Psikotes Kerja Terlengkap",
    template: "%s | PsikoTest Pro",
  },
  description:
    "Platform simulasi psikotes kerja terlengkap berdasarkan bidang pekerjaan dan posisi jabatan. Latihan tes verbal, numerik, logika, kepribadian, dan banyak lagi.",
  keywords: [
    "psikotes",
    "latihan psikotes",
    "tes kerja",
    "tes kepribadian",
    "tes logika",
    "Kraepelin",
    "Wartegg",
  ],
  openGraph: {
    title: "PsikoTest Pro - Latihan Psikotes Kerja Terlengkap",
    description:
      "Simulasi psikotes kerja berdasarkan bidang dan posisi jabatan.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}