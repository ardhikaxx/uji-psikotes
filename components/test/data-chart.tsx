"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DataChartConfig } from "@/types";
import { cn } from "@/lib/utils";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function DataChart({
  chart,
  className,
}: {
  chart: DataChartConfig;
  className?: string;
}) {
  if (chart.type === "table") {
    const labels = chart.labels;
    return (
      <div className={cn("overflow-hidden rounded-lg border", className)}>
        <div className="bg-muted px-4 py-2 text-sm font-semibold">
          {chart.title}
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-2 text-left font-medium">Kategori</th>
              {chart.datasets.map((d) => (
                <th key={d.label} className="px-4 py-2 text-right font-medium">
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, i) => (
              <tr key={label} className="border-b last:border-0">
                <td className="px-4 py-2">{label}</td>
                {chart.datasets.map((d) => (
                  <td key={d.label} className="px-4 py-2 text-right font-medium">
                    {d.values[i]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (chart.type === "pie") {
    const data = chart.labels.map((label, i) => ({
      name: label,
      value: chart.datasets[0]?.values[i] ?? 0,
    }));
    return (
      <div className={cn("h-64 w-full", className)}>
        <p className="mb-2 text-center text-sm font-semibold">{chart.title}</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={(entry) => `${entry.name} ${entry.value}%`}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const data = chart.labels.map((label, i) => {
    const row: Record<string, string | number> = { name: label };
    for (const d of chart.datasets) row[d.label] = d.values[i];
    return row;
  });

  const commonProps = {
    data,
    margin: { top: 10, right: 20, bottom: 5, left: 0 },
  };

  return (
    <div className={cn("h-64 w-full", className)}>
      <p className="mb-2 text-center text-sm font-semibold">{chart.title}</p>
      <ResponsiveContainer width="100%" height="100%">
        {chart.type === "bar" ? (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            {chart.datasets.map((d, i) => (
              <Bar
                key={d.label}
                dataKey={d.label}
                fill={d.color ?? COLORS[i % COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        ) : (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            {chart.datasets.map((d, i) => (
              <Line
                key={d.label}
                type="monotone"
                dataKey={d.label}
                stroke={d.color ?? COLORS[i % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}