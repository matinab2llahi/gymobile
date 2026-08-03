import type { LucideIcon } from "lucide-react";

/**
 * Stable identifiers for every nav destination.
 * Kept as a union (not a loose string) so config entries and
 * consumers get compile-time safety and autocomplete.
 */
export type NavItemId =
    | "program"
    | "explore"
    | "messages"
    | "profile";

/** Keys into the badge store — only these two items show unread counts. */
export type BadgeKey = "messages" | "notifications";

export interface NavItem {
    id: NavItemId;
    label: string;
    href: string;
    icon: LucideIcon;
    /** Accessible name for the icon-only / collapsed state. */
    ariaLabel: string;
    /** Renders a circular avatar instead of a lucide icon when true. */
    isProfile?: boolean;
}