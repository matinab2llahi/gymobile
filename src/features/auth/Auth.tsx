"use client";

import { useAuthStore } from "./stores/auth-store";
import { PhoneStepSection } from "./sections/PhoneStepSection";
import { OtpStepSection } from "./sections/OtpStepSection";
import { AuthImagePanel } from "./components/AuthImagePanel";

export function Auth() {
  const step = useAuthStore((s) => s.step);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2" dir="rtl">
      <AuthImagePanel
        imageSrc="/images/login/1300550.jpg"
        title="آماده‌ی پیشرفت واقعی؟"
        subtitle="برنامه‌ی تمرینی شخصی‌سازی‌شده، پیگیری پیشرفت و ارتباط مستقیم با مربی، همه توی یک اپ."
      />
      <div className="flex items-center justify-center px-6 py-16">
        {step === "phone" ? <PhoneStepSection /> : <OtpStepSection />}
      </div>

    </div>
  );
}
