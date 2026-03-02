"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Zap,
  ZapOff,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Trash2,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  ChevronRight,
  Database,
  Facebook,
  Settings2,
  ListChecks,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  units,
  postingLogs,
  postingActivity,
  dashboardStats,
  dmsConfig,
  facebookConnection,
  postingRules,
  getUnitById,
} from "@/data/mock-data";
import type { PostingLog, PostingAction, PostingLogStatus } from "@/lib/types";
import { APP_CONFIG } from "@/lib/config";

// ─── SSR-safe chart import ────────────────────────────────────────────────────

const PostingActivityChart = dynamic(
  () =>
    import("@/components/dashboard/posting-activity-chart").then(
      (m) => m.PostingActivityChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] rounded-lg animate-pulse bg-white/5" />
    ),
  }
);

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 900) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ─── Relative timestamp helper ────────────────────────────────────────────────

function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

// ─── Stat card component ──────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  change: number;
  accent: string;
  index: number;
}

function StatCard({ title, value, suffix, change, accent, index }: StatCardProps) {
  const { count, ref } = useCountUp(value);
  const isPositiveGood = title !== "Post Failures";
  const isGood = isPositiveGood ? change >= 0 : change <= 0;
  const TrendIcon = change >= 0 ? TrendingUp : TrendingDown;

  return (
    <div
      ref={ref}
      className="dark-card p-4 animate-fade-up-in"
      style={{
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
        animationFillMode: "both",
      }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
        {title}
      </p>
      <p
        className="text-3xl font-bold font-mono tabular-nums mb-2"
        style={{ color: accent }}
      >
        {count}
        {suffix && (
          <span className="text-lg font-medium text-muted-foreground ml-0.5">
            {suffix}
          </span>
        )}
      </p>
      <div className="flex items-center gap-1">
        <TrendIcon
          className="w-3 h-3 shrink-0"
          style={{ color: isGood ? "var(--success)" : "var(--destructive)" }}
        />
        <span
          className="text-xs font-mono"
          style={{ color: isGood ? "var(--success)" : "var(--destructive)" }}
        >
          {change > 0 ? "+" : ""}
          {change}
        </span>
        <span className="text-xs text-muted-foreground">vs last week</span>
      </div>
    </div>
  );
}

// ─── Action badge ─────────────────────────────────────────────────────────────

const ACTION_LABEL: Record<PostingAction, string> = {
  post: "Post",
  relist: "Relist",
  retire: "Retire",
  remove: "Remove",
};

const ACTION_COLOR: Record<PostingAction, string> = {
  post: "var(--primary)",
  relist: "var(--chart-3)",
  retire: "var(--muted-foreground)",
  remove: "var(--destructive)",
};

function StatusBadge({ status }: { status: PostingLogStatus }) {
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
        style={{ background: "oklch(0.627 0.194 149.214 / 0.15)", color: "var(--success)" }}>
        <CheckCircle2 className="w-3 h-3" />
        Success
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
      style={{ background: "oklch(0.577 0.245 27.325 / 0.15)", color: "var(--destructive)" }}>
      <XCircle className="w-3 h-3" />
      Failed
    </span>
  );
}

// ─── Getting Started Panel ────────────────────────────────────────────────────

