"use client";

import * as React from "react";
import { Eraser, Pencil, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DrawingCanvasHandle {
  getImage: () => string | null;
}

interface Stroke {
  color: string;
  width: number;
  eraser: boolean;
  points: { x: number; y: number }[];
}

const COLORS = [
  { name: "Hitam", value: "#111827" },
  { name: "Merah", value: "#dc2626" },
  { name: "Biru", value: "#2563eb" },
  { name: "Hijau", value: "#16a34a" },
  { name: "Ungu", value: "#7c3aed" },
  { name: "Coklat", value: "#92400e" },
];

export const DrawingCanvas = React.forwardRef<
  DrawingCanvasHandle,
  {
    id: string;
    width?: number;
    height?: number;
    stimulus?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  }
>(function DrawingCanvas(
  { id, width = 220, height = 300, stimulus },
  ref
) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = React.useState<Stroke[]>([]);
  const [color, setColor] = React.useState(COLORS[0].value);
  const [widthBrush, setWidthBrush] = React.useState(3);
  const [eraser, setEraser] = React.useState(false);
  const drawingRef = React.useRef(false);
  const currentStrokeRef = React.useRef<Stroke | null>(null);

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  React.useImperativeHandle(ref, () => ({
    getImage: () => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return canvas.toDataURL("image/png");
    },
  }));

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    stimulus?.(ctx, width, height);
    for (const s of strokes) {
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = s.eraser ? "destination-out" : "source-over";
      s.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }, [strokes, width, height, dpr, stimulus]);

  function getPos(e: React.PointerEvent): { x: number; y: number } {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function startStroke(e: React.PointerEvent) {
    e.preventDefault();
    const pos = getPos(e);
    drawingRef.current = true;
    currentStrokeRef.current = {
      color,
      width: eraser ? widthBrush * 4 : widthBrush,
      eraser,
      points: [pos],
    };
    canvasRef.current?.setPointerCapture(e.pointerId);
  }

  function moveStroke(e: React.PointerEvent) {
    if (!drawingRef.current || !currentStrokeRef.current) return;
    const pos = getPos(e);
    currentStrokeRef.current.points.push(pos);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const s = currentStrokeRef.current;
    ctx.beginPath();
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation = s.eraser ? "destination-out" : "source-over";
    ctx.moveTo(s.points[s.points.length - 2].x, s.points[s.points.length - 2].y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  }

  function endStroke() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (currentStrokeRef.current) {
      setStrokes((prev) => [...prev, currentStrokeRef.current!]);
      currentStrokeRef.current = null;
    }
  }

  function undo() {
    setStrokes((prev) => prev.slice(0, -1));
  }

  function clearCanvas() {
    setStrokes([]);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative overflow-hidden rounded-xl border shadow-sm">
        <canvas
          id={id}
          ref={canvasRef}
          style={{ width, height, touchAction: "none" }}
          onPointerDown={startStroke}
          onPointerMove={moveStroke}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          className="cursor-crosshair"
        />
      </div>
      <div className="flex w-full max-w-[220px] flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              title={c.name}
              onClick={() => setColor(c.value)}
              className={cn(
                "size-6 rounded-full border-2 transition-transform",
                color === c.value
                  ? "border-primary scale-110"
                  : "border-muted-foreground/30"
              )}
              style={{ backgroundColor: c.value }}
            />
          ))}
          <Button
            variant="outline"
            size="icon"
            className="size-6"
            onClick={() => setEraser((v) => !v)}
            title="Penghapus"
          >
            {eraser ? <Eraser className="size-3.5" /> : <Pencil className="size-3.5" />}
          </Button>
        </div>
        <div className="flex w-full items-center gap-2">
          <input
            type="range"
            min={1}
            max={10}
            value={widthBrush}
            onChange={(e) => setWidthBrush(Number(e.target.value))}
            className="w-full"
            title="Ukuran kuas"
          />
          <Button variant="ghost" size="icon" onClick={undo} disabled={strokes.length === 0} title="Urungkan">
            <Undo2 className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={clearCanvas} disabled={strokes.length === 0} title="Bersihkan">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});