import {AuthState, useAuthStore} from "@/features/login/stores/auth-store";
import {PrimaryButton} from "@/components/PrimaryButton/PrimaryButton";
import {PhoneInput} from "@/features/login/components/PhoneInput";

interface PhoneFormProps {
    error: AuthState["error"];
    isLoading: AuthState["isLoading"];
}

export const PhoneForm = ({error , isLoading} : PhoneFormProps)=>{

    const isPhoneValid = useAuthStore((state) => state.isPhoneValid)
    const value = useAuthStore((state) => state.phone);
    const onChange = useAuthStore((state) => state.setPhone);

    return (
        <>
            <PhoneInput value={value} onChange={onChange} autoFocus />

            {error && <p className="text-sm text-danger-text">{error}</p>}

            <PrimaryButton type="submit" isLoading={isLoading} disabled={!isPhoneValid()}>
                ورود
            </PrimaryButton>
        </>
    )
}