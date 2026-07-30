// features/auth/view-models/useLoginViewModel.ts

import { useEffect } from "react";
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
