"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";

type PanelView = "before" | "after";

const BEFORE_ITEMS = [
  "Unit sold in DMS — no FB action triggered",
  "Stale session cookie — silent auth failure",
  "Listing stays live for 2-7 days",
  "Buyers inquiry on sold unit — staff deflects manually",
  "Manual staff removal: 5-15 min per listing",
  "~12 stale listings live at any given time",
];

const AFTER_ITEMS = [
  "DMS marks unit Sold → webhook fires immediately",
  "Session validator checks cookie freshness before run",
  "Re-auth flow triggers if session is stale (auto-handled)",
  "Listing removed within 1 hour of sync",
  "Zero manual removal steps required",
  "Stale listing count drops to 0 in steady state",
];

export function VizListingRemoval() {
  const [view, setView] = useState<PanelView>("before");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          Delisting flow
        </p>
        <div
          className="flex rounded-md overflow-hidden"
          style={{ border: "1px solid oklch(1 0 0 / 0.12)" }}
        >
          <button
            onClick={() => setView("before")}
            className="px-3 py-1 text-xs font-medium transition-colors duration-150"
            style={{
              background:
                view === "before"
                  ? "color-mix(in oklch, var(--destructive) 15%, transparent)"
                  : "transparent",
              color:
                view === "before"
                  ? "var(--destructive)"
                  : "var(--muted-foreground)",
            }}
          >
            Before
          </button>
          <button
            onClick={() => setView("after")}
            className="px-3 py-1 text-xs font-medium transition-colors duration-150"
            style={{
              background:
                view === "after"
                  ? "color-mix(in oklch, var(--success) 12%, transparent)"
                  : "transparent",
              color:
                view === "after" ? "var(--success)" : "var(--muted-foreground)",
            }}
          >
            After
          </button>
        </div>
      </div>

      {/* Stat callout */}
      <div
        className="flex items-center gap-3 rounded-md px-3 py-2.5"
        style={{
          background:
            view === "before"
              ? "color-mix(in oklch, var(--destructive) 8%, transparent)"
              : "color-mix(in oklch, var(--success) 8%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor:
            view === "before"
              ? "color-mix(in oklch, var(--destructive) 20%, transparent)"
              : "color-mix(in oklch, var(--success) 20%, transparent)",
        }}
      >
        {view === "before" ? (
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
        ) : (
          <CheckCircle2 className="h-5 w-5 text-[color:var(--success)] shrink-0" />
        )}
        <div>
          <p
            className="text-sm font-semibold"
            style={{
              color:
                view === "before" ? "var(--destructive)" : "var(--success)",
            }}
          >
            {view === "before"
              ? "~12 stale listings live at any given time"
              : "Auto-removed within 1 hour of DMS sync"}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {view === "before"
              ? "Staff spending 60-90 min/week on manual removals"
              : "Zero manual intervention — session recovery handled automatically"}
          </p>
        </div>
      </div>

      {/* Item list */}
      <div className="space-y-1.5">
        {(view === "before" ? BEFORE_ITEMS : AFTER_ITEMS).map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {view === "before" ? (
              i < 2 ? (
                <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0 text-warning" />
              ) : (
                <XCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-destructive" />
              )
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
            )}
            <span className="text-xs text-foreground/70 leading-snug">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
