"use client";

import Link from "next/link";

export function CtaCloser() {
  return (
    <section
      className="rounded-lg p-5"
      style={{
        background: "oklch(0.12 0.010 42)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
        boxShadow: "0 0 20px color-mix(in oklch, var(--primary) 8%, transparent)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Ready to discuss the approach?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            I&apos;ve thought through the Playwright edge cases, the DOM fallback chains,
            and the DMS sync flow. Happy to walk through any of this on a call.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            See the proposal →
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background: "color-mix(in oklch, var(--primary) 12%, transparent)",
              border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)",
              color: "var(--primary)",
              boxShadow: "0 0 8px color-mix(in oklch, var(--primary) 15%, transparent)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}
