// features/auth/services/auth.service.ts
//
// این فایل تنها جایی هست که باید موقع وصل شدن به بک‌اند واقعی تغییر بدی.
// الان به‌صورت mock کار می‌کنه (با تاخیر مصنوعی) تا UI/UX کامل قابل تست باشه.
//
// برای اتصال به بک‌اند واقعی، بدنه‌ی توابع رو با axiosInstance جایگزین کن، مثلا:
//
// import { axiosInstance } from "@/services/api/axios";
//
// export const authService = {
//   sendOtp: (payload: SendOtpPayload) =>
//     axiosInstance.post<{ messages: string }>("/auth/send-otp", payload).then((r) => r.data),
//
//   verifyOtp: (payload: VerifyOtpPayload) =>
//     axiosInstance.post<AuthResponse>("/auth/verify-otp", payload).then((r) => r.data),
// };

import type { AuthResponse, SendOtpPayload, VerifyOtpPayload } from "../models/auth.types";

const MOCK_DELAY_MS = 900;

function delay<T>(value: T, ms = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const authService = {
  async sendOtp(payload: SendOtpPayload): Promise<{ message: string }> {
    // TODO: جایگزین با فراخوانی واقعی axios
    return delay({ message: `کد تایید برای ${payload.phone} ارسال شد` });
  },

  async verifyOtp(payload: VerifyOtpPayload): Promise<AuthResponse> {
    // TODO: جایگزین با فراخوانی واقعی axios
    if (payload.code.length < 6) {
      throw new Error("کد تایید نامعتبر است");
    }
    return delay({
      token: "mock-token-123",
      user: { id: "1", phone: payload.phone },
    });
  },
};
