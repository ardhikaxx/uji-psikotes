"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock, FileQuestion, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FieldIcon } from "@/components/field-icons";
import { useFields } from "@/hooks/useFields";
import { formatDurationShort } from "@/lib/utils";

export default function SelectFieldPage() {
  const { data: fields, isLoading } = useFields();
  const [query, setQuery] = React.useState("");

  const filtered = (fields ?? []).filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Pilih Bidang Pekerjaan</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
          Pilih bidang pekerjaan yang sesuai dengan target karier kamu. Setelah
          memilih bidang, kamu akan diminta memilih posisi jabatan yang lebih
          spesifik.
        </p>
      </div>

      <div className="relative mx-auto mb-8 max-w-md">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          placeholder="Cari bidang pekerjaan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((field) => {
            const isActive = field.status === "active" && field.questionBanks > 0;
            const duration = field.positions[0]?.duration ?? 0;
            return (
              <Card
                key={field.id}
                className={`group transition-all ${
                  isActive
                    ? "hover:border-primary/50 hover:shadow-md"
                    : "opacity-60"
                }`}
              >
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-start justify-between">
                    <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                      <FieldIcon name={field.icon} className="size-6" />
                    </div>
                    {isActive ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600">
                        Tersedia
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Segera Hadir</Badge>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{field.name}</h2>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      {field.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileQuestion className="size-3.5" />
                      {field.positions.length} posisi
                    </span>
                    {isActive && duration > 0 && (
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {formatDurationShort(duration)}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <Link
                      href={`/select-position?field=${field.id}`}
                      className="text-primary mt-1 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                    >
                      Pilih Bidang Ini
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <p className="text-muted-foreground py-12 text-center">
          Tidak ada bidang yang cocok dengan pencarianmu.
        </p>
      )}
    </div>
  );
}