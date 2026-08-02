// features/onboarding/components/UsernameField.tsx

import { UserRound } from "lucide-react";

interface UsernameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function UsernameField({ value, onChange }: UsernameFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="username" className="text-sm font-medium text-text-primary">
        نام کاربری
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background
                       transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-bg">
        <input
          id="username"
          type="text"
          placeholder="نام کاربری را وارد کنید"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-3 text-text-primary placeholder:text-text-muted outline-none"
        />
      </div>
      <p className="text-xs text-text-muted">این نام کاربری منحصربه‌فرد شما خواهد بود.</p>
    </div>
  );
}
