"use client";

import { useState, useEffect } from "react";
import {
  Play,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Ban,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { postingQueue, getUnitById } from "@/data/mock-data";
import type { PostingQueueItem, QueueItemStatus, PostingErrorType } from "@/lib/types";

// ── Status config ─────────────────────────────────────────────────────────────

function QueueStatusBadge({ status }: { status: QueueItemStatus }) {
  const config: Record<QueueItemStatus, { label: string; color: string; icon: React.ReactNode }> = {
    queued: {
      label: "Queued",
      color: "text-[color:var(--primary)] bg-[color:var(--primary)]/10 border-[color:var(--primary)]/25",
      icon: <Clock className="w-3 h-3" />,
    },
    posting: {
      label: "Posting…",
      color: "text-[color:var(--primary)] bg-[color:var(--primary)]/10 border-[color:var(--primary)]/25 animate-pulse",
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
    },
    posted: {
      label: "Posted",
      color: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/25",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    failed: {
      label: "Failed",
      color: "text-destructive bg-destructive/10 border-destructive/25",
      icon: <AlertCircle className="w-3 h-3" />,
    },
    cancelled: {
      label: "Cancelled",
      color: "text-muted-foreground bg-muted/40 border-border/30",
      icon: <Ban className="w-3 h-3" />,
    },
  };
  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[11px] font-medium border rounded-full px-2 py-0 leading-5 whitespace-nowrap inline-flex items-center gap-1",
        c.color
      )}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

// ── Error type label ──────────────────────────────────────────────────────────

function errorTypeLabel(t: PostingErrorType): string {
  const map: Record<PostingErrorType, string> = {
    selector_break: "Selector Break",
    captcha: "CAPTCHA Triggered",
    timeout: "Request Timeout",
    photo_upload: "Photo Upload Failed",
    session_expired: "Session Expired",
    unknown: "Unknown Error",
  };
  return map[t] ?? t;
}

// ── Simulated posting progress ────────────────────────────────────────────────

function PostingProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
        <span>Playwright running…</span>
        <span className="font-mono">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-3 mt-1.5 text-[10px] text-muted-foreground/60">
        {["Open Marketplace", "Fill form", "Upload photos", "Submit listing"].map(
          (step, i) => {
            const stepProgress = (i + 1) * 25;
            return (
              <span
                key={step}
                className={cn(
                  "transition-colors duration-200",
                  progress >= stepProgress ? "text-[color:var(--primary)]" : ""
                )}
              >
                {progress >= stepProgress ? "✓ " : ""}
                {step}
              </span>
            );
          }
        )}
      </div>
    </div>
  );
}

// ── Queue row card ────────────────────────────────────────────────────────────

interface QueueRowProps {
  item: PostingQueueItem;
  position: number;
  postingProgress: number;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
}

