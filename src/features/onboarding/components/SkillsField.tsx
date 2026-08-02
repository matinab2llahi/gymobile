// features/onboarding/components/SkillsField.tsx

import { ChevronLeft, Dumbbell } from "lucide-react";
import type { Skill } from "../models/onboarding.types";

interface SkillsFieldProps {
  selectedSkills: Skill[];
  onOpen: () => void;
}

export function SkillsField({ selectedSkills, onOpen }: SkillsFieldProps) {
  const hasSelection = selectedSkills.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text-primary">مهارت‌ها</label>

      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 rounded-xl border border-border bg-background
                   p-3 text-right transition-colors hover:bg-surface"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-bg">
          <Dumbbell className="h-4 w-4 text-primary" />
        </span>

        <span className="flex-1">
          <span className="block text-sm font-medium text-text-primary">
            {hasSelection ? `${selectedSkills.length} مهارت انتخاب شده` : "افزودن مهارت‌ها"}
          </span>
          <span className="block text-xs text-text-secondary">
            {hasSelection
              ? selectedSkills.map((s) => s.label).join("، ")
              : "مهارت‌هایی که شما را توصیف می‌کنند را انتخاب کنید"}
          </span>
        </span>

        <ChevronLeft className="h-4 w-4 shrink-0 text-text-muted" />
      </button>
    </div>
  );
}
