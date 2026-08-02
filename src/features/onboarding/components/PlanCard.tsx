// features/onboarding/components/PlanCard.tsx
//
// STEP 5 - full replacement for this file. Added a "مشاهده بیشتر" link at
// the bottom that opens the details modal without triggering selection
// (stopPropagation on its own click handler).

import {memo} from "react";
import Image from "next/image";
import type {Plan} from "../models/onboarding.types";

interface PlanCardProps {
    plan: Plan;
    isSelected: boolean;
    onSelect: (planId: string) => void;
    onViewDetails: (planId: string) => void;
}

function PlanCardImpl({plan, isSelected, onSelect, onViewDetails}: PlanCardProps) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onSelect(plan.id)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(plan.id)}
            className={`flex w-full cursor-pointer flex-col gap-2 rounded-2xl border p-3 text-right transition-colors ${
                isSelected
                    ? "border-primary bg-primary-bg/40"
                    : "border-border hover:border-border-strong"
            }`}
        >
            <div className="flex items-center gap-4">

          <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-primary" : "border-border-strong"
              }`}
          >
          {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary"/>}
        </span>
                <div className="flex flex-1 flex-col gap-1">
                    <span className="font-semibold text-text-primary">{plan.title}</span>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation(); // don't trigger the card's onSelect
                            onViewDetails(plan.id);
                        }}
                        className="self-start text-xs font-medium text-primary hover:text-primary-hover"
                    >
                        مشاهده توضیحات
                    </button>
                </div>

                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface">
                    <Image src={plan.imageSrc} alt="" fill sizes="80px" className="object-cover"/>
                </div>
            </div>
        </div>
    );
}

export const PlanCard = memo(PlanCardImpl);