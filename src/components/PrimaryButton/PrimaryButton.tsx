import {ArrowLeft, Loader2} from "lucide-react";
import {PrimaryButtonProps} from "@/components/PrimaryButton/index";

export const PrimaryButton = ({
                                  isLoading,
                                  disabled,
                                  children,
                                  Icon,
                                  ...rest
                              }: PrimaryButtonProps) => {
    return (
        <button
            disabled={disabled || isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary
                 py-3.5 font-medium text-text-on-primary transition-colors
                 hover:bg-primary-hover active:bg-primary-active
                 disabled:cursor-not-allowed disabled:opacity-60"
            {...rest}
        >
            {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin"/>
            ) : (
                <>
                    <span>{children}</span>
                    {
                        Icon ? <Icon/> :
                            <ArrowLeft className="h-5 w-5"/>
                    }
                </>
            )}
        </button>
    );
}
