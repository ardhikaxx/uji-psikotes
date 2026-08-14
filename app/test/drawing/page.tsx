"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ChevronLeft, Download, Save, TreePine, User, Shapes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DrawingCanvas, type DrawingCanvasHandle } from "@/components/test/drawing-canvas";
import { loadDrawings, saveDrawings } from "@/lib/storage";

function warteggStimulus(n: number) {
  return (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.strokeStyle = "#6b7280";
    ctx.fillStyle = "#6b7280";
    ctx.lineWidth = 1.5;
    switch (n) {
      case 1: {
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.5, 2.5, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 2: {
        ctx.beginPath();
        ctx.arc(w * 0.3, h * 0.72, 12, Math.PI * 0.4, Math.PI * 1.4);
        ctx.stroke();
        break;
      }
      case 3: {
        for (let i = 0; i < 3; i++) {
          const x = w * 0.42 + i * 6;
          ctx.beginPath();
          ctx.moveTo(x, h * 0.68);
          ctx.lineTo(x, h * 0.68 - (12 + i * 8));
          ctx.stroke();
        }
        break;
      }
      case 4: {
        ctx.strokeRect(w * 0.66, h * 0.24, 16, 16);
        break;
      }
      case 5: {
        ctx.beginPath();
        ctx.moveTo(w * 0.32, h * 0.62);
        ctx.lineTo(w * 0.44, h * 0.76);
        ctx.lineTo(w * 0.56, h * 0.62);
        ctx.stroke();
        break;
      }
      case 6: {
        ctx.beginPath();
        ctx.moveTo(w * 0.3, h * 0.7);
        ctx.lineTo(w * 0.52, h * 0.7);
        ctx.moveTo(w * 0.36, h * 0.78);
        ctx.lineTo(w * 0.58, h * 0.78);
        ctx.stroke();
        break;
      }
      case 7: {
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(w * 0.7 - i * 5, h * 0.3 - i * 5, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case 8: {
        ctx.beginPath();
        ctx.arc(w * 0.68, h * 0.72, 10, Math.PI * 0.1, Math.PI * 0.9);
        ctx.stroke();
        break;
      }
    }
  };
}

const WARTEGG_LABELS = [
  "1. Titik",
  "2. Garis lengkung",
  "3. Garis-garis",
  "4. Kotak kecil",
  "5. Huruf V",
  "6. Garis horizontal",
  "7. Titik-titik",
  "8. Busur",
];

function useSave() {
  function save(images: { title: string; image: string }[]) {
    const existing = loadDrawings();
    const added = images.map((img) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: img.title,
      image: img.image,
      createdAt: Date.now(),
    }));
    saveDrawings([...added, ...existing].slice(0, 40));
    toast.success(`${added.length} gambar berhasil disimpan`);
  }
  return save;
}

export default function DrawingPage() {
  const save = useSave();
  const warteggRefs = React.useRef<Array<DrawingCanvasHandle | null>>([]);
  const baumRef = React.useRef<DrawingCanvasHandle>(null);
  const damRef = React.useRef<DrawingCanvasHandle>(null);
  const [saved, setSaved] = React.useState<boolean[]>([]);

  function saveWartegg() {
    const images: { title: string; image: string }[] = [];
    const marks: boolean[] = [];
    warteggRefs.current.forEach((ref, i) => {
      const img = ref?.getImage();
      if (img) {
        images.push({ title: `Wartegg ${i + 1}`, image: img });
        marks.push(true);
      } else {
        marks.push(false);
      }
    });
    if (images.length === 0) {
      toast.error("Belum ada gambar untuk disimpan");
      return;
    }
    save(images);
    setSaved(marks);
  }

  function saveSingle(ref: React.RefObject<DrawingCanvasHandle | null>, title: string) {
    const img = ref.current?.getImage();
    if (!img) {
      toast.error("Belum ada gambar untuk disimpan");
      return;
    }
    save([{ title, image: img }]);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Badge className="mb-2">Tes Menggambar</Badge>
          <h1 className="text-2xl font-bold sm:text-3xl">Psikotes Gambar</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gambar sesuai imajinasi Anda. Tidak ada jawaban benar atau salah.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ChevronLeft className="size-4" />
            Beranda
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="wartegg">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="wartegg">
            <Shapes className="size-4" /> Wartegg
          </TabsTrigger>
          <TabsTrigger value="baum">
            <TreePine className="size-4" /> BAUM
          </TabsTrigger>
          <TabsTrigger value="dam">
            <User className="size-4" /> DAM
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wartegg" className="mt-5">
          <div className="mb-4 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p>
              Lengkapi setiap kotak sesuai stimulus yang diberikan. Gunakan satu
              gambar utuh per kotak, lalu tekan <strong>Simpan Semua</strong>.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex flex-col items-center gap-1 rounded-xl border bg-card p-3">
                <div className="mb-1 flex w-full items-center justify-between">
                  <span className="text-xs font-semibold">{WARTEGG_LABELS[i]}</span>
                  {saved[i] && <Check className="text-emerald-500 size-4" />}
                </div>
                <DrawingCanvas
                  id={`wartegg-${i + 1}`}
                  ref={(el) => {
                    warteggRefs.current[i] = el;
                  }}
                  width={180}
                  height={140}
                  stimulus={warteggStimulus(i + 1)}
                />
              </div>
            ))}
          </div>
          <Button className="mt-5" size="lg" onClick={saveWartegg}>
            <Save className="size-4" />
            Simpan Semua Gambar
          </Button>
        </TabsContent>

        <TabsContent value="baum" className="mt-5">
          <div className="mb-4 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p>
              Gambarlah <strong>sebuah pohon</strong> lengkap dengan batang, cabang,
              dan daun. Gambar sesuai yang Anda ketahui, bukan meniru orang lain.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-5">
            <DrawingCanvas
              id="baum"
              ref={baumRef}
              width={380}
              height={420}
            />
            <Button onClick={() => saveSingle(baumRef, "BAUM (Pohon)")}>
              <Save className="size-4" />
              Simpan Gambar
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="dam" className="mt-5">
          <div className="mb-4 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p>
              Gambarlah <strong>seorang manusia</strong> secara utuh. Gambar sesuai
              yang Anda ketahui tentang bentuk tubuh manusia.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-5">
            <DrawingCanvas
              id="dam"
              ref={damRef}
              width={380}
              height={420}
            />
            <Button onClick={() => saveSingle(damRef, "DAM (Manusia)")}>
              <Save className="size-4" />
              Simpan Gambar
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Download className="size-4" />
        Gambar tersimpan akan ditampilkan pada halaman Riwayat.
      </div>
    </div>
  );
}