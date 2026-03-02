import { ExternalLink, TrendingUp } from "lucide-react";
import { proposalData } from "@/data/proposal";

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ── Section 1: Hero (Project Brief) ─────────────────────────────── */}
      <section
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "oklch(0.08 0.015 var(--primary-h, 42))" }}
      >
        {/* Radial highlight — orange warmth at top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.68 0.20 42 / 0.10) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 px-8 pt-10 pb-6">

          {/* Effort badge — mandatory */}
          <span
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase border px-3 py-1 rounded-full mb-7"
            style={{
              borderColor: "oklch(0.68 0.20 42 / 0.30)",
              background: "oklch(0.68 0.20 42 / 0.08)",
              color: "oklch(0.85 0.06 42)",
            }}
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[color:var(--primary)]" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--primary)]" />
            </span>
            {proposalData.hero.badge}
          </span>

          {/* Role prefix */}
          <p
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: "oklch(0.55 0.05 42)" }}
          >
            Browser Automation · Full-Stack Developer
          </p>

          {/* Weight-contrast headline */}
          <h1 className="text-5xl md:text-6xl tracking-tight leading-none mb-5">
            <span className="font-light" style={{ color: "oklch(0.75 0.01 42)" }}>
              Hi, I&apos;m{" "}
            </span>
            <span className="font-black text-white">
              {proposalData.hero.name}
            </span>
          </h1>

          {/* Tailored value prop */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "oklch(0.68 0.02 42)" }}
          >
            {proposalData.hero.valueProp}
          </p>
        </div>

        {/* Stats shelf */}
        <div
          className="relative z-10 px-8 py-4 grid grid-cols-3 gap-4"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 0.08)",
            background: "oklch(1 0 0 / 0.03)",
          }}
        >
          {proposalData.hero.stats.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-2xl font-bold"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.68 0.20 42), oklch(0.78 0.12 55))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "oklch(0.50 0.02 42)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Proof of Work ─────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Proof of Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {proposalData.portfolioProjects.map((project) => (
            <div key={project.name} className="dark-card-glow p-5 space-y-3">
              {/* Title + external link */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground leading-snug">
                  {project.name}
                </h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors duration-150"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Outcome badge */}
              <div
                className="flex items-start gap-2 text-sm"
                style={{ color: "color-mix(in oklch, var(--success) 85%, white)" }}
              >
                <TrendingUp className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{project.outcome}</span>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono rounded"
                    style={{
                      background: "oklch(0.68 0.20 42 / 0.10)",
                      color: "oklch(0.75 0.12 42)",
                      border: "1px solid oklch(0.68 0.20 42 / 0.18)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Relevance note */}
              {project.relevance && (
                <p
                  className="text-xs italic leading-relaxed"
                  style={{ color: "oklch(0.68 0.20 42 / 0.70)" }}
                >
                  {project.relevance}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Process
          </p>
          <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {proposalData.approach.map((step) => (
            <div key={step.step} className="dark-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.68 0.20 42)" }}
                >
                  {step.step}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "oklch(0.45 0.02 42)" }}
                >
                  {step.timeline}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Skills Grid ────────────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Tech Stack
          </p>
          <h2 className="text-2xl font-bold tracking-tight">What I Build With</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {proposalData.skills.map((category) => (
            <div key={category.category} className="dark-card p-4 space-y-2.5">
              <p
                className="text-xs font-mono tracking-wide uppercase"
                style={{ color: "oklch(0.50 0.04 42)" }}
              >
                {category.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono rounded"
                    style={{
                      background: "oklch(1 0 0 / 0.05)",
                      color: "oklch(0.78 0.04 42)",
                      border: "1px solid oklch(1 0 0 / 0.10)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: CTA ───────────────────────────────────────────────── */}
      <section
        className="relative rounded-2xl overflow-hidden text-center"
        style={{ background: "oklch(0.07 0.012 var(--primary-h, 42))" }}
      >
        {/* Subtle glow at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom, oklch(0.68 0.20 42 / 0.08) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 px-8 py-12 space-y-5">

          {/* Pulsing availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[color:var(--success)]" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
            </span>
            <span
              className="text-sm"
              style={{
                color: "color-mix(in oklch, var(--success) 80%, white)",
              }}
            >
              {proposalData.cta.availability}
            </span>
          </div>

          {/* Headline — tailored to this job */}
          <h2 className="text-2xl font-bold text-white max-w-xl mx-auto leading-snug">
            {proposalData.cta.headline}
          </h2>

          {/* Body — specific to this demo */}
          <p
            className="max-w-lg mx-auto leading-relaxed"
            style={{ color: "oklch(0.60 0.02 42)" }}
          >
            {proposalData.cta.body}
          </p>

          {/* Primary action — text, not a dead link */}
          <p className="text-lg font-semibold text-white pt-2">
            {proposalData.cta.action}
          </p>

          {/* Back to demo */}
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground/70 transition-colors duration-150"
          >
            ← Back to the demo
          </a>

          {/* Signature */}
          <p
            className="text-sm pt-4 mt-2"
            style={{
              color: "oklch(0.38 0.02 42)",
              borderTop: "1px solid oklch(1 0 0 / 0.08)",
            }}
          >
            — Humam
          </p>
        </div>
      </section>

    </div>
  );
}
