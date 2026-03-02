"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, Search, Zap } from "lucide-react";

type StepStatus = "idle" | "trying" | "failed" | "success";

interface SelectorStep {
  id: string;
  label: string;
  selector: string;
  description: string;
}

const STEPS: SelectorStep[] = [
  {
    id: "primary",
    label: "Primary selector",
    selector: '[aria-label="Create new listing"]',
    description: "Stable aria-label — first attempt",
  },
  {
    id: "fallback-1",
    label: "Fallback #1",
    selector: '[data-testid="marketplace-create-btn"]',
    description: "Test ID — used when aria-label changes",
  },
  {
    id: "fallback-2",
    label: "Fallback #2",
    selector: 'button:has-text("Create new listing")',
    description: "Text-content match — survives class renames",
  },
  {
    id: "alert",
    label: "Alert escalation",
    selector: "Slack / email notify",
    description: "All selectors failed — human-in-the-loop triggered",
  },
];

export function VizSelectorFallback() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [running, setRunning] = useState(false);
  const [failAt, setFailAt] = useState<number>(0); // which step to start succeeding at

  const getStatus = (idx: number): StepStatus => {
    if (activeStep === -1) return "idle";
    if (idx < activeStep) return "failed";
    if (idx === activeStep && running) return "trying";
    if (idx === activeStep && !running) {
      return idx === 3 ? "failed" : "success";
    }
    return "idle";
  };

  const simulate = async (startFailingAt: number) => {
    setFailAt(startFailingAt);
    setRunning(true);
    setActiveStep(0);

    for (let i = 0; i <= Math.min(startFailingAt, 3); i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 700));
      if (i < startFailingAt) {
        // this step fails, continue
      } else {
        // this step succeeds (or is the alert step)
        break;
      }
    }

    setRunning(false);
  };

  const reset = () => {
    setActiveStep(-1);
    setRunning(false);
  };

  const statusIcon = (status: StepStatus, isAlert: boolean) => {
    if (status === "idle")
      return (
        <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>
      );
    if (status === "trying")
      return (
        <div className="w-5 h-5 rounded-full flex items-center justify-center">
          <Search className="w-3.5 h-3.5 text-primary animate-pulse" />
        </div>
      );
    if (status === "failed")
      return (
        <div className="w-5 h-5 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
        </div>
      );
    if (status === "success") {
      if (isAlert)
        return (
          <div className="w-5 h-5 rounded-full flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-warning" />
          </div>
        );
      return (
        <div className="w-5 h-5 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
        </div>
      );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
          Selector resolution chain
        </p>
        {activeStep !== -1 && !running && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        {STEPS.map((step, idx) => {
          const status = getStatus(idx);
          const isAlert = idx === 3;
          const isActive = idx === activeStep;

          return (
            <div
              key={step.id}
              className="flex items-start gap-3 rounded-md px-3 py-2 transition-all duration-200"
              style={{
                backgroundColor:
                  isActive && running
                    ? "color-mix(in oklch, var(--primary) 8%, transparent)"
                    : status === "success" && !isAlert
                    ? "color-mix(in oklch, var(--success) 8%, transparent)"
                    : status === "success" && isAlert
                    ? "color-mix(in oklch, var(--warning) 8%, transparent)"
                    : status === "failed"
                    ? "color-mix(in oklch, var(--destructive) 6%, transparent)"
                    : "oklch(1 0 0 / 0.03)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor:
                  isActive && running
                    ? "color-mix(in oklch, var(--primary) 25%, transparent)"
                    : status === "success" && !isAlert
                    ? "color-mix(in oklch, var(--success) 20%, transparent)"
                    : status === "success" && isAlert
                    ? "color-mix(in oklch, var(--warning) 20%, transparent)"
                    : status === "failed"
                    ? "color-mix(in oklch, var(--destructive) 15%, transparent)"
                    : "oklch(1 0 0 / 0.08)",
              }}
            >
              <div className="mt-0.5 shrink-0">{statusIcon(status, isAlert)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground/80">
                    {step.label}
                  </span>
                  {isAlert && (
                    <span className="text-[10px] font-mono text-warning/70 bg-warning/10 px-1.5 py-0.5 rounded">
                      escalation
                    </span>
                  )}
                </div>
                <code className="text-[10px] font-mono text-muted-foreground block mt-0.5 truncate">
                  {step.selector}
                </code>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <p className="text-[10px] text-muted-foreground">Simulate primary selector break:</p>
        <button
          disabled={running}
          onClick={() => simulate(1)}
          className="text-[10px] px-2 py-1 rounded border transition-colors duration-150 disabled:opacity-40"
          style={{
            borderColor: "color-mix(in oklch, var(--primary) 30%, transparent)",
            color: "var(--primary)",
            background: "color-mix(in oklch, var(--primary) 8%, transparent)",
          }}
        >
          Primary fails → Fallback #1
        </button>
        <button
          disabled={running}
          onClick={() => simulate(2)}
          className="text-[10px] px-2 py-1 rounded border transition-colors duration-150 disabled:opacity-40"
          style={{
            borderColor: "color-mix(in oklch, var(--warning) 30%, transparent)",
            color: "var(--warning)",
            background: "color-mix(in oklch, var(--warning) 8%, transparent)",
          }}
        >
          Both fail → Fallback #2
        </button>
        <button
          disabled={running}
          onClick={() => simulate(3)}
          className="text-[10px] px-2 py-1 rounded border transition-colors duration-150 disabled:opacity-40"
          style={{
            borderColor: "color-mix(in oklch, var(--destructive) 30%, transparent)",
            color: "var(--destructive)",
            background: "color-mix(in oklch, var(--destructive) 8%, transparent)",
          }}
        >
          All fail → Alert
        </button>
      </div>
    </div>
  );
}
