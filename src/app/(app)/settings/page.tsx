"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Wifi,
  WifiOff,
  ExternalLink,
  Copy,
  Check,
  Save,
  Loader2,
  ShieldCheck,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { dmsConfig, facebookConnection, postingRules } from "@/data/mock-data";
import type { DMSFormat, FacebookConnectionStatus } from "@/lib/types";

// ── DMS Integration Tab ───────────────────────────────────────────────────────

function DMSTab() {
  const [host, setHost] = useState(dmsConfig.host);
  const [port, setPort] = useState(String(dmsConfig.port));
  const [username, setUsername] = useState(dmsConfig.username);
  const [password, setPassword] = useState("••••••••••••");
  const [filePath, setFilePath] = useState(dmsConfig.filePath);
  const [format, setFormat] = useState<DMSFormat>(dmsConfig.format);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [testState, setTestState] = useState<"idle" | "testing" | "ok" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const connectionStatus = dmsConfig.status;

  const emailTemplate = `Hi,

I need FTP/SFTP access to export my inventory feed from ${dmsConfig.systemName}.

Could you please provide:
- FTP host
- Port
- Username / Password
- File path for the inventory CSV/XML export

This is for syncing with our Facebook Marketplace automation tool.

Thanks`;

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 1200);
    setTimeout(() => setSaveState("idle"), 3000);
  }

  function handleTestConnection() {
    setTestState("testing");
    setTimeout(() => setTestState("ok"), 1800);
    setTimeout(() => setTestState("idle"), 5000);
  }

  function handleCopyEmail() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Connection status banner */}
      <div
        className={cn(
          "dark-card p-3 flex items-center gap-3",
          connectionStatus === "connected" && "border-[color:var(--success)]/25",
          connectionStatus === "error" && "border-destructive/25"
        )}
      >
        {connectionStatus === "connected" ? (
          <CheckCircle2 className="w-4 h-4 text-[color:var(--success)] shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            {dmsConfig.systemName}
            <Badge
              variant="outline"
              className={cn(
                "ml-2 text-[10px] border rounded-full px-1.5 py-0 leading-4",
                connectionStatus === "connected"
                  ? "text-[color:var(--success)] border-[color:var(--success)]/30"
                  : "text-destructive border-destructive/30"
              )}
            >
              {connectionStatus === "connected" ? "Connected" : "Error"}
            </Badge>
          </p>
          <p className="text-[11px] text-muted-foreground">
            Last sync:{" "}
            <span className="font-mono text-[color:var(--success)]">Today at 08:00 AM</span>
            {" · "}Interval: every {dmsConfig.syncIntervalMinutes} min
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-[11px] px-2.5 border-border/40 text-muted-foreground hover:text-foreground transition-colors duration-100 shrink-0"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Sync Now
        </Button>
      </div>

      {/* DMS Feed Configuration */}
      <div className="dark-card p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">DMS Feed Configuration</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Connect to your DMS via FTP/SFTP to pull daily inventory updates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">FTP Host</Label>
            <Input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
              placeholder="ftp.yourdms.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Port</Label>
            <Input
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
              placeholder="21"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs text-muted-foreground">File Path</Label>
            <Input
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              className="h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
              placeholder="/exports/inventory.csv"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as DMSFormat)}>
              <SelectTrigger className="h-8 text-xs border-border/40 bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSV" className="text-xs">CSV</SelectItem>
                <SelectItem value="XML" className="text-xs">XML</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs border-border/40 text-muted-foreground hover:text-foreground transition-colors duration-100"
            onClick={handleTestConnection}
            disabled={testState === "testing"}
          >
            {testState === "testing" ? (
              <>
                <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                Testing…
              </>
            ) : testState === "ok" ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1.5 text-[color:var(--success)]" />
                Connection OK
              </>
            ) : testState === "error" ? (
              <>
                <AlertCircle className="w-3 h-3 mr-1.5 text-destructive" />
                Failed
              </>
            ) : (
              "Test Connection"
            )}
          </Button>

          <Button
            size="sm"
            className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100"
            onClick={handleSave}
            disabled={saveState === "saving"}
          >
            {saveState === "saving" ? (
              <>
                <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                Saving…
              </>
            ) : saveState === "saved" ? (
              <>
                <Check className="w-3 h-3 mr-1.5" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-3 h-3 mr-1.5" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      {/* DMS Email Template */}
      <div className="dark-card p-4 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">DMS Access Request Template</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Copy this email to send to your DMS provider to request FTP access.
          </p>
        </div>
        <div className="rounded bg-muted/30 border border-border/30 p-3 relative">
          <pre className="text-[11px] text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed">
            {emailTemplate}
          </pre>
          <button
            onClick={handleCopyEmail}
            className="absolute top-2 right-2 p-1.5 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors duration-100"
            aria-label="Copy email template"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[color:var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Facebook Tab ──────────────────────────────────────────────────────────────

function FacebookTab() {
  const [status, setStatus] = useState<FacebookConnectionStatus>(facebookConnection.status);

  function handleConnect() {
    setStatus("connected");
  }

  function handleDisconnect() {
    setStatus("disconnected");
  }

  const isConnected = status === "connected";
  const isExpired = status === "expired";

  return (
    <div className="space-y-4">
      {/* Connection card */}
      <div
        className={cn(
          "dark-card p-4 space-y-3",
          isConnected && "border-[color:var(--success)]/25",
          isExpired && "border-[color:var(--warning)]/25"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Facebook Connection</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Playwright uses this session to post listings to Facebook Marketplace.
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-[11px] border rounded-full px-2 py-0 leading-5 inline-flex items-center gap-1 shrink-0",
              isConnected
                ? "text-[color:var(--success)] border-[color:var(--success)]/30"
                : isExpired
                ? "text-[color:var(--warning)] border-[color:var(--warning)]/30"
                : "text-muted-foreground border-border/40"
            )}
          >
            {isConnected ? (
              <Wifi className="w-3 h-3" />
            ) : (
              <WifiOff className="w-3 h-3" />
            )}
            {isConnected ? "Connected" : isExpired ? "Session Expired" : "Disconnected"}
          </Badge>
        </div>

        {isConnected && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Account:</span>
              <span className="font-medium text-foreground">{facebookConnection.profileName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Seller ID:</span>
              <span className="font-mono text-foreground/70">{facebookConnection.marketplaceSellerId}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Last verified:</span>
              <span className="text-[color:var(--success)] font-mono text-[11px]">Today</span>
            </div>
            {facebookConnection.captchaTriggered && (
              <div className="flex items-center gap-2 rounded bg-[color:var(--warning)]/8 border border-[color:var(--warning)]/20 px-2.5 py-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[color:var(--warning)] shrink-0" />
                <p className="text-[11px] text-[color:var(--warning)]">
                  CAPTCHA was triggered on the last session check — verify manually.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          {!isConnected ? (
            <Button
              size="sm"
              className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100"
              onClick={handleConnect}
            >
              Connect Facebook Account
            </Button>
          ) : (
            <>
              <a
                href={facebookConnection.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 h-7 text-[11px] px-2.5 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors duration-100"
              >
                <ExternalLink className="w-3 h-3" />
                View Profile
              </a>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-[11px] px-2.5 border-border/40 text-muted-foreground hover:text-foreground transition-colors duration-100"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Security notes */}
      <div className="dark-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[color:var(--success)]" />
          <h3 className="text-sm font-semibold text-foreground">Security & Privacy</h3>
        </div>
        <div className="space-y-2.5">
          {[
            "Your Facebook login session cookies are encrypted at rest using AES-256.",
            "Sessions may expire after 30–60 days — you'll receive an in-app alert to re-authenticate.",
            "Playwright runs headless by default. No human interaction is required during posting runs.",
            "Full Throttle does not store your Facebook password — only session tokens.",
          ].map((note, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Posting Rules Tab ─────────────────────────────────────────────────────────

function PostingRulesTab() {
  const [autoPost, setAutoPost] = useState(postingRules.autoPostEnabled);
  const [maxPerDay, setMaxPerDay] = useState(String(postingRules.maxPostsPerDay));
  const [delay, setDelay] = useState(String(postingRules.delayBetweenPosts));
  const [startHour, setStartHour] = useState(String(postingRules.postingSchedule.startHour));
  const [endHour, setEndHour] = useState(String(postingRules.postingSchedule.endHour));
  const [autoRemoveSold, setAutoRemoveSold] = useState(postingRules.autoRemoveSold);
  const [autoRelist, setAutoRelist] = useState(postingRules.autoRelistExpired);
  const [photoMin, setPhotoMin] = useState(String(postingRules.photoMinimum));
  const [agedThreshold, setAgedThreshold] = useState(String(postingRules.agedThresholdDays));
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 1000);
    setTimeout(() => setSaveState("idle"), 3000);
  }

  function hourLabel(h: number): string {
    if (h === 0) return "12 AM";
    if (h < 12) return `${h} AM`;
    if (h === 12) return "12 PM";
    return `${h - 12} PM`;
  }

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({ value: String(i), label: hourLabel(i) }));

  return (
    <div className="space-y-4">
      {/* Auto-post toggle */}
      <div className="dark-card p-4 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Automatic Posting</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Automatically queue and post new inventory when it arrives from your DMS.
            </p>
          </div>
          <Switch
            checked={autoPost}
            onCheckedChange={setAutoPost}
            className="shrink-0"
          />
        </div>

        <Separator className="border-border/30" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Max posts per day
            </Label>
            <Input
              type="number"
              value={maxPerDay}
              onChange={(e) => setMaxPerDay(e.target.value)}
              className="h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
              min={1}
              max={50}
            />
            <p className="text-[10px] text-muted-foreground/60">
              Facebook may throttle accounts posting more than 50/day
            </p>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Delay between posts (seconds)
            </Label>
            <Input
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              className="h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
              min={30}
            />
            <p className="text-[10px] text-muted-foreground/60">
              Recommended: 60–120s to avoid rate limiting
            </p>
          </div>
        </div>
      </div>

      {/* Posting schedule */}
      <div className="dark-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Posting Schedule</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Start time</Label>
            <Select value={startHour} onValueChange={setStartHour}>
              <SelectTrigger className="h-8 text-xs border-border/40 bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map((h) => (
                  <SelectItem key={h.value} value={h.value} className="text-xs">
                    {h.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">End time</Label>
            <Select value={endHour} onValueChange={setEndHour}>
              <SelectTrigger className="h-8 text-xs border-border/40 bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map((h) => (
                  <SelectItem key={h.value} value={h.value} className="text-xs">
                    {h.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/60">
          Posts will only run between {hourLabel(Number(startHour))} and {hourLabel(Number(endHour))} to maximize buyer visibility.
        </p>
      </div>

      {/* Automation rules */}
      <div className="dark-card p-4 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Automation Rules</h3>

        <div className="space-y-4">
          {/* Auto-remove sold */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">Auto-remove sold listings</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Retire the Marketplace listing when a unit is marked Sold in your DMS.
              </p>
            </div>
            <Switch checked={autoRemoveSold} onCheckedChange={setAutoRemoveSold} className="shrink-0" />
          </div>

          <Separator className="border-border/30" />

          {/* Auto-relist expired */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">Auto-relist expired listings</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Re-post listings that have expired or been removed by Facebook after 30 days.
              </p>
            </div>
            <Switch checked={autoRelist} onCheckedChange={setAutoRelist} className="shrink-0" />
          </div>

          <Separator className="border-border/30" />

          {/* Photo minimum */}
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">Photo minimum</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Units with fewer photos will be skipped and flagged as Post Failed.
              </p>
            </div>
            <div className="w-20 shrink-0">
              <Input
                type="number"
                value={photoMin}
                onChange={(e) => setPhotoMin(e.target.value)}
                className="h-8 text-xs text-right bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
                min={1}
                max={10}
              />
            </div>
          </div>

          <Separator className="border-border/30" />

          {/* Aged threshold */}
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">Aged unit threshold (days)</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Re-post units that have been on lot this many days without a sale.
              </p>
            </div>
            <div className="w-20 shrink-0">
              <Input
                type="number"
                value={agedThreshold}
                onChange={(e) => setAgedThreshold(e.target.value)}
                className="h-8 text-xs text-right bg-muted/30 border-border/40 focus-visible:ring-primary/40 font-mono"
                min={14}
                max={180}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="dark-card p-4 space-y-3 border-destructive/20">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
          <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
        </div>
        <div className="flex items-center justify-between gap-4 p-3 rounded bg-destructive/5 border border-destructive/15">
          <div>
            <p className="text-xs font-medium text-foreground">Remove all active listings</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Retire every active Marketplace listing. This cannot be undone.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-[11px] px-2.5 border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors duration-100 shrink-0"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Remove All
          </Button>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button
          size="sm"
          className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100"
          onClick={handleSave}
          disabled={saveState === "saving"}
        >
          {saveState === "saving" ? (
            <>
              <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
              Saving…
            </>
          ) : saveState === "saved" ? (
            <>
              <Check className="w-3 h-3 mr-1.5" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-3 h-3 mr-1.5" />
              Save Rules
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div className="p-[var(--content-padding)] space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground uppercase">
          Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure DMS integration, Facebook connection, and automation rules
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dms" className="space-y-4">
        <TabsList className="h-8 bg-muted/30 border border-border/40 p-0.5 rounded-lg">
          <TabsTrigger value="dms" className="h-7 text-xs px-3 rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-none">
            DMS Integration
          </TabsTrigger>
          <TabsTrigger value="facebook" className="h-7 text-xs px-3 rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-none">
            Facebook
          </TabsTrigger>
          <TabsTrigger value="rules" className="h-7 text-xs px-3 rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-none">
            Posting Rules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dms">
          <DMSTab />
        </TabsContent>
        <TabsContent value="facebook">
          <FacebookTab />
        </TabsContent>
        <TabsContent value="rules">
          <PostingRulesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