function GettingStartedPanel() {
  const steps = [
    {
      id: "dms",
      icon: Database,
      label: "DMS Feed Connected",
      detail: `${dmsConfig.systemName} · syncs every ${dmsConfig.syncIntervalMinutes} min`,
      status: dmsConfig.status === "connected" ? "done" : "error",
    },
    {
      id: "fb",
      icon: Facebook,
      label: "Facebook Session Active",
      detail: facebookConnection.captchaTriggered
        ? "CAPTCHA triggered on last run — session needs renewal"
        : `Logged in as ${facebookConnection.profileName}`,
      status: facebookConnection.status === "connected" && !facebookConnection.captchaTriggered
        ? "done"
        : facebookConnection.captchaTriggered
        ? "warn"
        : "error",
    },
    {
      id: "rules",
      icon: Settings2,
      label: "Posting Rules Configured",
      detail: `Max ${postingRules.maxPostsPerDay} posts/day · ${postingRules.delayBetweenPosts}s delay between runs`,
      status: "done" as const,
    },
    {
      id: "queue",
      icon: ListChecks,
      label: "Units Queued for Posting",
      detail: `${dashboardStats.postQueueDepth} units ready · ${dashboardStats.postsFailed} require attention`,
      status: dashboardStats.postsFailed > 0 ? "warn" : "done",
    },
  ];

  const doneCount = steps.filter((s) => s.status === "done").length;
  const allDone = doneCount === steps.length;

  return (
    <div className="dark-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">Setup Checklist</p>
          <span
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{
              background: allDone ? "oklch(0.627 0.194 149.214 / 0.15)" : "oklch(0.68 0.20 42 / 0.12)",
              color: allDone ? "var(--success)" : "var(--primary)",
            }}
          >
            {doneCount}/{steps.length}
          </span>
        </div>
        {!allDone && (
          <p className="text-xs text-muted-foreground">
            Resolve warnings to run at full capacity
          </p>
        )}
        {allDone && (
          <p className="text-xs" style={{ color: "var(--success)" }}>
            All systems ready
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone = step.status === "done";
          const isWarn = step.status === "warn";
          const accentColor = isDone
            ? "var(--success)"
            : isWarn
            ? "var(--warning)"
            : "var(--destructive)";

          return (
            <div
              key={step.id}
              className="rounded-lg p-3 flex flex-col gap-2 cursor-default transition-all"
              style={{
                background: "oklch(1 0 0 / 0.03)",
                border: `1px solid ${
                  isDone ? "oklch(1 0 0 / 0.06)" : isWarn ? "oklch(0.769 0.188 70.08 / 0.20)" : "oklch(0.577 0.245 27.325 / 0.20)"
                }`,
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{ background: `${accentColor}18` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: accentColor }} />
                </div>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--success)" }} />
                ) : isWarn ? (
                  <AlertCircle className="w-3.5 h-3.5" style={{ color: "var(--warning)" }} />
                ) : (
                  <XCircle className="w-3.5 h-3.5" style={{ color: "var(--destructive)" }} />
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-foreground leading-tight">
                  {step.label}
                </p>
                <p
                  className="text-[10px] leading-tight mt-0.5"
                  style={{ color: isWarn || !isDone ? accentColor : "var(--muted-foreground)" }}
                >
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CAPTCHA warning action */}
      {facebookConnection.captchaTriggered && (
        <div
          className="mt-3 flex items-center justify-between rounded-lg px-3 py-2.5"
          style={{
            background: "oklch(0.769 0.188 70.08 / 0.08)",
            border: "1px solid oklch(0.769 0.188 70.08 / 0.20)",
          }}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--warning)" }} />
            <p className="text-xs" style={{ color: "var(--warning)" }}>
              Facebook CAPTCHA detected on last run — manual session restore needed before automation resumes
            </p>
          </div>
          <a
            href="/settings"
            className="flex items-center gap-1 text-xs font-medium shrink-0 ml-3 transition-colors"
            style={{ color: "var(--warning)" }}
          >
            Fix in Settings <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [automationOn, setAutomationOn] = useState(true);
  const [syncPulsing, setSyncPulsing] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<"6m" | "12m">("12m");

  const chartData = useMemo(() => {
    if (chartPeriod === "6m") return postingActivity.slice(-6);
    return postingActivity;
  }, [chartPeriod]);

  // Recent posting activity (last 9 logs, newest first)
  const recentLogs: PostingLog[] = useMemo(
    () => [...postingLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 9),
    []
  );

  function handleSyncNow() {
    setSyncPulsing(true);
    setTimeout(() => setSyncPulsing(false), 2000);
  }

  // New units = units arrived in last 7 days
  const newUnitsCount = units.filter((u) => u.daysOnLot <= 7).length;

  const stats = [
    {
      title: "Units on Lot",
      value: dashboardStats.unitsOnLot,
      change: dashboardStats.unitsOnLotChange,
      accent: "var(--foreground)",
    },
    {
      title: "New This Week",
      value: newUnitsCount,
      change: 2,
      accent: "var(--chart-4)",
    },
    {
      title: "In Queue",
      value: dashboardStats.postQueueDepth,
      change: dashboardStats.postQueueDepthChange,
      accent: "var(--primary)",
    },
    {
      title: "Active Listings",
      value: dashboardStats.unitsPosted,
      change: dashboardStats.unitsPostedChange,
      accent: "var(--success)",
    },
    {
      title: "Sold Today",
      value: dashboardStats.soldToday,
      change: dashboardStats.soldTodayChange,
      accent: "var(--warning)",
    },
  ];

  return (
    <div
      className="space-y-4"
      style={{ padding: "var(--content-padding)" }}
    >
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-semibold tracking-tight text-foreground"
            style={{ letterSpacing: "var(--heading-tracking)" }}
          >
            Automation Command
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Thunder Ridge Powersports · Lightspeed EVO connected
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              background: automationOn ? "var(--success)" : "var(--muted-foreground)",
              boxShadow: automationOn ? "0 0 6px var(--success)" : "none",
              animation: automationOn ? "pulse-dot 2s ease-in-out infinite" : "none",
            }}
          />
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {automationOn ? "Automation active" : "Manual mode"}
          </span>
        </div>
      </div>

      {/* ── Automation toggle banner ─────────────────────────────── */}
      <div
        className="rounded-lg border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all"
        style={{
          borderColor: automationOn ? "oklch(0.68 0.20 42 / 0.35)" : "var(--border)",
          background: automationOn
            ? "oklch(0.68 0.20 42 / 0.08)"
            : "oklch(1 0 0 / 0.03)",
          transition: "all 200ms ease",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: automationOn ? "var(--primary)" : "oklch(1 0 0 / 0.06)",
            }}
          >
            {automationOn ? (
              <Zap className="w-5 h-5" style={{ color: "var(--primary-foreground)" }} />
            ) : (
              <ZapOff className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">
              FULL THROTTLE —{" "}
              <span style={{ color: automationOn ? "var(--primary)" : "var(--muted-foreground)" }}>
                {automationOn ? "ON" : "OFF"}
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {automationOn
                ? "Automation active — posting queued units via Playwright"
                : "Manual posting mode — toggle to enable automation"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setAutomationOn((v) => !v)}
          className="text-xs font-semibold px-4 py-2 rounded-md shrink-0 transition-all"
          style={{
            background: automationOn ? "oklch(1 0 0 / 0.08)" : "var(--primary)",
            color: automationOn ? "var(--muted-foreground)" : "var(--primary-foreground)",
            border: automationOn ? "1px solid oklch(1 0 0 / 0.12)" : "none",
          }}
        >
          {automationOn ? "Disable" : "Enable"}
        </button>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            accent={stat.accent}
            index={i}
          />
        ))}
      </div>

      {/* ── Sync status bar ─────────────────────────────────────── */}
      <div
        className="dark-card px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="w-3.5 h-3.5" style={{ color: "var(--success)" }} />
          <span>
            Last DMS Sync:{" "}
            <span className="text-foreground font-medium">
              {relativeTime(dashboardStats.syncFreshness)}
            </span>
          </span>
        </div>
        <div className="hidden sm:block w-px h-3 bg-white/10" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>
            Last Post Run:{" "}
            <span className="text-foreground font-medium">
              {relativeTime(dashboardStats.lastPostTime)}
            </span>
          </span>
        </div>
        <div className="hidden sm:block w-px h-3 bg-white/10" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>
            Posting Rate:{" "}
            <span className="font-mono font-medium" style={{ color: "var(--primary)" }}>
              {dashboardStats.postingRate.toFixed(1)}%
            </span>{" "}
            coverage
          </span>
        </div>
        <div className="sm:ml-auto">
          <button
            onClick={handleSyncNow}
            disabled={syncPulsing}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-all"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              opacity: syncPulsing ? 0.7 : 1,
            }}
          >
            <RefreshCw
              className={cn("w-3.5 h-3.5", syncPulsing && "animate-spin")}
            />
            {syncPulsing ? "Syncing…" : "Sync Now"}
          </button>
        </div>
      </div>

      {/* ── Getting Started / Setup Checklist ───────────────────── */}
      <GettingStartedPanel />

      {/* ── Chart + secondary side-by-side on large screens ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Posting activity chart */}
        <div className="dark-card p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Posting Activity
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                FB Marketplace posts, relistings, and failures
              </p>
            </div>
            <div className="flex gap-1.5">
              {(["6m", "12m"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className="text-xs px-2.5 py-1 rounded-md border transition-all"
                  style={{
                    background:
                      chartPeriod === p
                        ? "var(--primary)"
                        : "oklch(1 0 0 / 0.04)",
                    color:
                      chartPeriod === p
                        ? "var(--primary-foreground)"
                        : "var(--muted-foreground)",
                    borderColor:
                      chartPeriod === p
                        ? "var(--primary)"
                        : "oklch(1 0 0 / 0.10)",
                  }}
                >
                  {p === "6m" ? "6 mo" : "12 mo"}
                </button>
              ))}
            </div>
          </div>
          <PostingActivityChart data={chartData} />
        </div>

        {/* Inventory breakdown */}
        <div className="dark-card p-4 flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">
            Inventory Status
          </p>
          <p className="text-xs text-muted-foreground -mt-2">
            Current lot breakdown
          </p>

          {/* Status rows */}
          {[
            { label: "Posted (Active)", count: dashboardStats.unitsPosted, color: "var(--success)" },
            { label: "In Queue", count: dashboardStats.postQueueDepth, color: "var(--primary)" },
            { label: "Post Failed", count: dashboardStats.postsFailed, color: "var(--destructive)" },
            { label: "Aged Units (60+ days)", count: dashboardStats.agedUnits, color: "var(--warning)" },
            {
              label: "Pending Recon",
              count: units.filter((u) => u.status === "Pending Recon").length,
              color: "var(--chart-4)",
            },
            {
              label: "In Stock (not queued)",
              count: units.filter((u) => u.status === "In Stock").length,
              color: "var(--muted-foreground)",
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: row.color, boxShadow: `0 0 4px ${row.color}60` }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {row.label}
                </span>
              </div>
              <span
                className="text-sm font-mono font-semibold shrink-0"
                style={{ color: row.color }}
              >
                {row.count}
              </span>
            </div>
          ))}

          {/* Progress bar */}
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Posting coverage</span>
              <span className="font-mono" style={{ color: "var(--primary)" }}>
                {dashboardStats.postingRate.toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${dashboardStats.postingRate}%`,
                  background: "var(--primary)",
                  boxShadow: "0 0 6px var(--primary)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent posting activity feed ─────────────────────────── */}
      <div className="dark-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Recent Posting Activity
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest Playwright automation run results
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-xs border-white/10 text-muted-foreground"
          >
            {recentLogs.length} entries
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/6">
                <th className="text-left text-muted-foreground font-medium pb-2 pr-4 whitespace-nowrap">
                  Unit
                </th>
                <th className="text-left text-muted-foreground font-medium pb-2 pr-4 whitespace-nowrap">
                  Action
                </th>
                <th className="text-left text-muted-foreground font-medium pb-2 pr-4 whitespace-nowrap">
                  Status
                </th>
                <th className="text-left text-muted-foreground font-medium pb-2 pr-4 whitespace-nowrap">
                  Duration
                </th>
                <th className="text-left text-muted-foreground font-medium pb-2 whitespace-nowrap">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {recentLogs.map((log) => {
                const unit = getUnitById(log.unitId);
                return (
                  <tr
                    key={log.id}
                    className="group transition-colors"
                    style={{ ["--hover-bg" as string]: "oklch(1 0 0 / 0.03)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "oklch(1 0 0 / 0.03)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "transparent")
                    }
                  >
                    <td className="py-2.5 pr-4 whitespace-nowrap">
                      <div>
                        <span className="font-medium text-foreground">
                          {unit
                            ? `${unit.year} ${unit.make} ${unit.model}`
                            : log.unitId}
                        </span>
                        {unit && (
                          <span className="text-muted-foreground ml-2 font-mono">
                            {unit.stockNumber}
                          </span>
                        )}
                      </div>
                      {log.status === "failed" && log.errorMessage && (
                        <p className="text-destructive mt-0.5 text-[10px] leading-tight max-w-xs truncate">
                          {log.errorMessage}
                        </p>
                      )}
                    </td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center gap-1 font-medium"
                      >
                        {log.action === "post" && (
                          <Zap className="w-3 h-3" style={{ color: "var(--primary)" }} />
                        )}
                        {log.action === "relist" && (
                          <RotateCcw className="w-3 h-3" style={{ color: "var(--chart-3)" }} />
                        )}
                        {log.action === "retire" && (
                          <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                        )}
                        {log.action === "remove" && (
                          <Trash2 className="w-3 h-3 text-destructive" />
                        )}
                        <span style={{ color: ACTION_COLOR[log.action] }}>
                          {ACTION_LABEL[log.action]}
                        </span>
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 whitespace-nowrap">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="py-2.5 pr-4 whitespace-nowrap font-mono text-muted-foreground">
                      {formatDuration(log.duration)}
                    </td>
                    <td className="py-2.5 whitespace-nowrap text-muted-foreground">
                      {relativeTime(log.timestamp)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Proposal bottom banner ──────────────────────────────── */}
      <div
        className="rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border"
        style={{
          background: "oklch(0.68 0.20 42 / 0.06)",
          borderColor: "oklch(0.68 0.20 42 / 0.20)",
        }}
      >
        <div>
          <p className="text-sm font-medium text-foreground">
            This is a live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            My approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-all"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              transitionDuration: "var(--dur-fast)",
            }}
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
