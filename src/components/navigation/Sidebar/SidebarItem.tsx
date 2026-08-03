import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserRound } from "lucide-react";
import {NavBadge} from "@/components/navigation/Sidebar/NavBadge";
import {NavItem} from "@/types/navigation/navigation.types";
import {NavigationShellProps} from "@/components/navigation/NavigationShell";

interface SidebarItemProps {
    item: NavItem;
    active: boolean;
    registerLabel: (el: HTMLSpanElement | null) => void;
    avatarUrl?: NavigationShellProps["userAvatarUrl"];
}

function SidebarItemComponent({ item, active, registerLabel, avatarUrl }: SidebarItemProps) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            aria-label={item.ariaLabel}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface ${
                active ? "text-primary" : "text-text-secondary"
            }`}
        >
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        {item.isProfile ? (
            avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt=""
                    width={24}
                    height={24}
                    className={`h-6 w-6 rounded-full object-cover ${
                        active ? "ring-2 ring-primary ring-offset-1" : ""
                    }`}
                />
            ) : (
                <UserRound className="h-6 w-6" strokeWidth={active ? 2 : 1.5} />
            )
        ) : (
            <Icon
                className={`h-6 w-6 ${active ? "text-primary" : ""}`}
                strokeWidth={active ? 2 : 1.6}
            />
        )}
          {item.id == "messages" && <NavBadge badgeKey={"messages"} />}
      </span>

            {/* Hidden by default (opacity-0, shifted left) so there's no flash of
          visible text before the view-model's GSAP effect runs on mount. */}
            <span
                ref={registerLabel}
                className={`whitespace-nowrap text-[15px] opacity-0 -translate-x-1.5 ${
                    active ? "font-semibold" : "font-medium"
                }`}
            >
        {item.label}
      </span>
        </Link>
    );
}

// Props are primitive values / stable refs — memo lets React skip re-rendering
// items whose `active` flag didn't change when the pathname updates.
export const SidebarItem = memo(SidebarItemComponent);