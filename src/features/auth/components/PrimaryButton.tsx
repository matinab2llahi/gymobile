// features/auth/components/PrimaryButton.tsx

import { ArrowLeft, Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function PrimaryButton({
  isLoading,
  disabled,
  children,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary
                 py-3.5 font-medium text-text-on-primary transition-colors
                 hover:bg-primary-hover active:bg-primary-active
                 disabled:cursor-not-allowed disabled:opacity-60"
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <ArrowLeft className="h-5 w-5" />
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
