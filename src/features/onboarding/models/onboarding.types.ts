// features/onboarding/models/onboarding.types.ts

export type OnboardingStep = "plan" | "profile";

export const ONBOARDING_STEPS: OnboardingStep[] = ["plan", "profile"];
export const MAX_BIO_LENGTH = 150;
export const MAX_AVATAR_SIZE_MB = 10;
export const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

export interface Plan {
  id: string;
  title: string;
  description: string; // short text, shown on the card
  longDescription: string; // full text, shown in the modal
  imageSrc: string;
}


export interface Skill {
  id: string;
  label: string;
}

export interface OnboardingProfilePayload {
  planId: string;
  username: string;
  bio: string;
  skillIds: string[];
  avatarFile: File | null;
}
