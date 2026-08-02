// features/onboarding/view-models/usePlanStepViewModel.ts
//
// STEP 4 - full replacement for this file (adds viewingPlan + handlers
// for the details modal, everything else is unchanged).

import { useEffect, useMemo } from "react";
import { useOnboardingStore } from "../stores/onboarding-store";

export function usePlanStepViewModel() {
  const plans = useOnboardingStore((s) => s.plans);
  const isLoadingPlans = useOnboardingStore((s) => s.isLoadingPlans);
  const selectedPlanId = useOnboardingStore((s) => s.selectedPlanId);
  const viewingPlanId = useOnboardingStore((s) => s.viewingPlanId);
  const error = useOnboardingStore((s) => s.error);

  const loadPlans = useOnboardingStore((s) => s.loadPlans);
  const selectPlan = useOnboardingStore((s) => s.selectPlan);
  const goToProfileStep = useOnboardingStore((s) => s.goToProfileStep);
  const openPlanDetails = useOnboardingStore((s) => s.openPlanDetails);
  const closePlanDetails = useOnboardingStore((s) => s.closePlanDetails);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  // Only recomputed when the list or the open modal's id changes
  const viewingPlan = useMemo(
      () => plans.find((p) => p.id === viewingPlanId) ?? null,
      [plans, viewingPlanId]
  );

  const onSelectFromModal = (planId: string) => {
    selectPlan(planId);
    closePlanDetails();
  };

  return {
    plans,
    isLoadingPlans,
    selectedPlanId,
    viewingPlan,
    error,
    onSelectPlan: selectPlan,
    onViewDetails: openPlanDetails,
    onCloseDetails: closePlanDetails,
    onSelectFromModal,
    onNext: goToProfileStep,
  };
}