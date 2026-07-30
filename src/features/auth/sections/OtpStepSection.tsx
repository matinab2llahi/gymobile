// features/auth/sections/OtpStepSection.tsx

import { useLoginViewModel } from "../view-models/useLoginViewModel";
import { OtpInput } from "../components/OtpInput";
import { PrimaryButton } from "../components/PrimaryButton";
import { BackLink } from "../components/BackLink";

export function OtpStepSection() {
  const {
    code,
    isLoading,
    error,
    resendSeconds,
    canSubmitOtp,
    canResend,
    onCodeDigitChange,
    onSubmitOtp,
    onResend,
    onBack,
  } = useLoginViewModel();

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitOtp();
      }}
    >
      <BackLink onClick={onBack} />

      <h1 className="text-2xl font-bold text-text-primary">ارسال کد</h1>

      <OtpInput value={code} onChange={onCodeDigitChange} />

      <p className="text-sm text-text-secondary">
        {canResend ? (
          <button
            type="button"
            onClick={onResend}
            className="font-medium text-primary hover:text-primary-hover"
          >
            کد ارسال نشده؟ ارسال کد مجدد
          </button>
        ) : (
          <>
            کد ارسال نشده؟{" "}
            <span className="font-medium text-text-muted">
              ارسال کد مجدد ({resendSeconds}s)
            </span>
          </>
        )}
      </p>

      {error && <p className="text-sm text-danger-text">{error}</p>}

      <PrimaryButton type="submit" isLoading={isLoading} disabled={!canSubmitOtp}>
        تایید
      </PrimaryButton>
    </form>
  );
}
