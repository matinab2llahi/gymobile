"use client";


import {useNavBadgeStore} from "@/stores/navigation/navBadgeStore";
import {BadgeKey} from "@/types/navigation/navigation.types";

const selectUnreadMessages = (s: ReturnType<typeof useNavBadgeStore.getState>) =>
    s.unreadMessages;
const selectUnreadNotifications = (s: ReturnType<typeof useNavBadgeStore.getState>) =>
    s.unreadNotifications;

const SELECTORS: Record<BadgeKey, typeof selectUnreadMessages> = {
    messages: selectUnreadMessages,
    notifications: selectUnreadNotifications,
};

interface NavBadgeProps {
    badgeKey: BadgeKey;
}

export function NavBadge({ badgeKey }: NavBadgeProps) {
    const count = useNavBadgeStore(SELECTORS[badgeKey]);

    if (!count) return null;

    return (
        <span
            aria-hidden="true"
            className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-text-on-primary"
        >
      {count > 9 ? "9+" : count}
    </span>
    );
}