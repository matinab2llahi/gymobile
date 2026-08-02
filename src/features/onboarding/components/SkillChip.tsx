// features/onboarding/components/SkillChip.tsx

import { memo } from "react";
import { X } from "lucide-react";
import type { Skill } from "../models/onboarding.types";

interface SkillChipProps {
  skill: Skill;
  onRemove: (skillId: string) => void;
}

function SkillChipImpl({ skill, onRemove }: SkillChipProps) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-primary-bg px-3 py-1.5 text-sm font-medium text-primary">
      {skill.label}
      <button
        type="button"
        onClick={() => onRemove(skill.id)}
        className="rounded-full transition-colors hover:text-primary-active"
        aria-label={`حذف ${skill.label}`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}

export const SkillChip = memo(SkillChipImpl);
