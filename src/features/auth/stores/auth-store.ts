// features/auth/stores/auth-store.ts

import { create } from "zustand";
import { authService } from "../services/auth.service";
import {
  AuthUser,
  LoginStep,
  OTP_LENGTH,
  RESEND_TIMEOUT_SECONDS,
} from "../models/auth.types";

// اعتبارسنجی ساده شماره موبایل ایران (09xxxxxxxxx)
const PHONE_REGEX = /^09\d{9}$/;

interface AuthState {
  // --- state ---
  step: LoginStep;
  phone: string;
  code: string[]; // آرایه‌ی ۶ رقمی، هر خانه یک رقم
  isLoading: boolean;
  error: string | null;
  resendSeconds: number;
  token: string | null;
  user: AuthUser | null;

  // --- derived / helpers ---
  isPhoneValid: () => boolean;
  isCodeComplete: () => boolean;

  // --- actions ---
  setPhone: (phone: string) => void;
  setCodeDigit: (index: number, digit: string) => void;
  clearError: () => void;
  goBackToPhoneStep: () => void;
  submitPhone: () => Promise<void>;
  submitOtp: () => Promise<void>;
  resendOtp: () => Promise<void>;
  tickResendTimer: () => void;
  reset: () => void;
}

const initialState = {
  step: "phone" as LoginStep,
  phone: "",
  code: Array(OTP_LENGTH).fill(""),
  isLoading: false,
  error: null as string | null,
  resendSeconds: 0,
  token: null as string | null,
  user: null as AuthUser | null,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...initialState,

  isPhoneValid: () => PHONE_REGEX.test(get().phone),
  isCodeComplete: () => get().code.every((d) => d !== ""),

  setPhone: (phone) => {
    // فقط عدد قبول می‌کنیم، حداکثر ۱۱ رقم
    const digitsOnly = phone.replace(/\D/g, "").slice(0, 11);
    set({ phone: digitsOnly, error: null });
  },

  setCodeDigit: (index, digit) => {
    const value = digit.replace(/\D/g, "").slice(-1);
    const next = [...get().code];
    next[index] = value;
    set({ code: next, error: null });
  },

  clearError: () => set({ error: null }),

  goBackToPhoneStep: () => {
    set({ step: "phone", code: Array(OTP_LENGTH).fill(""), error: null });
  },

  submitPhone: async () => {
    const { phone, isPhoneValid } = get();
    if (!isPhoneValid()) {
      set({ error: "شماره موبایل معتبر نیست" });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      await authService.sendOtp({ phone });
      set({
        step: "otp",
        isLoading: false,
        resendSeconds: RESEND_TIMEOUT_SECONDS,
        code: Array(OTP_LENGTH).fill(""),
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "ارسال کد با خطا مواجه شد",
      });
    }
  },

  submitOtp: async () => {
    const { phone, code, isCodeComplete } = get();
    if (!isCodeComplete()) {
      set({ error: "کد ۶ رقمی را کامل وارد کنید" });
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const res = await authService.verifyOtp({ phone, code: code.join("") });
      set({ isLoading: false, token: res.token, user: res.user });
      // TODO: ریدایرکت به صفحه‌ی home یا هر مسیر مدنظر بعد از ورود موفق
      // router.push("/home");
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "کد تایید اشتباه است",
      });
    }
  },

  resendOtp: async () => {
    const { phone, resendSeconds } = get();
    if (resendSeconds > 0) return;
    set({ isLoading: true, error: null });
    try {
      await authService.sendOtp({ phone });
      set({ isLoading: false, resendSeconds: RESEND_TIMEOUT_SECONDS });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof Error ? err.message : "ارسال مجدد کد ناموفق بود",
      });
    }
  },

  tickResendTimer: () => {
    set((s) => ({ resendSeconds: Math.max(0, s.resendSeconds - 1) }));
  },

  reset: () => set({ ...initialState, code: Array(OTP_LENGTH).fill("") }),
}));
