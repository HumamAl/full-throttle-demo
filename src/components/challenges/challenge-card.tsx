import type { ReactNode } from "react";
import { OutcomeStatement } from "./outcome-statement";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  visualization?: ReactNode;
}

export function ChallengeCard({ challenge, index, visualization }: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="dark-card space-y-4 p-5 transition-all duration-200"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-primary/70 w-6 shrink-0 tabular-nums">
            {stepNumber}
          </span>
          <h3 className="text-base font-semibold leading-snug">{challenge.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1.5 pl-[calc(1.5rem+0.75rem)] leading-relaxed">
          {challenge.description}
        </p>
      </div>
      {visualization && (
        <div className="pl-[calc(1.5rem+0.75rem)]">{visualization}</div>
      )}
      <div className="pl-[calc(1.5rem+0.75rem)]">
        <OutcomeStatement outcome={challenge.outcome} index={index} />
      </div>
    </div>
  );
}
