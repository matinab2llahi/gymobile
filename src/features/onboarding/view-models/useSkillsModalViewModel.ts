// features/onboarding/view-models/useSkillsModalViewModel.ts

import { useMemo } from "react";
import { useOnboardingStore } from "../stores/onboarding-store";

export function useSkillsModalViewModel() {
  const isOpen = useOnboardingStore((s) => s.isSkillsModalOpen);
  const skills = useOnboardingStore((s) => s.skills);
  const isLoadingSkills = useOnboardingStore((s) => s.isLoadingSkills);
  const selectedSkillIds = useOnboardingStore((s) => s.selectedSkillIds);
  const searchQuery = useOnboardingStore((s) => s.skillSearchQuery);

  const setSearchQuery = useOnboardingStore((s) => s.setSkillSearchQuery);
  const toggleSkill = useOnboardingStore((s) => s.toggleSkill);
  const removeSkill = useOnboardingStore((s) => s.removeSkill);
  const closeModal = useOnboardingStore((s) => s.closeSkillsModal);

  const selectedSkills = useMemo(
    () => skills.filter((skill) => selectedSkillIds.includes(skill.id)),
    [skills, selectedSkillIds]
  );

  // Skills that are not selected yet, filtered by the search query.
  // Selected ones move up to the "Selected" row instead of staying in this list.
  const availableSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return skills
      .filter((skill) => !selectedSkillIds.includes(skill.id))
      .filter((skill) => (query ? skill.label.toLowerCase().includes(query) : true));
  }, [skills, selectedSkillIds, searchQuery]);

  return {
    isOpen,
    isLoadingSkills,
    searchQuery,
    selectedSkills,
    availableSkills,
    onSearchChange: setSearchQuery,
    onToggleSkill: toggleSkill,
    onRemoveSkill: removeSkill,
    onClose: closeModal,
  };
}
