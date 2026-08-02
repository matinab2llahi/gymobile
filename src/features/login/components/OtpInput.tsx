import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (index: number, digit: string) => void;
  onComplete?: (code: string) => void; // اختیاری، اگه خواستی مستقیم هندل کنی
  disabled?: boolean;
}

export function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    onChange(index, digit);
    if (digit && index < value.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  // ⬅️ پیست کردن کل کد (وقتی کاربر یا اتوفیل، کل رشته رو یکجا پیست می‌کنه)
  const handlePaste = (
      startIndex: number,
      e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    e.preventDefault();
    pasted
        .slice(0, value.length - startIndex)
        .split("")
        .forEach((d, i) => onChange(startIndex + i, d));
    const lastIndex = Math.min(startIndex + pasted.length, value.length) - 1;
    if (lastIndex >= 0) focusInput(lastIndex);
  };

  useEffect(() => {
    if (!("OTPCredential" in window)) return; // فقط مرورگرهایی که پشتیبانی می‌کنن

    const ac = new AbortController();

    navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((credential) => {
          if (!credential || !("code" in credential)) return;

          const otpCredential = credential as OTPCredential;
          const digits = otpCredential.code.replace(/\D/g, "");
          if (!digits) return;

          digits
              .slice(0, value.length)
              .split("")
              .forEach((d, i) => onChange(i, d));
        })
        .catch(() => {
          // کاربر اجازه نداد، پیامک نرسید، یا مرورگر ساپورت نکرد — مشکلی نیست
        });

    return () => ac.abort();
  }, []);

  return (
      <div className="flex flex-col gap-2">
        <span className="text-sm text-text-secondary">کد ۶ رقمی</span>
        <div className="flex justify-between gap-2" dir="ltr">
          {value.map((digit, index) => (
              <input
                  autoFocus={index === 0}
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  disabled={disabled}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => handlePaste(index, e)}
                  className="h-14 w-12 rounded-xl border border-border bg-background text-center text-lg
                       font-semibold text-text-primary outline-none transition-colors
                       focus:border-primary focus:ring-2 focus:ring-primary-bg
                       disabled:cursor-not-allowed disabled:opacity-60"
              />
          ))}
        </div>
      </div>
  );
}