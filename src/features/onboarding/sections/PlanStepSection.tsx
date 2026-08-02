import { usePlanStepViewModel } from "../view-models/usePlanStepViewModel";
import { PlanCard } from "../components/PlanCard";
import { PlanDetailsModal } from "../components/PlanDetailsModal";
import {PrimaryButton} from "@/components/PrimaryButton/PrimaryButton";
import {HeaderForm} from "@/components/HeaderForm/HeaderForm";
import PlanCardsSkeleton from "@/features/onboarding/components/PlanCardsSkeleton";

export function PlanStepSection() {
    const {
        plans,
        isLoadingPlans,
        selectedPlanId,
        viewingPlan,
        error,
        onSelectPlan,
        onViewDetails,
        onCloseDetails,
        onSelectFromModal,
        onNext,
    } = usePlanStepViewModel();

    return (
        <div dir={"rtl"} className="flex w-full max-w-sm flex-col gap-6">
            <HeaderForm title={"پلن خود را انتخاب کنید"} description={"پلنی که با هدف شما هماهنگ است را انتخاب کنید."} />

            <div className="flex flex-col gap-3">
                {isLoadingPlans || plans.length === 0 ? (
                    <PlanCardsSkeleton/>
                ) : (
                    plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            isSelected={plan.id === selectedPlanId}
                            onSelect={onSelectPlan}
                            onViewDetails={onViewDetails}
                        />
                    ))
                )}
            </div>

            {error && <p className="text-sm text-danger-text">{error}</p>}

            <PrimaryButton onClick={onNext} disabled={!selectedPlanId}>
                ادامه
            </PrimaryButton>

            {viewingPlan && (
                <PlanDetailsModal
                    plan={viewingPlan}
                    isSelected={viewingPlan.id === selectedPlanId}
                    onClose={onCloseDetails}
                    onSelect={onSelectFromModal}
                />
            )}
        </div>
    );
}