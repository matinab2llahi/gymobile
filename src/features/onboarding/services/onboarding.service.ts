// features/onboarding/services/onboarding.service.ts
//
// Mock implementation only. No backend yet, so every call is faked with
// an artificial delay. Once the real API is ready, this is the only file
// that needs to change - stores/view-models/components stay untouched.
//
// Example of a real implementation:
//
// import { axiosInstance } from "@/services/api/axios";
//
// export const onboardingService = {
//   fetchPlans: () => axiosInstance.get<Plan[]>("/onboarding/plans").then((r) => r.data),
//   fetchSkills: () => axiosInstance.get<Skill[]>("/onboarding/skills").then((r) => r.data),
//   submitProfile: (payload: OnboardingProfilePayload) => {
//     const formData = new FormData();
//     formData.append("planId", payload.planId);
//     formData.append("username", payload.username);
//     formData.append("bio", payload.bio);
//     payload.skillIds.forEach((id) => formData.append("skillIds[]", id));
//     if (payload.avatarFile) formData.append("avatar", payload.avatarFile);
//     return axiosInstance.post("/onboarding/[username]", formData).then((r) => r.data);
//   },
// };

import type { OnboardingProfilePayload, Plan, Skill } from "../models/onboarding.types";

const MOCK_DELAY_MS = 500;

function delay<T>(value: T, ms = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const MOCK_PLANS: Plan[] = [
  {
    id: "strength-building",
    title: "افزایش قدرت",
    description: "افزایش حجم عضلات و بهبود قدرت کلی بدن.",
    longDescription:
        "این برنامه برای کسانی طراحی شده که می‌خوان قدرت و حجم عضلانی‌شون رو به‌صورت اصولی و پیوسته افزایش بدن. تمرکز اصلی روی حرکات ترکیبی و افزایش تدریجی وزنه‌هاست تا هم قدرت واقعی بدنت بالا بره و هم ظاهر عضلانی‌تری پیدا کنی.",
    imageSrc: "/images/plans/victor-freitas-WvDYdXDzkhs-unsplash.jpg",
  },
  {
    id: "fat-loss",
    title: "کاهش چربی",
    description: "چربی بسوزون و استقامت بدنت رو با این برنامه افزایش بده.",
    longDescription:
        "ترکیبی از تمرینات کاردیو و قدرتی که با هدف چربی‌سوزی و بهبود استقامت بدن طراحی شده. این برنامه به‌جای کاهش وزن سریع و ناپایدار، روی از دست دادن چربی به‌شکل سالم و حفظ عضله تمرکز داره.",

    imageSrc: "/images/plans/danielle-cerullo-CQfNt66ttZM-unsplash.jpg",
  },
  {
    id: "mobility-flexibility",
    title: "آزمایشی",
    description: "انعطاف‌پذیری و تحرک بدن رو بهبود بده و ریسک آسیب رو کم کن.",
    longDescription:
        "مناسب کسانی که می‌خوان دامنه حرکتی بدن‌شون رو بهبود بدن، از خشکی عضلات جلوگیری کنن و ریسک آسیب‌دیدگی رو پایین بیارن. ترکیبی از حرکات کششی، یوگا و تمرینات تحرکی که برای هر سطحی قابل انجامه.",

    imageSrc: "/images/plans/anastase-maragos-9dzWZQWZMdE-unsplash.jpg",
  },
];

const MOCK_SKILLS: Skill[] = [
  { id: "strength-training", label: "تمرین قدرتی" },
  { id: "nutrition", label: "تغذیه" },
  { id: "flexibility", label: "انعطاف‌پذیری" },
  { id: "bodybuilding", label: "بدنسازی" },
  { id: "hiit", label: "HIIT (تمرین شدت بالا)" },
  { id: "weight-loss", label: "کاهش وزن" },
  { id: "cardio", label: "کاردیو" },
  { id: "powerlifting", label: "پاورلیفتینگ" },
  { id: "crossfit", label: "کراسفیت" },
  { id: "pilates", label: "پیلاتس" },
  { id: "yoga", label: "یوگا" },
  { id: "mobility", label: "تحرک‌پذیری" },
  { id: "calisthenics", label: "کالیستنیک" },
  { id: "rehabilitation", label: "توانبخشی" },
  { id: "sport-performance", label: "عملکرد ورزشی" },
  { id: "endurance", label: "استقامت" },
  { id: "stretching", label: "کشش عضلات" },
  { id: "functional-training", label: "تمرینات عملکردی" },
  { id: "meal-planning", label: "برنامه‌ریزی غذایی" },
  { id: "supplementation", label: "مکمل‌یاری" },
  { id: "mindset-coaching", label: "مربیگری ذهنی" },
  { id: "posture-correction", label: "اصلاح وضعیت بدن" },
  { id: "injury-prevention", label: "پیشگیری از آسیب" },
  { id: "other", label: "سایر" },
];

export const onboardingService = {
  async fetchPlans(): Promise<Plan[]> {
    return delay(MOCK_PLANS);
  },

  async fetchSkills(): Promise<Skill[]> {
    return delay(MOCK_SKILLS);
  },

  async submitProfile(payload: OnboardingProfilePayload): Promise<{ success: true }> {
    // TODO: replace with a real multipart request once the backend exists
    console.log("submitProfile (mock):", payload);
    return delay({ success: true as const });
  },
};
