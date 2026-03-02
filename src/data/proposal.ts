export const proposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "Full-stack developer specializing in browser automation and desktop tools — from resilient Playwright scripts to production ops dashboards, and I've already built one for your review in Tab 1.",
    badge: "Built this demo for your project",
    stats: [
      { value: "24+", label: "Projects Shipped" },
      { value: "< 48hr", label: "Demo Turnaround" },
      { value: "15+", label: "Industries Served" },
    ],
  },

  portfolioProjects: [
    {
      name: "DealerHub — Automotive SaaS",
      description:
        "Multi-tenant automotive dealership platform with vehicle inventory management, AI-powered lead scoring, appraisals, and reconditioning pipeline tracking.",
      outcome:
        "Full dealership ops platform — inventory, leads, appraisals, and reconditioning all in one place",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
      url: "https://dealer-platform-neon.vercel.app",
      relevance:
        "Exact domain match — powersport dealership inventory and ops are a direct parallel to this automotive SaaS.",
    },
    {
      name: "eBay Pokemon Monitor",
      description:
        "eBay Browse API monitoring tool that watches listings in real time, triggers Discord webhook alerts on new matches, and tracks price trends over time.",
      outcome:
        "Real-time listing monitor with webhook-based Discord alerts and price trend tracking",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      url: "https://ebay-pokemon-monitor.vercel.app",
      relevance:
        "Core pattern match — polling a third-party platform on a schedule and acting on state changes is exactly what the Playwright automation does.",
    },
    {
      name: "WMF Agent Dashboard",
      description:
        "AI-powered customer service agent for Windsor Metal Finishing. Email classification, RFQ data extraction with confidence scoring, and human-in-the-loop approval workflow — all built around a fragile multi-step automation that had to be resilient.",
      outcome:
        "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
      tech: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "shadcn/ui",
        "Claude API",
        "n8n",
        "Microsoft Graph",
      ],
      url: "https://wmf-agent-dashboard.vercel.app",
      relevance:
        "Built for resilience — the pipeline had to survive email format variations, missing fields, and session state. Same class of problem as Playwright edge cases.",
    },
    {
      name: "Fleet Maintenance SaaS",
      description:
        "Fleet and maintenance management platform with asset tracking, work orders, preventive maintenance scheduling, inspections, parts inventory, and analytics dashboard.",
      outcome:
        "6-module SaaS covering the full maintenance lifecycle — from asset registry to work orders to parts inventory",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
      url: null,
      relevance:
        "Vehicle assets and ops tooling — the data model and workflow patterns transfer directly to powersport inventory management.",
    },
  ],

  approach: [
    {
      step: "01",
      title: "Audit Playwright Flows",
      description:
        "Map every selector, wait, and error path in the existing automation. Identify which selectors are hardcoded vs. role-based, where the timeouts are too tight, and which vehicle-type branches diverge. One session of careful reading surfaces 80% of the fragility.",
      timeline: "Day 1-2",
    },
    {
      step: "02",
      title: "Build Resilient Selectors",
      description:
        "Replace brittle CSS selectors with fallback chains: try aria-label first, then role + text, then data-testid as a last resort. Add retry wrappers with exponential backoff around flaky click targets. FB Marketplace's DOM shifts — the selectors need to survive it.",
      timeline: "Day 3-5",
    },
    {
      step: "03",
      title: "Harden Edge Cases",
      description:
        "CAPTCHA detection with graceful pause + alert rather than silent failure. Session expiry recovery without losing queue position. Photo upload retries with upload-count verification. Vehicle-type form branching validated against each of the 5 powersport categories.",
      timeline: "Week 2",
    },
    {
      step: "04",
      title: "Test Across Vehicle Types",
      description:
        "Validate all 5 categories — Motorcycle, ATV, UTV, PWC, Snowmobile — against real FB Marketplace forms. Each type hits different form fields; the automation needs to handle all of them without manual intervention. End state: a posting run that completes unattended.",
      timeline: "Week 2-3",
    },
  ],

  skills: [
    {
      category: "Automation",
      items: [
        "Playwright",
        "Browser Automation",
        "Facebook Marketplace",
        "CAPTCHA Handling",
        "Retry Logic",
      ],
    },
    {
      category: "Runtime & Language",
      items: ["Node.js", "TypeScript", "Zod"],
    },
    {
      category: "Desktop & Native",
      items: ["Tauri", "Svelte"],
    },
    {
      category: "Backend & Data",
      items: ["PostgreSQL", "Prisma", "WebSocket"],
    },
  ],

  cta: {
    headline:
      "Ready to make your posting automation run unattended across all 5 vehicle types.",
    body: "The demo in Tab 1 shows the dashboard side. The real work is in the Playwright layer — and I've already mapped the audit approach above. Reply on Upwork and we'll scope the hardening sprint.",
    action: "Reply on Upwork to start",
    availability: "Currently available for new projects",
  },
};
