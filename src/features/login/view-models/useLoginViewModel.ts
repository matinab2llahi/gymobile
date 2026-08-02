// features/auth/view-models/useLoginViewModel.ts

import {useEffect, useRef} from "react";
import { useAuthStore } from "../stores/auth-store";
import {useRouter} from "next/navigation";
import {paths} from "@/routes/paths";

export function useLoginViewModel() {
  const router = useRouter();
  const step = useAuthStore((state) => state.step);
  const successOtp = useAuthStore((state) => state.successOtp);
  const code = useAuthStore((state) => state.code);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const resendSeconds = useAuthStore((state) => state.resendSeconds);
  const goBack = useAuthStore((state) => state.goBackToPhoneStep);

  const setCodeDigit = useAuthStore((state) => state.setCodeDigit);

  const submitPhone = useAuthStore((state) => state.submitPhone);
  const submitOtp = useAuthStore((state) => state.submitOtp);
  const resendOtp = useAuthStore((state) => state.resendOtp);
  const tickResendTimer = useAuthStore((state) => state.tickResendTimer);

  // const isPhoneValid = useAuthStore((state) => state.isPhoneValid);
  const isCodeComplete = useAuthStore((state) => state.isCodeComplete);

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

  useEffect(()=>{
    if (successOtp){
      router.push(paths.onboarding())
    }
  },[successOtp])

  return {
    step,
    code,
    isLoading,
    error,
    resendSeconds,
    canSubmitOtp: isCodeComplete(),
    canResend: resendSeconds === 0,
    goBack,
    onCodeDigitChange: setCodeDigit,
    onSubmitPhone: submitPhone,
    onSubmitOtp: submitOtp,
    onResend: resendOtp,
  };
}
