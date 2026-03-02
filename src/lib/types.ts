import type { LucideIcon } from "lucide-react";

// ─── Sidebar navigation ───────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ─── Challenge + Proposal (template-level) ───────────────────────────────────

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ─── Powersport Domain Types ──────────────────────────────────────────────────

export type UnitType = "Motorcycle" | "ATV" | "UTV" | "PWC" | "Snowmobile";

export type UnitCondition = "New" | "Used" | "Certified";

/**
 * Status of a unit with respect to its Facebook Marketplace listing lifecycle.
 * "Aged" = on lot 60+ days without a sale; triggers auto-relist logic.
 * "Pending Recon" = awaiting reconditioning before it can be posted.
 * "Wholesale" = unit bypassed retail and went to wholesale channel.
 */
export type UnitStatus =
  | "In Stock"
  | "Queued"
  | "Posting"
  | "Posted"
  | "Relisted"
  | "Post Failed"
  | "Aged"
  | "Pending Recon"
  | "Sold"
  | "Wholesale";

export interface Unit {
  id: string;
  /** Dealer stock number — format STK-XXXXX */
  stockNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  type: UnitType;
  price: number;
  /** Odometer reading in miles (motorcycles); hours for PWC/snowmobiles */
  mileage: number;
  /** "mi" for motorcycles/ATVs/UTVs, "hrs" for PWC/snowmobiles */
  mileageUnit: "mi" | "hrs";
  condition: UnitCondition;
  status: UnitStatus;
  /** Array of photo URLs or local paths; empty array = 0 photos (edge case) */
  photos: string[];
  description: string;
  color: string;
  /** ISO date string — when unit arrived on lot */
  dateArrived: string;
  /** ISO date string — when unit was first posted to FB Marketplace */
  datePosted?: string | null;
  dateSold?: string | null;
  /** Facebook Marketplace listing ID */
  fbListingId?: string | null;
  fbListingUrl?: string | null;
  /** Days since dateArrived — used for Aged threshold logic */
  daysOnLot: number;
}

// ─── Posting Queue ────────────────────────────────────────────────────────────

export type QueueItemStatus =
  | "queued"
  | "posting"
  | "posted"
  | "failed"
  | "cancelled";

/**
 * Playwright automation failure categories.
 * selector_break = FB changed its DOM; captcha = human-check triggered;
 * session_expired = cookie/auth expired mid-run.
 */
export type PostingErrorType =
  | "selector_break"
  | "captcha"
  | "timeout"
  | "photo_upload"
  | "session_expired"
  | "unknown";

export interface PostingQueueItem {
  id: string;
  /** References Unit.id */
  unitId: string;
  status: QueueItemStatus;
  /** Lower number = higher priority in the run queue */
  priority: number;
  scheduledAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
  retryCount: number;
  maxRetries: number;
  errorMessage?: string | null;
  errorType?: PostingErrorType | null;
}

// ─── Posting Log ──────────────────────────────────────────────────────────────

export type PostingAction = "post" | "relist" | "retire" | "remove";

export type PostingLogStatus = "success" | "failed";

export interface PostingLog {
  id: string;
  /** References Unit.id */
  unitId: string;
  action: PostingAction;
  status: PostingLogStatus;
  timestamp: string;
  /** Automation run duration in milliseconds */
  duration: number;
  errorMessage?: string | null;
  /** Selectors that failed — present when status = "failed" and errorType = "selector_break" */
  selectorsFailed?: string[] | null;
  /** Screenshot URL captured at point of failure */
  screenshotUrl?: string | null;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  unitsOnLot: number;
  unitsOnLotChange: number;
  /** Count of units currently with an active FB Marketplace listing */
  unitsPosted: number;
  unitsPostedChange: number;
  /** Percentage: unitsPosted / unitsOnLot * 100 */
  postingRate: number;
  postingRateChange: number;
  /** Count of items currently in queue (status: queued | posting) */
  postQueueDepth: number;
  postQueueDepthChange: number;
  /** Count of failed postings in the last 7 days */
  postsFailed: number;
  postsFailedChange: number;
  soldToday: number;
  soldTodayChange: number;
  /** Units on lot 60+ days without a sale */
  agedUnits: number;
  agedUnitsChange: number;
  /** Timestamp of last successful DMS feed sync */
  syncFreshness: string;
  /** Timestamp of last completed posting run */
  lastPostTime: string;
}

// ─── Chart Data ───────────────────────────────────────────────────────────────

export interface PostingActivityDataPoint {
  month: string;
  posted: number;
  failed: number;
  relisted: number;
}

export interface UnitsByTypeDataPoint {
  type: UnitType;
  count: number;
  posted: number;
}

// ─── DMS Integration ──────────────────────────────────────────────────────────

export type DMSFormat = "CSV" | "XML";
export type DMSStatus = "connected" | "disconnected" | "error";

export interface DMSConfig {
  /** DMS system name e.g. "Lightspeed EVO", "DX1", "DealerClick" */
  systemName: string;
  host: string;
  port: number;
  username: string;
  /** Path to the exported inventory feed file */
  filePath: string;
  format: DMSFormat;
  /** ISO timestamp of last successful sync */
  lastSync: string;
  status: DMSStatus;
  /** How often the feed auto-syncs, in minutes */
  syncIntervalMinutes: number;
}

// ─── Facebook Connection ──────────────────────────────────────────────────────

export type FacebookConnectionStatus =
  | "connected"
  | "disconnected"
  | "expired";

export interface FacebookConnection {
  status: FacebookConnectionStatus;
  lastVerified: string;
  profileName: string;
  profileUrl: string;
  /** Facebook Marketplace seller account ID */
  marketplaceSellerId: string;
  /** True when a CAPTCHA was triggered on last session check */
  captchaTriggered: boolean;
}

// ─── Posting Rules ────────────────────────────────────────────────────────────

export interface PostingSchedule {
  /** Hour (0-23) to start the posting run each day */
  startHour: number;
  /** Hour (0-23) to stop the posting run */
  endHour: number;
  /** Days of week: 0=Sun, 6=Sat */
  activeDays: number[];
}

export interface PostingRules {
  autoPostEnabled: boolean;
  /** Maximum number of new listings to post per day */
  maxPostsPerDay: number;
  /** Seconds to wait between individual Playwright posting runs */
  delayBetweenPosts: number;
  postingSchedule: PostingSchedule;
  /** Automatically retire listing when unit is marked Sold in DMS */
  autoRemoveSold: boolean;
  /** Automatically relist expired listings */
  autoRelistExpired: boolean;
  /** Minimum number of photos required before a unit can be posted */
  photoMinimum: number;
  /** Re-post units that have been on lot this many days without a sale */
  agedThresholdDays: number;
}
