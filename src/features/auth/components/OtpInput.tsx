// features/auth/components/OtpInput.tsx

import { useRef } from "react";
import type { KeyboardEvent } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (index: number, digit: string) => void;
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

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-text-secondary">کد ۶ رقمی</span>
      <div className="flex justify-between gap-2" dir="ltr">
        {value.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
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
