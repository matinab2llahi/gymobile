// features/onboarding/components/SkillPill.tsx

import { memo } from "react";
import { Plus } from "lucide-react";
import type { Skill } from "../models/onboarding.types";

interface SkillPillProps {
  skill: Skill;
  onSelect: (skillId: string) => void;
}

function SkillPillImpl({ skill, onSelect }: SkillPillProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(skill.id)}
      className="flex items-center justify-between gap-2 rounded-xl border border-border
                 px-3 py-2.5 text-sm text-text-primary transition-colors hover:border-primary hover:bg-primary-bg/30"
    >
      {skill.label}
      <Plus className="h-4 w-4 shrink-0 text-text-muted" />
    </button>
  );
}

export const SkillPill = memo(SkillPillImpl);
