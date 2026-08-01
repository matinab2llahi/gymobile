// features/auth/view-models/useLoginViewModel.ts

import {useEffect, useRef} from "react";
import { useAuthStore } from "../stores/auth-store";

export function useLoginViewModel() {
  const {
    step,
    phone,
    code,
    isLoading,
    error,
    resendSeconds,
    setPhone,
    setCodeDigit,
    goBackToPhoneStep,
    submitPhone,
    submitOtp,
    resendOtp,
    tickResendTimer,
    isPhoneValid,
    isCodeComplete,
  } = useAuthStore();

  // شمارش معکوس ارسال مجدد کد
  useEffect(() => {
    if (step !== "otp" || resendSeconds <= 0) return;
    const id = setInterval(() => tickResendTimer(), 1000);
    return () => clearInterval(id);
  }, [step, resendSeconds, tickResendTimer]);

  const codeStr = code.join("");
  const autoSubmittedFor = useRef<string | null>(null);

  useEffect(() => {
    if (step !== "otp") return;
    if (!isCodeComplete()) {
      autoSubmittedFor.current = null; // با ناقص شدن کد، اجازه‌ی سابمیت بعدی رو دوباره فعال کن
      return;
    }
    if (isLoading) return;
    if (autoSubmittedFor.current === codeStr) return; // قبلاً برای همین کد امتحان شده

    autoSubmittedFor.current = codeStr;
    submitOtp();
  }, [step, codeStr, isLoading, isCodeComplete, submitOtp]);

  return {
    step,
    phone,
    code,
    isLoading,
    error,
    resendSeconds,
    canSubmitPhone: isPhoneValid(),
    canSubmitOtp: isCodeComplete(),
    canResend: resendSeconds === 0,
    onPhoneChange: setPhone,
    onCodeDigitChange: setCodeDigit,
    onBack: goBackToPhoneStep,
    onSubmitPhone: submitPhone,
    onSubmitOtp: submitOtp,
    onResend: resendOtp,
  };
}
