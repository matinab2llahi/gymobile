import Image from "next/image";
import { Check, X } from "lucide-react";
import type { Plan } from "../models/onboarding.types";

interface PlanDetailsModalProps {
    plan: Plan;
    isSelected: boolean;
    onClose: () => void;
    onSelect: (planId: string) => void;
}

export function PlanDetailsModal({ plan, isSelected, onClose, onSelect }: PlanDetailsModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-xl sm:items-center" dir="rtl">
            <div className={"absolute inset-0 z-10"} onClick={()=>onClose()}></div>
            <div className="absolute bottom-0 sm:bottom-auto top-auto sm:top-1/2 sm:left-1/2 sm:-translate-1/2 z-50 flex max-h-[85vh] w-full sm:max-w-lg flex-col rounded-t-3xl bg-background sm:rounded-3xl">
                {/* Image header */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-3xl">
                    <Image src={plan.imageSrc} alt="" fill sizes="512px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full
                       bg-black/40 text-white transition-colors hover:bg-black/60"
                        aria-label="بستن"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <h2 className="absolute bottom-4 right-4 text-xl font-bold text-white">{plan.title}</h2>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    <p className="text-sm leading-7 text-text-secondary">{plan.longDescription}</p>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row gap-3 border-t border-border p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-border py-3.5 font-medium text-text-primary
                       transition-colors hover:bg-surface"
                    >
                        بستن
                    </button>
                    <button
                        type="button"
                        onClick={() => onSelect(plan.id)}
                        className="flex-1 rounded-xl bg-primary py-3.5 font-medium text-text-on-primary
                       transition-colors hover:bg-primary-hover active:bg-primary-active"
                    >
                        {isSelected ? "پلن انتخاب شده" : "انتخاب این پلن"}
                    </button>
                </div>
            </div>
        </div>
    );
}