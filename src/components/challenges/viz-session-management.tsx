"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  ShieldCheck,
  Cookie,
  LogIn,
  Play,
  AlertTriangle,
} from "lucide-react";

type SessionState = "unchecked" | "checking" | "healthy" | "stale" | "reauthed";

interface HealthCheck {
  id: string;
  label: string;
  detail: string;
  icon: React.ElementType;
  passesNaive: boolean;
}

const CHECKS: HealthCheck[] = [
  {
    id: "url",
    label: "URL check",
    detail: 'page.url() !== "https://www.facebook.com/login"',
    icon: LogIn,
    passesNaive: true,
  },
  {
    id: "cookie",
    label: "Cookie freshness",
    detail: "c_user + xs cookie expiry > now + 2h buffer",
    icon: Cookie,
    passesNaive: false,
  },
  {
    id: "marketplace",
    label: "Marketplace permission",
    detail: "FB Marketplace selling privileges — expire independently",
    icon: ShieldCheck,
    passesNaive: false,
  },
  {
    id: "profile",
    label: "Persistent profile intact",
    detail: "localStorage profile flags match expected seller state",
    icon: RefreshCw,
    passesNaive: false,
  },
];

export function VizSessionManagement() {
  const [sessionState, setSessionState] = useState<SessionState>("unchecked");
  const [mode, setMode] = useState<"naive" | "hardened">("naive");
  const [step, setStep] = useState<number>(-1);

  const runCheck = async () => {
    setSessionState("checking");
    setStep(0);

    for (let i = 0; i < CHECKS.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 500));

      const passes = mode === "hardened" ? true : CHECKS[i].passesNaive;
      if (!passes) {
        if (mode === "naive") {
          // naive mode misses the check entirely — proceeds anyway
          continue;
        }
        // hardened mode detects failure and re-auths
        setSessionState("stale");
        await new Promise((r) => setTimeout(r, 700));
        setSessionState("reauthed");
        return;
      }
    }

    setSessionState("healthy");
  };

  const reset = () => {
    setSessionState("unchecked");
    setStep(-1);
  };

  const getCheckResult = (check: HealthCheck, idx: number) => {
    if (step < idx) return "pending";
    if (mode === "naive") {
      return check.passesNaive ? "pass" : "missed";
    }
    return "pass";
  };

  const statusColors = {
    unchecked: "var(--muted-foreground)",
    checking: "var(--primary)",
    healthy: "var(--success)",
    stale: "var(--warning)",
    reauthed: "var(--success)",
  } as const;

  const statusLabels = {
    unchecked: "Not verified",
    checking: "Checking session...",
    healthy: "Session healthy — run proceeds",
    stale: "Stale session detected",
    reauthed: "Re-auth complete — run proceeds",
  } as const;

  return (
    <div className="space-y-3">
      {/* Mode toggle */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          Pre-run session check
        </p>
        <div
          className="flex rounded-md overflow-hidden"
          style={{ border: "1px solid oklch(1 0 0 / 0.12)" }}
        >
          <button
            onClick={() => { setMode("naive"); reset(); }}
            className="px-3 py-1 text-xs font-medium transition-colors duration-150"
            style={{
              background:
                mode === "naive"
                  ? "color-mix(in oklch, var(--destructive) 15%, transparent)"
                  : "transparent",
              color: mode === "naive" ? "var(--destructive)" : "var(--muted-foreground)",
            }}
          >
            Naive
          </button>
          <button
            onClick={() => { setMode("hardened"); reset(); }}
            className="px-3 py-1 text-xs font-medium transition-colors duration-150"
            style={{
              background:
                mode === "hardened"
                  ? "color-mix(in oklch, var(--success) 12%, transparent)"
                  : "transparent",
              color: mode === "hardened" ? "var(--success)" : "var(--muted-foreground)",
            }}
          >
            Hardened
          </button>
        </div>
      </div>

      {/* Check rows */}
      <div className="space-y-1.5">
        {CHECKS.map((check, idx) => {
          const result = step >= 0 ? getCheckResult(check, idx) : "pending";
          const Icon = check.icon;
          const isPending = result === "pending";
          const isMissed = result === "missed";
          const isPass = result === "pass";
          const isChecking = step === idx && sessionState === "checking";

          return (
            <div
              key={check.id}
              className="flex items-start gap-3 rounded-md px-3 py-2 transition-all duration-200"
              style={{
                background: isMissed
                  ? "color-mix(in oklch, var(--warning) 6%, transparent)"
                  : isPass
                  ? "color-mix(in oklch, var(--success) 6%, transparent)"
                  : "oklch(1 0 0 / 0.03)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: isMissed
                  ? "color-mix(in oklch, var(--warning) 18%, transparent)"
                  : isPass
                  ? "color-mix(in oklch, var(--success) 15%, transparent)"
                  : "oklch(1 0 0 / 0.08)",
                opacity: isPending ? 0.5 : 1,
              }}
            >
              <Icon
                className="h-3.5 w-3.5 mt-0.5 shrink-0 transition-colors duration-200"
                style={{
                  color: isMissed
                    ? "var(--warning)"
                    : isPass
                    ? "var(--success)"
                    : "var(--muted-foreground)",
                  animation: isChecking ? "pulse 1s ease-in-out infinite" : "none",
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-foreground/80">
                    {check.label}
                  </span>
                  {isMissed && (
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                      style={{
                        background: "color-mix(in oklch, var(--warning) 12%, transparent)",
                        color: "var(--warning)",
                      }}
                    >
                      skipped in naive mode
                    </span>
                  )}
                  {isPass && (
                    <CheckCircle2
                      className="h-3 w-3"
                      style={{ color: "var(--success)" }}
                    />
                  )}
                </div>
                <code className="text-[10px] font-mono text-muted-foreground/60 block mt-0.5 truncate">
                  {check.detail}
                </code>
              </div>
            </div>
          );
        })}
      </div>

      {/* Session status banner */}
      {sessionState !== "unchecked" && (
        <div
          className="flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200"
          style={{
            background: `color-mix(in oklch, ${statusColors[sessionState]} 8%, transparent)`,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: `color-mix(in oklch, ${statusColors[sessionState]} 20%, transparent)`,
          }}
        >
          {sessionState === "stale" ? (
            <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: "var(--warning)" }} />
          ) : sessionState === "checking" ? (
            <RefreshCw className="h-4 w-4 shrink-0 animate-spin" style={{ color: "var(--primary)" }} />
          ) : sessionState === "reauthed" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--success)" }} />
          ) : sessionState === "healthy" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--success)" }} />
          ) : (
            <XCircle className="h-4 w-4 shrink-0" style={{ color: "var(--destructive)" }} />
          )}
          <p
            className="text-xs font-medium"
            style={{ color: statusColors[sessionState] }}
          >
            {statusLabels[sessionState]}
          </p>
          {sessionState === "reauthed" && (
            <span className="text-[10px] text-muted-foreground ml-auto">
              Cookie refreshed, Marketplace permission confirmed
            </span>
          )}
        </div>
      )}

      {/* CTA row */}
      <div className="flex items-center gap-2 pt-0.5">
        <button
          onClick={runCheck}
          disabled={sessionState === "checking"}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all duration-150 disabled:opacity-40"
          style={{
            background: "color-mix(in oklch, var(--primary) 12%, transparent)",
            border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)",
            color: "var(--primary)",
          }}
        >
          <Play className="h-3 w-3" />
          Run {mode === "naive" ? "naive" : "hardened"} check
        </button>
        {sessionState !== "unchecked" && (
          <button
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Reset
          </button>
        )}
        <p className="text-[10px] text-muted-foreground/50 ml-auto">
          {mode === "naive"
            ? "Naive: only URL check — 3 failure paths invisible"
            : "Hardened: 4 checks, stale session auto-recovered"}
        </p>
      </div>
    </div>
  );
}
