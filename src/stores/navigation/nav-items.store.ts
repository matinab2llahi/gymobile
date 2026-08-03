import { create } from "zustand";
import type { LucideIcon } from "lucide-react";
import { Home, Dumbbell, Send, Search } from "lucide-react";

export interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
    ariaLabel: string;
    isProfile?: boolean;
}

interface NavItemsStore {
    navItems: NavItem[];
    setNavItems: (navItems: NavItem[]) => void;
}

export const useNavItemsStore = create<NavItemsStore>((set) => ({
    navItems: [
        {
            id: "profile",
            label: "پروفایل",
            href: "/[username]",
            icon: Home,
            ariaLabel: "پروفایل شما",
            isProfile: true,
        },
        {
            id: "programs",
            label: "برنامه ها",
            href: "/programs",
            icon: Dumbbell,
            ariaLabel: "برنامه ها",
        },
        {
            id: "messages",
            label: "پیام",
            href: "/messages",
            icon: Send,
            ariaLabel: "پیام های شما",
        },
        {
            id: "explore",
            label: "جست‌وجو",
            href: "/explore",
            icon: Search,
            ariaLabel: "جست‌وجو کردن",
        },
    ],

    setNavItems: (navItems) => set({ navItems }),
}));