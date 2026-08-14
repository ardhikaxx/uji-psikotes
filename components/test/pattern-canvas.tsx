"use client";

import * as React from "react";
import { Stage, Layer, Rect, Circle, Ring, Line, Text, RegularPolygon, Star, Arc } from "react-konva";
import type { PatternConfig, ShapeSpec } from "@/types";
import { cn } from "@/lib/utils";

function drawShape(spec: ShapeSpec, key: string) {
  const rotation = spec.rotation ?? 0;
  const common = { x: spec.x, y: spec.y, rotation };

  switch (spec.type) {
    case "rect": {
      const w = spec.width ?? 40;
      const h = spec.height ?? 40;
      return (
        <Rect
          key={key}
          {...common}
          width={w}
          height={h}
          fill={spec.fill ?? "#ffffff"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
          offsetX={w / 2}
          offsetY={h / 2}
        />
      );
    }
    case "circle":
      return (
        <Circle
          key={key}
          {...common}
          radius={(spec.size ?? 40) / 2}
          fill={spec.fill ?? "#ffffff"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
        />
      );
    case "ring":
      return (
        <Ring
          key={key}
          {...common}
          innerRadius={spec.innerRadius ?? 10}
          outerRadius={(spec.size ?? 40) / 2}
          fill={spec.fill ?? "transparent"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
        />
      );
    case "triangle":
      return (
        <RegularPolygon
          key={key}
          {...common}
          sides={3}
          radius={(spec.size ?? 40) / 2}
          fill={spec.fill ?? "#ffffff"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
        />
      );
    case "polygon":
      return (
        <Line
          key={key}
          {...common}
          points={spec.points ?? []}
          closed
          fill={spec.fill ?? "#ffffff"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
        />
      );
    case "diamond":
      return (
        <Line
          key={key}
          {...common}
          points={[0, -(spec.size ?? 40) / 2, (spec.size ?? 40) / 2, 0, 0, (spec.size ?? 40) / 2, -(spec.size ?? 40) / 2, 0]}
          closed
          fill={spec.fill ?? "#ffffff"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
        />
      );
    case "star":
      return (
        <Star
          key={key}
          {...common}
          numPoints={spec.pointsCount ?? 5}
          innerRadius={spec.innerRadius ?? 15}
          outerRadius={(spec.size ?? 40) / 2}
          fill={spec.fill ?? "#ffffff"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
        />
      );
    case "line": {
      const w = spec.width ?? 20;
      return (
        <Line
          key={key}
          {...common}
          points={[-w / 2, 0, w / 2, 0]}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
          lineCap="round"
        />
      );
    }
    case "semicircle":
      return (
        <Arc
          key={key}
          {...common}
          angle={180}
          innerRadius={0}
          outerRadius={(spec.size ?? 40) / 2}
          fill={spec.fill ?? "#ffffff"}
          stroke={spec.stroke}
          strokeWidth={spec.strokeWidth}
        />
      );
    case "text":
      return (
        <Text
          key={key}
          {...common}
          text={spec.text ?? ""}
          fontSize={spec.fontSize ?? 18}
          fill={spec.fill ?? "#0f172a"}
          align="center"
          verticalAlign="middle"
          width={80}
          offsetX={40}
          offsetY={spec.fontSize ? spec.fontSize / 2 : 9}
        />
      );
    default:
      return null;
  }
}

export function PatternCanvas({
  pattern,
  className,
}: {
  pattern: PatternConfig;
  className?: string;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={className}
        style={{ width: pattern.width, height: pattern.height }}
      />
    );
  }

  return (
    <Stage
      width={pattern.width}
      height={pattern.height}
      className={cn("overflow-hidden rounded-lg", className)}
    >
      <Layer>
        <Rect
          width={pattern.width}
          height={pattern.height}
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth={1}
        />
        {pattern.shapes.map((s, i) => drawShape(s, `s-${i}`))}
        {pattern.questionMark && (
          <>
            <Circle
              x={150}
              y={150}
              radius={38}
              fill="transparent"
              stroke="#cbd5e1"
              strokeWidth={3}
              dash={[6, 4]}
            />
            <Text
              x={150}
              y={150}
              text="?"
              fontSize={44}
              fill="#94a3b8"
              align="center"
              verticalAlign="middle"
              width={60}
              offsetX={30}
              offsetY={22}
            />
          </>
        )}
      </Layer>
    </Stage>
  );
}