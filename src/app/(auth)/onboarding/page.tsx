import type { Metadata } from "next";
import { Onboarding } from "@/features/onboarding/Onboarding";

export const metadata: Metadata = {
  title: "تکمیل پروفایل",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnboardingPage() {
  return <Onboarding />;
}
