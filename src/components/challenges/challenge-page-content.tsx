"use client";

import type { ReactNode } from "react";
import { ChallengeList } from "./challenge-list";
import { VizSelectorFallback } from "./viz-selector-fallback";
import { VizSessionManagement } from "./viz-session-management";
import { VizFormBranching } from "./viz-form-branching";

interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <VizSelectorFallback />,
    "challenge-2": <VizSessionManagement />,
    "challenge-3": <VizFormBranching />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
