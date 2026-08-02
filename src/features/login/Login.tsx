"use client";

import { useAuthStore } from "./stores/auth-store";
import { PhoneStepSection } from "./sections/PhoneStepSection";
import { OtpStepSection } from "./sections/OtpStepSection";

export const LoginPage = ()=> {
  const step = useAuthStore((s) => s.step);

  return (
      <div className="flex items-center justify-center px-6 py-16">
        {step === "phone" ? <PhoneStepSection /> : <OtpStepSection />}
      </div>
  );
}