function QueueRow({ item, position, postingProgress, onCancel, onRetry }: QueueRowProps) {
  const unit = getUnitById(item.unitId);
  if (!unit) return null;

  const isPosting = item.status === "posting";
  const isFailed = item.status === "failed";
  const isPosted = item.status === "posted";
  const isCancelled = item.status === "cancelled";

  return (
    <div
      className={cn(
        "dark-card p-3 transition-all duration-150",
        isPosting && "border-[color:var(--primary)]/30",
        isFailed && "border-destructive/20",
        isCancelled && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Position badge */}
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5",
            isPosting
              ? "bg-primary/20 text-primary animate-pulse"
              : isFailed
              ? "bg-destructive/10 text-destructive"
              : isPosted
              ? "bg-[color:var(--success)]/10 text-[color:var(--success)]"
              : isCancelled
              ? "bg-muted/50 text-muted-foreground/50"
              : "bg-muted/50 text-muted-foreground"
          )}
        >
          {isPosting ? <Loader2 className="w-3 h-3 animate-spin" /> : position}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <span className="font-medium text-sm text-foreground truncate">
                {unit.year} {unit.make} {unit.model}
                {unit.trim ? ` ${unit.trim}` : ""}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/60 shrink-0">
                {unit.stockNumber}
              </span>
              <Badge
                variant="outline"
                className="text-[10px] border-border/30 text-muted-foreground/60 px-1.5 py-0 leading-4 rounded shrink-0"
              >
                {unit.type}
              </Badge>
            </div>
            <QueueStatusBadge status={item.status} />
          </div>

          {/* Retry count */}
          {item.retryCount > 0 && (
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">
              Retry {item.retryCount}/{item.maxRetries}
            </p>
          )}

          {/* Posting progress bar */}
          {isPosting && <PostingProgressBar progress={postingProgress} />}

          {/* Error details */}
          {isFailed && item.errorMessage && (
            <div className="mt-2 rounded bg-destructive/8 border border-destructive/15 p-2">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-3 h-3 text-destructive shrink-0" />
                <span className="text-[11px] font-medium text-destructive">
                  {item.errorType ? errorTypeLabel(item.errorType) : "Error"}
                </span>
                <span className="text-[10px] text-destructive/60 ml-auto">
                  Max retries reached
                </span>
              </div>
              <p className="text-[11px] text-destructive/80 leading-relaxed font-mono">
                {item.errorMessage}
              </p>
            </div>
          )}

          {/* Cancelled reason */}
          {isCancelled && item.errorMessage && (
            <p className="text-[11px] text-muted-foreground/50 mt-1 font-mono leading-relaxed">
              {item.errorMessage}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {item.status === "queued" && (
            <Button
              size="sm"
              variant="outline"
              className="h-6 text-[11px] px-2 border-border/40 text-muted-foreground hover:text-foreground transition-colors duration-100"
              onClick={() => onCancel(item.id)}
            >
              <X className="w-3 h-3 mr-1" />
              Cancel
            </Button>
          )}
          {isFailed && (
            <Button
              size="sm"
              className="h-6 text-[11px] px-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100"
              onClick={() => onRetry(item.id)}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const ACTIVE_STATUSES: QueueItemStatus[] = ["queued", "posting", "failed"];

export default function PostingQueuePage() {
  const [items, setItems] = useState<PostingQueueItem[]>(postingQueue);
  const [postingProgress, setPostingProgress] = useState(62);
  const [queueRunning, setQueueRunning] = useState(true);

  // Animate the posting progress for the item currently "posting"
  useEffect(() => {
    if (!queueRunning) return;
    const hasPosting = items.some((i) => i.status === "posting");
    if (!hasPosting) return;
    const interval = setInterval(() => {
      setPostingProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          // Mark the posting item as posted
          setItems((prev) =>
            prev.map((i) =>
              i.status === "posting"
                ? { ...i, status: "posted" as QueueItemStatus, completedAt: new Date().toISOString() }
                : i
            )
          );
          return 100;
        }
        return p + 0.8;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [queueRunning, items]);

  function handleCancel(id: string) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "cancelled" as QueueItemStatus } : i
      )
    );
  }

  function handleRetry(id: string) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: "queued" as QueueItemStatus, retryCount: 0, errorMessage: null, errorType: null }
          : i
      )
    );
  }

  function handleRunQueue() {
    setQueueRunning(true);
    setPostingProgress(0);
    // Move first queued item to posting
    setItems((prev) => {
      const firstQueued = prev.find((i) => i.status === "queued");
      if (!firstQueued) return prev;
      return prev.map((i) =>
        i.id === firstQueued.id
          ? { ...i, status: "posting" as QueueItemStatus, startedAt: new Date().toISOString() }
          : i
      );
    });
  }

  // Separate active from history
  const activeItems = items.filter((i) => ACTIVE_STATUSES.includes(i.status));
  const historyItems = items.filter((i) => !ACTIVE_STATUSES.includes(i.status));

  const queueDepth = items.filter(
    (i) => i.status === "queued" || i.status === "posting"
  ).length;
  const failedCount = items.filter((i) => i.status === "failed").length;

  // Assign visible queue positions to active items
  let position = 1;
  const itemsWithPositions = activeItems.map((item) => {
    const pos = item.status === "posting" || item.status === "failed" ? position++ : position++;
    return { item, pos };
  });

  return (
    <div className="p-[var(--content-padding)] space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground uppercase">
              Post Queue
            </h1>
            <Badge
              variant="outline"
              className="text-[11px] font-mono border-border/40 text-muted-foreground px-2 py-0 leading-5 rounded-full"
            >
              {queueDepth} pending
            </Badge>
            {failedCount > 0 && (
              <Badge
                variant="outline"
                className="text-[11px] font-mono border-destructive/30 text-destructive px-2 py-0 leading-5 rounded-full"
              >
                {failedCount} failed
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Playwright automation queue — posting units to Facebook Marketplace
          </p>
        </div>

        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100 text-xs h-8"
          onClick={handleRunQueue}
          disabled={queueDepth === 0}
        >
          <Play className="w-3.5 h-3.5 mr-1.5" />
          Run Queue
        </Button>
      </div>

      {/* Live run indicator */}
      {items.some((i) => i.status === "posting") && (
        <div className="dark-card-glow p-3 flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping absolute" />
            <div className="w-2 h-2 rounded-full bg-primary relative" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground">
              Playwright session active
            </p>
            <p className="text-[11px] text-muted-foreground">
              Posting to Facebook Marketplace — do not close the browser
            </p>
          </div>
          <span className="font-mono text-xs text-primary shrink-0">
            {Math.round(postingProgress)}% complete
          </span>
        </div>
      )}

      {/* Active queue */}
      {activeItems.length > 0 ? (
        <div className="space-y-2">
          <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Active Queue
          </h2>
          <div className="space-y-2">
            {itemsWithPositions.map(({ item, pos }) => (
              <QueueRow
                key={item.id}
                item={item}
                position={pos}
                postingProgress={postingProgress}
                onCancel={handleCancel}
                onRetry={handleRetry}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="dark-card p-8 text-center">
          <CheckCircle2 className="w-8 h-8 text-[color:var(--success)]/60 mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">Queue is clear</p>
          <p className="text-xs text-muted-foreground mt-1">
            All pending units have been processed. Add new units from Inventory to re-queue.
          </p>
        </div>
      )}

      {/* Recent history */}
      {historyItems.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Recent History
          </h2>
          <div className="space-y-2">
            {historyItems.map((item, idx) => (
              <QueueRow
                key={item.id}
                item={item}
                position={idx + 1}
                postingProgress={100}
                onCancel={handleCancel}
                onRetry={handleRetry}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
