"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { PostingActivityDataPoint } from "@/lib/types";

interface TooltipPayloadEntry {
  color?: string;
  name?: string;
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-card p-3 text-sm shadow-lg">
      <p className="font-medium mb-2 text-foreground">{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-muted-foreground flex items-center gap-2 text-xs"
        >
          <span
            className="inline-block w-2 h-2 rounded-sm shrink-0"
            style={{ backgroundColor: entry.color as string }}
          />
          <span className="capitalize">{entry.name}</span>:{" "}
          <span className="font-mono font-medium text-foreground">
            {String(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
};

export function PostingActivityChart({
  data,
}: {
  data: PostingActivityDataPoint[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 4, right: 8, bottom: 0, left: -16 }}
        barCategoryGap="30%"
        barGap={2}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.4}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Legend
          iconType="square"
          iconSize={8}
          wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
          formatter={(value) => (
            <span style={{ color: "var(--muted-foreground)", textTransform: "capitalize" }}>
              {value}
            </span>
          )}
        />
        <Bar
          dataKey="posted"
          name="Posted"
          fill="var(--chart-2)"
          radius={[3, 3, 0, 0]}
        />
        <Bar
          dataKey="relisted"
          name="Relisted"
          fill="var(--chart-3)"
          radius={[3, 3, 0, 0]}
        />
        <Bar
          dataKey="failed"
          name="Failed"
          fill="var(--destructive)"
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
