import { useLoginViewModel } from "../view-models/useLoginViewModel";
import { PhoneInput } from "../components/PhoneInput";
import {PrimaryButton} from "@/components/PrimaryButton/PrimaryButton";
import {PhoneForm} from "@/features/login/components/PhoneForm";
import {HeaderForm} from "@/components/auth/HeaderForm/HeaderForm";

export function PhoneStepSection() {
  const {  isLoading, error, onSubmitPhone } =
    useLoginViewModel();

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitPhone();
      }}
    >
        <HeaderForm title={"خوش آمدید"} description={"برای دریافت کد یکبار مصرف، شماره موبایل خود را وارد کنید."}/>
        <PhoneForm error={error} isLoading={isLoading} />
    </form>
  );
}
