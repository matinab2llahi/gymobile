// features/auth/sections/OtpStepSection.tsx

import {useLoginViewModel} from "../view-models/useLoginViewModel";
import {OtpInput} from "../components/OtpInput";
import {PrimaryButton} from "@/components/PrimaryButton/PrimaryButton";
import {BackLink} from "@/components/auth/BackLink/BackLink";
import {HeaderForm} from "@/components/auth/HeaderForm/HeaderForm";

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
        goBack,
    } = useLoginViewModel();

    return (
        <form
            className="flex w-full max-w-sm flex-col gap-6"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitOtp();
            }}
        >
            <BackLink onClick={goBack}/>
            <HeaderForm title={"ارسال کد"}/>
            <OtpInput value={code} onChange={onCodeDigitChange} />

            <p className="text-sm text-text-secondary">
                {canResend ? (
                    <>
                        کد ارسال نشده؟
                        <button
                            type="button"
                            onClick={onResend}
                            className="font-medium text-primary hover:text-primary-hover ms-2"
                        >
                            ارسال کد مجدد
                        </button>
                    </>
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
