"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Brush,
  ChevronRight,
  History,
  Sigma,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  clearDrawings,
  clearResults,
  getParticipantCount,
  loadDrawings,
  loadResults,
} from "@/lib/storage";
import { formatDate, formatDurationShort } from "@/lib/utils";
import type { DrawingResult, KraepelinResult, TestResult } from "@/types";

function statusColor(value: number) {
  return value >= 80
    ? "text-emerald-600"
    : value >= 60
      ? "text-amber-600"
      : "text-rose-600";
}

export default function HistoryPage() {
  const [results, setResults] = React.useState<TestResult[]>([]);
  const [drawings, setDrawings] = React.useState<DrawingResult[]>([]);
  const [kraepelin, setKraepelin] = React.useState<
    (KraepelinResult & { completedAt: number })[]
  >([]);
  const [participants, setParticipants] = React.useState(0);

  React.useEffect(() => {
    // Muat data dari localStorage setelah mount (aman untuk hydration).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResults(loadResults());
    setDrawings(loadDrawings());
    setKraepelin(
      JSON.parse(localStorage.getItem("psikotes:kraepelin-results") ?? "[]") ?? []
    );
    setParticipants(getParticipantCount());
  }, []);

  function removeResult(sessionId: string) {
    const next = results.filter((r) => r.sessionId !== sessionId);
    localStorage.setItem("psikotes:results", JSON.stringify(next));
    setResults(next);
    toast.success("Riwayat tes dihapus");
  }

  function removeDrawing(id: string) {
    const next = drawings.filter((d) => d.id !== id);
    setDrawings(next);
    clearDrawings();
    localStorage.setItem("psikotes:drawings", JSON.stringify(next));
    toast.success("Gambar dihapus");
  }

  function wipeAll() {
    clearResults();
    clearDrawings();
    setResults([]);
    setDrawings([]);
    toast.success("Semua riwayat dihapus");
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
            <History className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Riwayat Latihan</h1>
            <p className="text-muted-foreground text-sm">
              Semua aktivitas psikotes Anda
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            <Users className="size-3" /> {participants} peserta simulasi
          </Badge>
          {(results.length > 0 || drawings.length > 0) && (
            <Button variant="ghost" size="sm" onClick={wipeAll} className="text-muted-foreground">
              <Trash2 className="size-4" /> Hapus Semua
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="tes">
        <TabsList>
          <TabsTrigger value="tes">
            <BookOpen className="size-4" /> Hasil Tes
            {results.length > 0 && <Badge className="ml-1.5">{results.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="kraepelin">
            <Sigma className="size-4" /> Kraepelin
            {kraepelin.length > 0 && <Badge className="ml-1.5">{kraepelin.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="gambar">
            <Brush className="size-4" /> Gambar
            {drawings.length > 0 && <Badge className="ml-1.5">{drawings.length}</Badge>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tes" className="mt-5">
          {results.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Belum ada hasil tes. Mulai simulasi psikotes pertamamu!
                </p>
                <Button asChild>
                  <Link href="/select-field">Mulai Tes</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {results.map((r) => (
                <Card key={r.sessionId}>
                  <CardContent className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">{r.positionName}</h3>
                        <Badge variant="secondary">{r.fieldName}</Badge>
                      </div>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {formatDate(r.completedAt)} · {r.totalQuestions} soal ·{" "}
                        {formatDurationShort(r.durationUsed)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-extrabold ${statusColor(r.readinessScore)}`}>
                        {r.readinessScore}
                      </div>
                      <div className="text-muted-foreground text-xs">Kesiapan</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/results/${r.sessionId}`}>
                          Hasil
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => removeResult(r.sessionId)}
                        title="Hapus"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="kraepelin" className="mt-5">
          {kraepelin.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Belum ada hasil Tes Kraepelin.
                </p>
                <Button asChild>
                  <Link href="/test/kraepelin">Coba Tes Kraepelin</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {kraepelin.map((k, i) => (
                <Card key={i}>
                  <CardContent className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold">Tes Kraepelin</h3>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {formatDate(k.completedAt)} · {k.columns} kolom
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs">
                      <div>
                        <div className="text-base font-bold">{k.speedPerMinute}/mnt</div>
                        <div className="text-muted-foreground">Kecepatan</div>
                      </div>
                      <div>
                        <div className="text-base font-bold">{k.accuracy}%</div>
                        <div className="text-muted-foreground">Ketepatan</div>
                      </div>
                      <div>
                        <div className="text-base font-bold">{k.consistency}%</div>
                        <div className="text-muted-foreground">Konsistensi</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="gambar" className="mt-5">
          {drawings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Belum ada gambar tersimpan.
                </p>
                <Button asChild>
                  <Link href="/test/drawing">Coba Tes Gambar</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {drawings.length} gambar tersimpan
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {drawings.map((d) => (
                  <div key={d.id} className="group relative">
                    <div className="rounded-xl border bg-card p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element -- data URL dari canvas */}
<img
                        src={d.image}
                        alt={d.title}
                        className="aspect-[4/3] w-full rounded-lg object-contain"
                        loading="lazy"
                      />
                      <div className="mt-2 flex items-center justify-between px-1">
                        <span className="truncate text-xs font-semibold">{d.title}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground size-7"
                          onClick={() => removeDrawing(d.id)}
                          title="Hapus"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}