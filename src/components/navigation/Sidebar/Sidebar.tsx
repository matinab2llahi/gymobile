"use client";

import Link from "next/link";
import {useSidebarViewModel} from "@/hooks/navigation/useSidebarViewModel";
import { SIDEBAR_COLLAPSED_WIDTH} from "@/types/navigation/navigation.config";
import {SidebarItem} from "@/components/navigation/Sidebar/SidebarItem";
import {NavigationShellProps} from "@/components/navigation/NavigationShell";
import {paths} from "@/routes/paths";
import {useEffect, useState} from "react";
import {Dumbbell, Home, Search, Send} from "lucide-react";
import {NavItem} from "@/types/navigation/navigation.types";

interface SidebarProps {
    userAvatarUrl?: NavigationShellProps["userAvatarUrl"];
    userName?: NavigationShellProps["userName"];
}

export function Sidebar({ userAvatarUrl , userName  }: SidebarProps) {
    const { containerRef, registerLabel, isActive } = useSidebarViewModel();
    const navLinks: NavItem[] = [
        {
            id: "profile",
            label: "پروفایل",
            href: paths.username(userName),
            icon: Home,
            ariaLabel: "پروفایل شما",
            isProfile: true,
        },
        {
            id: "program",
            label: "برنامه ها",
            href: paths.programs(),
            icon: Dumbbell,
            ariaLabel: "برنامه ها",
        },
        {
            id: "messages",
            label: "پیام",
            href: paths.messages(),
            icon: Send,
            ariaLabel: "پیام های شما",
        },
        {
            id: "explore",
            label: "جست‌وجو",
            href: paths.explore(),
            icon: Search,
            ariaLabel: "جست‌وجو کردن",
        },
    ];

    useEffect(() => {
        // ...
    }, [userName]);

    return (
        <nav
            ref={containerRef}
            aria-label="Primary"
            style={{ width: SIDEBAR_COLLAPSED_WIDTH }}
            className="fixed inset-y-0 left-0 z-40 hidden flex-col overflow-hidden border-r border-border-strong bg-background py-6 transition-shadow hover:shadow-lg lg:flex"
        >
            <Link
                href={paths.explore()}
                aria-label="GYMobile home"
                className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center self-start ml-4 rounded-xl bg-primary text-sm font-bold text-text-on-primary"
            >
                G
            </Link>

            <div className="flex flex-col gap-1 px-3">
                {navLinks.map((item) => (
                    <SidebarItem
                        key={item.id}
                        item={item}
                        active={isActive(item.href)}
                        registerLabel={registerLabel}
                        avatarUrl={item.isProfile ? userAvatarUrl : undefined}
                    />
                ))}
            </div>
        </nav>
    );
}