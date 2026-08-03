"use client";

import Link from "next/link";
import {useSidebarViewModel} from "@/hooks/navigation/useSidebarViewModel";
import { SIDEBAR_COLLAPSED_WIDTH} from "@/types/navigation/navigation.config";
import {NavigationShellProps} from "@/components/navigation/NavigationShell";
import {paths} from "@/routes/paths";
import {Bell, Settings} from "lucide-react";
import {NavsButton} from "@/components/navigation/Sidebar/NavsButton";
import {NavsLinks} from "@/components/navigation/Sidebar/NavsLinks";

interface SidebarProps {
    userAvatarUrl?: NavigationShellProps["userAvatarUrl"];
    userName?: NavigationShellProps["userName"];
}

export function Sidebar({ userAvatarUrl , userName  }: SidebarProps) {
    const { containerRef, registerLabel, isActive } = useSidebarViewModel();


    return (
        <nav
            ref={containerRef}
            aria-label="Primary"
            style={{ width: SIDEBAR_COLLAPSED_WIDTH }}
            className="fixed inset-y-0 left-0 z-40 hidden flex-col justify-between overflow-hidden border-r border-border bg-background py-10 transition-shadow hover:shadow-lg lg:flex"
        >
            <Link
                href={paths.explore()}
                aria-label="GYMobile home"
                className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center self-start ml-4 rounded-xl bg-primary text-sm font-bold text-text-on-primary"
            >
                G
            </Link>

            <NavsLinks registerLabel={registerLabel} isActive={isActive} userName={userName} userAvatarUrl={userAvatarUrl} />

            <div className={"flex flex-col gap-1 px-3"}>
                <NavsButton registerLabel={registerLabel} icon={Bell} id={"notifications"} >
                    {"اعلان ها"}
                </NavsButton>
                <NavsButton registerLabel={registerLabel} icon={Settings}>
                    {"تنظیمات"}
                </NavsButton>
            </div>
        </nav>
    );
}