export interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers wire Playwright selectors directly into posting logic, add a cron job, and call it done. When Facebook changes its DOM — which it does every few weeks — the whole automation silently breaks. Sold units stay unlisted, CAPTCHA prompts go unhandled, and the dealer finds out days later.",
  differentApproach:
    "I build each automation layer with fallback chains, session health checks, and vehicle-type branching — so the system handles the edge cases Facebook will throw at it, not just the happy path.",
  accentWord: "handles the edge cases",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Resilient Facebook Automation — Selectors, Retries, and CAPTCHA Recovery",
    description:
      "Facebook rewrites its Marketplace DOM frequently with no changelog. Hardcoded selectors silently fail, CAPTCHA prompts appear mid-run with no handler, and photo uploads stall on slow connections — each one an unhandled failure path that stops the run cold.",
    outcome:
      "Could reduce posting failures from ~30% to under 5% by implementing a selector registry with fallback chains, exponential retry backoff, and CAPTCHA detection with human-in-the-loop escalation before the session expires.",
  },
  {
    id: "challenge-2",
    title: "Bulletproof Session Management — Persistent Profiles and Re-Auth Handling",
    description:
      "Persistent browser profiles need proper session verification before each run. Checking if the URL isn't /login isn't enough — cookies expire mid-run, Marketplace-specific permissions lapse separately from account login, and a stale session causes silent data corruption in the posting log.",
    outcome:
      "Could eliminate manual re-login interruptions entirely by adding pre-run session health checks, cookie freshness validation, and an automated re-auth flow that keeps the automation running 24/7 without human babysitting.",
  },
  {
    id: "challenge-3",
    title: "Vehicle-Type Form Branching — Motorcycles vs. All Other Powersports",
    description:
      "Motorcycles use a separate Facebook Marketplace category with additional required fields — Mileage (mi), Engine Size, and Transmission. ATVs, UTVs, PWC, and Snowmobiles follow a different field schema. A single automation path can't fill both correctly; it silently submits incomplete listings for the wrong vehicle type.",
    outcome:
      "Could support all 5 vehicle types — Motorcycle, ATV, UTV, PWC, Snowmobile — with zero field-mapping errors by detecting unit type from the DMS feed at runtime and routing to the correct Facebook form field sequence automatically.",
  },
];
