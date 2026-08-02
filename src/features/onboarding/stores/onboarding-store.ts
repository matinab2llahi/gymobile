// features/onboarding/stores/onboarding-store.ts

import { create } from "zustand";
import { onboardingService } from "../services/onboarding.service";
import {
  MAX_BIO_LENGTH,
  type OnboardingStep,
  type Plan,
  type Skill,
} from "../models/onboarding.types";

const MIN_USERNAME_LENGTH = 3;

interface OnboardingState {
  // --- navigation ---
  step: OnboardingStep;

  // --- plan step ---
  plans: Plan[];
  isLoadingPlans: boolean;
  selectedPlanId: string | null;

  // --- profile step ---
  username: string;
  bio: string;
  avatarFile: File | null;
  avatarPreviewUrl: string | null;

  // --- skills (shared with the modal) ---
  skills: Skill[];
  isLoadingSkills: boolean;
  selectedSkillIds: string[];
  skillSearchQuery: string;
  isSkillsModalOpen: boolean;


  // --- submission ---
  isSubmitting: boolean;
  error: string | null;
  isCompleted: boolean;

  viewingPlanId: string | null;
openPlanDetails: (planId: string) => void;
closePlanDetails: () => void;

  // --- derived ---
  isPlanStepValid: () => boolean;
  isProfileStepValid: () => boolean;

  // --- actions ---
  loadPlans: () => Promise<void>;
  selectPlan: (planId: string) => void;
  goToProfileStep: () => void;
  goBackToPlanStep: () => void;

  loadSkills: () => Promise<void>;
  openSkillsModal: () => void;
  closeSkillsModal: () => void;
  setSkillSearchQuery: (query: string) => void;
  toggleSkill: (skillId: string) => void;
  removeSkill: (skillId: string) => void;

  setUsername: (value: string) => void;
  setBio: (value: string) => void;
  setAvatarFile: (file: File | null) => void;
  removeAvatar: () => void;

  submitProfile: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  viewingPlanId : null,
  step: "plan" as OnboardingStep,

  plans: [] as Plan[],
  isLoadingPlans: false,
  selectedPlanId: null as string | null,

  username: "",
  bio: "",
  avatarFile: null as File | null,
  avatarPreviewUrl: null as string | null,

  skills: [] as Skill[],
  isLoadingSkills: false,
  selectedSkillIds: [] as string[],
  skillSearchQuery: "",
  isSkillsModalOpen: false,

  isSubmitting: false,
  error: null as string | null,
  isCompleted: false,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,

  openPlanDetails: (planId: string) => set({ viewingPlanId: planId }),
  closePlanDetails: () => set({ viewingPlanId: null }),

  isPlanStepValid: () => get().selectedPlanId !== null,
  isProfileStepValid: () => get().username.trim().length >= MIN_USERNAME_LENGTH,

  loadPlans: async () => {
    if (get().plans.length > 0) return; // already loaded, skip refetch
    set({ isLoadingPlans: true, error: null });
    try {
      const plans = await onboardingService.fetchPlans();
      set({ plans, isLoadingPlans: false });
    } catch (err) {
      set({
        isLoadingPlans: false,
        error: err instanceof Error ? err.message : "خطا در دریافت پلن‌ها",
      });
    }
  },

  selectPlan: (planId) => set({ selectedPlanId: planId, error: null }),

  goToProfileStep: () => {
    if (!get().isPlanStepValid()) {
      set({ error: "لطفاً یک پلن را انتخاب کنید" });
      return;
    }
    set({ step: "profile", error: null });
  },

  goBackToPlanStep: () => set({ step: "plan", error: null }),

  loadSkills: async () => {
    if (get().skills.length > 0) return; // already loaded, skip refetch
    set({ isLoadingSkills: true });
    try {
      const skills = await onboardingService.fetchSkills();
      set({ skills, isLoadingSkills: false });
    } catch {
      set({ isLoadingSkills: false, error: "خطا در دریافت مهارت‌ها" });
    }
  },

  openSkillsModal: () => {
    document.body.style.overflow = "hidden";
    set({isSkillsModalOpen: true, skillSearchQuery: ""})
  },
  closeSkillsModal: () => {

    document.body.style.overflow = "auto";
    set({isSkillsModalOpen: false})
  },
  setSkillSearchQuery: (query) => set({ skillSearchQuery: query }),

  toggleSkill: (skillId) => {
    const current = get().selectedSkillIds;
    const next = current.includes(skillId)
      ? current.filter((id) => id !== skillId)
      : [...current, skillId];
    set({ selectedSkillIds: next });
  },

  removeSkill: (skillId) => {
    set({ selectedSkillIds: get().selectedSkillIds.filter((id) => id !== skillId) });
  },

  setUsername: (value) => set({ username: value, error: null }),

  setBio: (value) => set({ bio: value.slice(0, MAX_BIO_LENGTH) }),

  setAvatarFile: (file) => {
    const previous = get().avatarPreviewUrl;
    if (previous) URL.revokeObjectURL(previous);
    set({
      avatarFile: file,
      avatarPreviewUrl: file ? URL.createObjectURL(file) : null,
    });
  },

  removeAvatar: () => {
    const previous = get().avatarPreviewUrl;
    if (previous) URL.revokeObjectURL(previous);
    set({ avatarFile: null, avatarPreviewUrl: null });
  },

  submitProfile: async () => {
    const { selectedPlanId, username, bio, selectedSkillIds, avatarFile, isProfileStepValid } =
      get();
    if (!isProfileStepValid()) {
      set({ error: "نام کاربری باید حداقل ۳ کاراکتر باشد" });
      return;
    }
    set({ isSubmitting: true, error: null });
    try {
      await onboardingService.submitProfile({
        planId: selectedPlanId as string,
        username: username.trim(),
        bio,
        skillIds: selectedSkillIds,
        avatarFile,
      });
      set({ isSubmitting: false, isCompleted: true });
    } catch (err) {
      set({
        isSubmitting: false,
        error: err instanceof Error ? err.message : "ثبت اطلاعات ناموفق بود",
      });
    }
  },

  reset: () => {
    const previous = get().avatarPreviewUrl;
    if (previous) URL.revokeObjectURL(previous);
    set({ ...initialState });
  },
}));
