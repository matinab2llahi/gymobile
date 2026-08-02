// features/onboarding/components/BioField.tsx

import { PenLine } from "lucide-react";

interface BioFieldProps {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
}

export function BioField({ value, maxLength, onChange }: BioFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="bio" className="text-sm font-medium text-text-primary">
        بیوگرافی
      </label>
      <div className="rounded-xl border border-border bg-background px-3 py-3
                       transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-bg">
        <div className="flex items-start gap-2">
          <textarea
            id="bio"
            rows={4}
            placeholder="کمی درباره خودت بنویس..."
            value={value}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
            className="w-full resize-y min-h-[60px] max-h-[150px] bg-transparent text-text-primary placeholder:text-text-muted outline-none"
          />
        </div>
        <div className="mt-1 text-left text-xs text-text-muted">
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}
