import {HeaderFormProps} from "@/components/auth/HeaderForm/index";

export const HeaderForm = ({title, description , className , ...props}: HeaderFormProps) => {
    return (
        <div className={`flex flex-col gap-2 ${className ?? ""}`} {...props}>
            <h1 className="text-2xl font-bold text-text-primary">
                {title}
                {/*خوش آمدید*/}
            </h1>
            {
                description &&
                <p className="text-sm leading-6 text-text-secondary">
                    {description}
                    {/*برای دریافت کد یکبار مصرف، شماره موبایل خود را وارد کنید.*/}
                </p>
            }
        </div>
    )
}