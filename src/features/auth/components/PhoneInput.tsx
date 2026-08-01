// features/auth/components/PhoneInput.tsx

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function PhoneInput({ value, onChange, disabled, autoFocus }: PhoneInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="phone" className="text-sm text-text-secondary font-medium ">
        شماره موبایل
      </label>
      <div className="flex items-stretch gap-2" dir="ltr">
        <div className="flex items-center gap-1 rounded-xl border border-border bg-surface px-3 text-sm text-text-secondary">
          <span>IR</span>
          <span className="font-medium text-text-primary">+98</span>
        </div>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          autoFocus={autoFocus}
          disabled={disabled}
          placeholder="912 345 6789"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-right text-text-primary
                     placeholder:text-text-muted outline-none transition-colors
                     focus:border-primary focus:ring-2 focus:ring-primary-bg
                     disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </div>
  );
}
