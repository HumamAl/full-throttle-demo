"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ImageIcon, ExternalLink, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { units } from "@/data/mock-data";
import type { Unit, UnitStatus } from "@/lib/types";

// ── Status badge ──────────────────────────────────────────────────────────────

function UnitStatusBadge({ status }: { status: UnitStatus }) {
  const config: Record<UnitStatus, { label: string; color: string }> = {
    "Posted":        { label: "Posted",        color: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/25" },
    "Relisted":      { label: "Relisted",       color: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-[color:var(--success)]/25" },
    "In Stock":      { label: "In Stock",       color: "text-[color:var(--chart-4)] bg-[color:var(--chart-4)]/10 border-[color:var(--chart-4)]/25" },
    "Queued":        { label: "Queued",         color: "text-[color:var(--primary)] bg-[color:var(--primary)]/10 border-[color:var(--primary)]/25" },
    "Posting":       { label: "Posting…",       color: "text-[color:var(--primary)] bg-[color:var(--primary)]/10 border-[color:var(--primary)]/25 animate-pulse" },
    "Post Failed":   { label: "Post Failed",    color: "text-destructive bg-destructive/10 border-destructive/25" },
    "Aged":          { label: "Aged",           color: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/25" },
    "Pending Recon": { label: "Pending Recon",  color: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-[color:var(--warning)]/25" },
    "Sold":          { label: "Sold",           color: "text-muted-foreground bg-muted/40 border-border/30" },
    "Wholesale":     { label: "Wholesale",      color: "text-muted-foreground bg-muted/40 border-border/30" },
  };
  const c = config[status] ?? { label: status, color: "text-muted-foreground bg-muted/40 border-border/30" };
  return (
    <Badge variant="outline" className={cn("text-[11px] font-medium border rounded-full px-2 py-0 whitespace-nowrap leading-5", c.color)}>
      {c.label}
    </Badge>
  );
}

// ── Sort types ────────────────────────────────────────────────────────────────

type SortKey = "stockNumber" | "price" | "daysOnLot" | "year";

function sortUnits(data: Unit[], key: SortKey, dir: "asc" | "desc"): Unit[] {
  return [...data].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
    return 0;
  });
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("stockNumber");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [localUnits, setLocalUnits] = useState<Unit[]>(units);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = localUnits.filter((u) => {
      const matchSearch =
        q === "" ||
        u.make.toLowerCase().includes(q) ||
        u.model.toLowerCase().includes(q) ||
        u.stockNumber.toLowerCase().includes(q) ||
        u.vin.toLowerCase().includes(q) ||
        (u.trim?.toLowerCase().includes(q) ?? false);
      const matchStatus = statusFilter === "all" || u.status === statusFilter;
      const matchType = typeFilter === "all" || u.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
    return sortUnits(filtered, sortKey, sortDir);
  }, [search, statusFilter, typeFilter, sortKey, sortDir, localUnits]);

  function queueUnit(unitId: string) {
    setLocalUnits((prev) =>
      prev.map((u) => (u.id === unitId ? { ...u, status: "Queued" as UnitStatus } : u))
    );
  }

  function cancelQueue(unitId: string) {
    setLocalUnits((prev) =>
      prev.map((u) => (u.id === unitId ? { ...u, status: "In Stock" as UnitStatus } : u))
    );
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 inline ml-0.5 opacity-80" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-0.5 opacity-80" />
    );
  }

  const statusOptions = [
    "In Stock", "Queued", "Posting", "Posted", "Relisted",
    "Post Failed", "Aged", "Pending Recon", "Sold", "Wholesale",
  ];

  const typeOptions = ["Motorcycle", "ATV", "UTV", "PWC", "Snowmobile"];

  const onLotCount = localUnits.filter(
    (u) => u.status !== "Sold" && u.status !== "Wholesale"
  ).length;

  return (
    <div className="p-[var(--content-padding)] space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground uppercase">
              Inventory
            </h1>
            <Badge
              variant="outline"
              className="text-[11px] font-mono border-border/40 text-muted-foreground px-2 py-0 leading-5 rounded-full"
            >
              {onLotCount} units on lot
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            All dealership units — manage Facebook Marketplace listing status
          </p>
        </div>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100 text-xs h-8"
          onClick={() =>
            setLocalUnits((prev) =>
              prev.map((u) =>
                u.status === "In Stock" ? { ...u, status: "Queued" as UnitStatus } : u
              )
            )
          }
        >
          <Zap className="w-3.5 h-3.5 mr-1.5" />
          Queue All In Stock
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search make, model, stock #, VIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-muted/30 border-border/40 focus-visible:ring-primary/40"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-8 text-xs border-border/40 bg-muted/30">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Status</SelectItem>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-32 h-8 text-xs border-border/40 bg-muted/30">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All Types</SelectItem>
            {typeOptions.map((t) => (
              <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {displayed.length} {displayed.length === 1 ? "unit" : "units"}
        </span>
      </div>

      {/* Table */}
      <div className="dark-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/40 hover:bg-transparent">
                <TableHead className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider w-12 px-3 py-2.5">
                  Photo
                </TableHead>
                <TableHead className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider py-2.5">
                  Vehicle
                </TableHead>
                <TableHead
                  className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors duration-100 py-2.5"
                  onClick={() => handleSort("stockNumber")}
                >
                  Stock # <SortIcon col="stockNumber" />
                </TableHead>
                <TableHead className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider py-2.5">
                  Type
                </TableHead>
                <TableHead
                  className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors duration-100 text-right py-2.5"
                  onClick={() => handleSort("price")}
                >
                  Price <SortIcon col="price" />
                </TableHead>
                <TableHead className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider py-2.5">
                  Status
                </TableHead>
                <TableHead
                  className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors duration-100 py-2.5"
                  onClick={() => handleSort("daysOnLot")}
                >
                  Days on Lot <SortIcon col="daysOnLot" />
                </TableHead>
                <TableHead className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-right pr-4 py-2.5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-28 text-center text-sm text-muted-foreground"
                  >
                    No units match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((unit) => (
                  <TableRow
                    key={unit.id}
                    className="border-b border-border/20 hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                  >
                    {/* Photo */}
                    <TableCell className="px-3 py-2 w-12">
                      <div className="w-10 h-8 rounded bg-muted/40 border border-border/30 flex items-center justify-center shrink-0">
                        <ImageIcon
                          className={cn(
                            "w-3.5 h-3.5",
                            unit.photos.length === 0
                              ? "text-destructive/50"
                              : "text-muted-foreground/40"
                          )}
                        />
                      </div>
                    </TableCell>

                    {/* Vehicle */}
                    <TableCell className="py-2 min-w-[180px]">
                      <div className="font-medium text-sm text-foreground">
                        {unit.year} {unit.make} {unit.model}
                      </div>
                      {unit.trim && (
                        <div className="text-[11px] text-muted-foreground">{unit.trim}</div>
                      )}
                      <div className="text-[11px] text-muted-foreground/60 font-mono">
                        {unit.condition} · {unit.mileage.toLocaleString()} {unit.mileageUnit}
                      </div>
                    </TableCell>

                    {/* Stock # */}
                    <TableCell className="py-2">
                      <span className="font-mono text-xs text-foreground/70">
                        {unit.stockNumber}
                      </span>
                    </TableCell>

                    {/* Type */}
                    <TableCell className="py-2">
                      <span className="text-xs text-muted-foreground">{unit.type}</span>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="py-2 text-right">
                      <span className="font-mono text-sm font-medium text-foreground tabular-nums">
                        ${unit.price.toLocaleString()}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-2">
                      <UnitStatusBadge status={unit.status} />
                    </TableCell>

                    {/* Days on Lot */}
                    <TableCell className="py-2">
                      <span
                        className={cn(
                          "font-mono text-xs tabular-nums",
                          unit.daysOnLot >= 60
                            ? "text-[color:var(--warning)] font-semibold"
                            : unit.daysOnLot >= 30
                            ? "text-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {unit.daysOnLot}d
                        {unit.daysOnLot >= 60 && (
                          <span className="ml-1 text-[10px] opacity-70">⚠</span>
                        )}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-2 text-right pr-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {unit.status === "In Stock" && (
                          <Button
                            size="sm"
                            className="h-6 text-[11px] px-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-100"
                            onClick={() => queueUnit(unit.id)}
                          >
                            Queue Post
                          </Button>
                        )}
                        {unit.status === "Post Failed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-[11px] px-2.5 border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors duration-100"
                            onClick={() => queueUnit(unit.id)}
                          >
                            Retry
                          </Button>
                        )}
                        {(unit.status === "Posted" ||
                          unit.status === "Relisted" ||
                          unit.status === "Aged") &&
                          unit.fbListingUrl && (
                            <a
                              href={unit.fbListingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 h-6 text-[11px] px-2.5 rounded border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors duration-100"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View
                            </a>
                          )}
                        {unit.status === "Queued" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-[11px] px-2.5 border-border/40 text-muted-foreground hover:text-foreground transition-colors duration-100"
                            onClick={() => cancelQueue(unit.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
