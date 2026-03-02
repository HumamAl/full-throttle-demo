"use client";

import { useState } from "react";

interface MetricRow {
  label: string;
  current: number;
  hardened: number;
  unit: string;
  lowerIsBetter?: boolean;
}

const METRICS: MetricRow[] = [
  {
    label: "Post completion rate",
    current: 62,
    hardened: 93,
    unit: "%",
    lowerIsBetter: false,
  },
  {
    label: "CAPTCHA-caused aborts",
    current: 18,
    hardened: 2,
    unit: "%",
    lowerIsBetter: true,
  },
  {
    label: "Photo upload success",
    current: 71,
    hardened: 97,
    unit: "%",
    lowerIsBetter: false,
  },
  {
    label: "Avg retry latency",
    current: 45,
    hardened: 8,
    unit: "s",
    lowerIsBetter: true,
  },
];

export function VizCompletionMetrics() {
  const [mode, setMode] = useState<"current" | "hardened">("current");

  const isGoodValue = (metric: MetricRow, value: number) => {
    if (metric.lowerIsBetter) return value <= metric.hardened;
    return value >= metric.hardened;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          Posting run health
        </p>
        <div
          className="flex rounded-md overflow-hidden"
          style={{
            border: "1px solid oklch(1 0 0 / 0.12)",
          }}
        >
          <button
            onClick={() => setMode("current")}
            className="px-3 py-1 text-xs font-medium transition-colors duration-150"
            style={{
              background:
                mode === "current"
                  ? "color-mix(in oklch, var(--destructive) 15%, transparent)"
                  : "transparent",
              color:
                mode === "current"
                  ? "var(--destructive)"
                  : "var(--muted-foreground)",
            }}
          >
            Current
          </button>
          <button
            onClick={() => setMode("hardened")}
            className="px-3 py-1 text-xs font-medium transition-colors duration-150"
            style={{
              background:
                mode === "hardened"
                  ? "color-mix(in oklch, var(--success) 12%, transparent)"
                  : "transparent",
              color:
                mode === "hardened"
                  ? "var(--success)"
                  : "var(--muted-foreground)",
            }}
          >
            Hardened
          </button>
        </div>
      </div>

      <div className="space-y-2.5">
        {METRICS.map((metric) => {
          const displayValue =
            mode === "current" ? metric.current : metric.hardened;
          const barMax = metric.unit === "s" ? 60 : 100;
          const barWidth = (displayValue / barMax) * 100;
          const good = isGoodValue(metric, displayValue);

          return (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-foreground/80">{metric.label}</span>
                <span
                  className="text-xs font-mono font-semibold"
                  style={{
                    color: good
                      ? "var(--success)"
                      : mode === "current"
                      ? "var(--destructive)"
                      : "var(--muted-foreground)",
                  }}
                >
                  {displayValue}
                  {metric.unit}
                </span>
              </div>
              <div
                className="h-2 rounded-full w-full overflow-hidden"
                style={{ background: "oklch(1 0 0 / 0.08)" }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${barWidth}%`,
                    background: good
                      ? "var(--success)"
                      : "var(--destructive)",
                    boxShadow: good
                      ? "0 0 8px color-mix(in oklch, var(--success) 40%, transparent)"
                      : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-muted-foreground/60 pt-1">
        Toggle between current baseline and hardened automation targets
      </p>
    </div>
  );
}
