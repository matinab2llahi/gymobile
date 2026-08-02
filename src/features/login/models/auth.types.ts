// features/auth/models/auth.types.ts

export type LoginStep = "phone" | "otp";

export const OTP_LENGTH = 6;
export const RESEND_TIMEOUT_SECONDS = 60;

export interface SendOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  code: string;
}

export interface AuthUser {
  id: string;
  phone: string;
  fullName?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/**
 * Generic API error shape. Adjust to match your backend's real error
 * contract once it's connected (e.g. Laravel/NestJS validation errors).
 */
export interface ApiError {
  message: string;
  field?: keyof SendOtpPayload | keyof VerifyOtpPayload;
}
