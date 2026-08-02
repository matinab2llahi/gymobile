import { useMemo } from "react";
import { useOnboardingStore } from "../stores/onboarding-store";
import { MAX_BIO_LENGTH } from "../models/onboarding.types";

export function useProfileStepViewModel() {
  const username = useOnboardingStore((s) => s.username);
  const bio = useOnboardingStore((s) => s.bio);
  const avatarPreviewUrl = useOnboardingStore((s) => s.avatarPreviewUrl);
  const skills = useOnboardingStore((s) => s.skills);
  const selectedSkillIds = useOnboardingStore((s) => s.selectedSkillIds);
  const isSubmitting = useOnboardingStore((s) => s.isSubmitting);
  const error = useOnboardingStore((s) => s.error);

  const setUsername = useOnboardingStore((s) => s.setUsername);
  const setBio = useOnboardingStore((s) => s.setBio);
  const setAvatarFile = useOnboardingStore((s) => s.setAvatarFile);
  const removeAvatar = useOnboardingStore((s) => s.removeAvatar);
  const loadSkills = useOnboardingStore((s) => s.loadSkills);
  const openSkillsModal = useOnboardingStore((s) => s.openSkillsModal);
  const goBackToPlanStep = useOnboardingStore((s) => s.goBackToPlanStep);
  const submitProfile = useOnboardingStore((s) => s.submitProfile);

  // Only recomputed when the two arrays actually change, not on every render
  const selectedSkills = useMemo(
    () => skills.filter((skill) => selectedSkillIds.includes(skill.id)),
    [skills, selectedSkillIds]
  );

  const handleOpenSkillsModal = () => {
    loadSkills(); // no-op if already loaded, see store
    openSkillsModal();
  };

  return {
    username,
    bio,
    bioMaxLength: MAX_BIO_LENGTH,
    avatarPreviewUrl,
    selectedSkills,
    isSubmitting,
    error,
    onUsernameChange: setUsername,
    onBioChange: setBio,
    onAvatarChange: setAvatarFile,
    onAvatarRemove: removeAvatar,
    onOpenSkillsModal: handleOpenSkillsModal,
    onBack: goBackToPlanStep,
    onSubmit: submitProfile,
  };
}
