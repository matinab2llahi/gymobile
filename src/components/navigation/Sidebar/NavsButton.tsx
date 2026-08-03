import {LucideIcon} from "lucide-react";
import {NavBadge} from "@/components/navigation/Sidebar/NavBadge";
import {ButtonHTMLAttributes} from "react";

interface NavsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    id?: "notifications"
    registerLabel: (el: HTMLSpanElement | null) => void;
    children: string
    icon: LucideIcon
}

export const NavsButton = ({id, icon: Icon, children, className , registerLabel, ...props}: NavsButtonProps) => {
    return (
        <button

            className={`flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface text-text-secondary ${className ?? ""}`} {...props}
        >
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">

            <Icon
                className={`h-6 w-6`}
                strokeWidth={1.6}
            />
          {id == "notifications" && <NavBadge badgeKey={"notifications"}/>}
      </span>

            {/* Hidden by default (opacity-0, shifted left) so there's no flash of
          visible text before the view-model's GSAP effect runs on mount. */}
            <span ref={registerLabel}
                className={`whitespace-nowrap text-[15px] opacity-0 -translate-x-1.5 
                   font-medium
                `}
            >
        {children}
      </span>
        </button>
    )
}