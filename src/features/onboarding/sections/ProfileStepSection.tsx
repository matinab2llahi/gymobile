import { useProfileStepViewModel } from "../view-models/useProfileStepViewModel";
import { useOnboardingStore } from "../stores/onboarding-store";
import { AvatarUploader } from "../components/AvatarUploader";
import { UsernameField } from "../components/UsernameField";
import { BioField } from "../components/BioField";
import { SkillsField } from "../components/SkillsField";
import { SkillsModal } from "../components/SkillsModal";
import {PrimaryButton} from "@/components/PrimaryButton/PrimaryButton";
import {BackLink} from "@/components/auth/BackLink/BackLink";
import {HeaderForm} from "@/components/auth/HeaderForm/HeaderForm";

export function ProfileStepSection() {
  const {
    username,
    bio,
    bioMaxLength,
    avatarPreviewUrl,
    selectedSkills,
    isSubmitting,
    error,
    onUsernameChange,
    onBioChange,
    onAvatarChange,
    onOpenSkillsModal,
    onBack,
    onSubmit,
  } = useProfileStepViewModel();

  const isSkillsModalOpen = useOnboardingStore((s) => s.isSkillsModalOpen);

  return (
    <div dir={"rtl"} className="flex w-full max-w-sm flex-col gap-6">
      <BackLink onClick={onBack} />

        <HeaderForm className={"items-center"} title={"پروفایل خود را کامل کنید"} description={" برای شروع، کمی درباره خودتان اطلاعات وارد کنید."}/>

      <AvatarUploader previewUrl={avatarPreviewUrl} onChange={onAvatarChange} />

      <UsernameField value={username} onChange={onUsernameChange} />
      <BioField value={bio} maxLength={bioMaxLength} onChange={onBioChange} />
      <SkillsField selectedSkills={selectedSkills} onOpen={onOpenSkillsModal} />

      {error && <p className="text-sm text-danger-text">{error}</p>}

      <PrimaryButton onClick={onSubmit} isLoading={isSubmitting}>
        تایید
      </PrimaryButton>

      {isSkillsModalOpen && <SkillsModal />}
    </div>
  );
}
