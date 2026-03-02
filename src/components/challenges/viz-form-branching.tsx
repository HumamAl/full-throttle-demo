"use client";

import { useState } from "react";
import { Bike, Zap, ArrowRight } from "lucide-react";

type VehicleType = "motorcycle" | "powersport";

interface FormField {
  label: string;
  example: string;
  required: boolean;
  motorcycleOnly?: boolean;
  powersportOnly?: boolean;
}

const FORM_FIELDS: FormField[] = [
  { label: "Title", example: "2023 Harley-Davidson Street Glide", required: true },
  { label: "Category", example: '"Motorcycles" vs "Powersports"', required: true },
  { label: "Price", example: "$14,999", required: true },
  { label: "Condition", example: "Used", required: true },
  { label: "Year / Make / Model", example: "2023 / Harley-Davidson / Street Glide", required: true },
  { label: "Mileage (mi)", example: "4,200 mi", required: true, motorcycleOnly: true },
  { label: "Transmission", example: "Manual 6-speed", required: true, motorcycleOnly: true },
  { label: "Engine Size (cc)", example: "1,868 cc", required: true, motorcycleOnly: true },
  { label: "Color", example: "Vivid Black", required: true },
  { label: "Description", example: "DMS-synced listing copy", required: true },
  { label: "Photos", example: "Up to 10 images", required: true },
  { label: "Location", example: "Dealership zip code", required: true },
];

export function VizFormBranching() {
  const [selected, setSelected] = useState<VehicleType>("motorcycle");

  const getFieldStatus = (field: FormField) => {
    if (field.motorcycleOnly && selected === "powersport") return "skipped";
    if (field.powersportOnly && selected === "motorcycle") return "skipped";
    return "active";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          Runtime form routing
        </p>
        <p className="text-[10px] text-muted-foreground">Select vehicle type to see field set</p>
      </div>

      {/* Vehicle type selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelected("motorcycle")}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium flex-1 justify-center transition-all duration-150"
          style={{
            background:
              selected === "motorcycle"
                ? "color-mix(in oklch, var(--primary) 15%, transparent)"
                : "oklch(1 0 0 / 0.04)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor:
              selected === "motorcycle"
                ? "color-mix(in oklch, var(--primary) 35%, transparent)"
                : "oklch(1 0 0 / 0.10)",
            color: selected === "motorcycle" ? "var(--primary)" : "var(--muted-foreground)",
            boxShadow:
              selected === "motorcycle"
                ? "0 0 8px color-mix(in oklch, var(--primary) 20%, transparent)"
                : "none",
          }}
        >
          <Bike className="h-3.5 w-3.5" />
          Motorcycle
        </button>
        <div className="flex items-center">
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40" />
        </div>
        <button
          onClick={() => setSelected("powersport")}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium flex-1 justify-center transition-all duration-150"
          style={{
            background:
              selected === "powersport"
                ? "color-mix(in oklch, var(--accent) 15%, transparent)"
                : "oklch(1 0 0 / 0.04)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor:
              selected === "powersport"
                ? "color-mix(in oklch, var(--accent) 35%, transparent)"
                : "oklch(1 0 0 / 0.10)",
            color: selected === "powersport" ? "var(--accent)" : "var(--muted-foreground)",
          }}
        >
          <Zap className="h-3.5 w-3.5" />
          ATV / UTV / PWC / Snowmobile
        </button>
      </div>

      {/* Form field list */}
      <div className="space-y-1">
        {FORM_FIELDS.map((field) => {
          const status = getFieldStatus(field);
          const isSkipped = status === "skipped";
          const isMotoOnly = field.motorcycleOnly;

          return (
            <div
              key={field.label}
              className="flex items-start gap-2 rounded px-2.5 py-1.5 transition-all duration-200"
              style={{
                background: isSkipped
                  ? "oklch(1 0 0 / 0.02)"
                  : isMotoOnly && selected === "motorcycle"
                  ? "color-mix(in oklch, var(--primary) 6%, transparent)"
                  : "oklch(1 0 0 / 0.03)",
                opacity: isSkipped ? 0.4 : 1,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{
                  background: isSkipped
                    ? "var(--muted-foreground)"
                    : isMotoOnly && selected === "motorcycle"
                    ? "var(--primary)"
                    : "var(--success)",
                  boxShadow:
                    !isSkipped && isMotoOnly && selected === "motorcycle"
                      ? "0 0 4px color-mix(in oklch, var(--primary) 40%, transparent)"
                      : "none",
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[11px] font-medium"
                    style={{
                      color: isSkipped
                        ? "var(--muted-foreground)"
                        : "var(--foreground)",
                    }}
                  >
                    {field.label}
                  </span>
                  {isMotoOnly && (
                    <span
                      className="text-[9px] font-mono px-1 py-0.5 rounded"
                      style={{
                        background: "color-mix(in oklch, var(--primary) 10%, transparent)",
                        color: "var(--primary)",
                      }}
                    >
                      moto only
                    </span>
                  )}
                  {isSkipped && (
                    <span className="text-[9px] font-mono text-muted-foreground/50">
                      — skipped
                    </span>
                  )}
                </div>
                {!isSkipped && (
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5 truncate">
                    {field.example}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-muted-foreground/50 pt-0.5">
        Orange-highlighted fields appear only in the Motorcycle form path. ATV, UTV, PWC, and Snowmobile units route to the generic Powersports schema — all 5 types handled in one automation run.
      </p>
    </div>
  );
}
