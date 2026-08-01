import { useLoginViewModel } from "../view-models/useLoginViewModel";
import { PhoneInput } from "../components/PhoneInput";
import {PrimaryButton} from "@/components/PrimaryButton/PrimaryButton";

export function PhoneStepSection() {
  const { phone, isLoading, error, canSubmitPhone, onPhoneChange, onSubmitPhone } =
    useLoginViewModel();

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitPhone();
      }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-text-primary">خوش آمدید</h1>
        <p className="text-sm leading-6 text-text-secondary">
          برای دریافت کد یکبار مصرف، شماره موبایل خود را وارد کنید.
        </p>
      </div>

      <PhoneInput value={phone} onChange={onPhoneChange} autoFocus />

      {error && <p className="text-sm text-danger-text">{error}</p>}

      <PrimaryButton type="submit" isLoading={isLoading} disabled={!canSubmitPhone}>
        ورود
      </PrimaryButton>

    </form>
  );
}
