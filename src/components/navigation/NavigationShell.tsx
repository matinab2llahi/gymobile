import type { ReactNode } from "react";
import {Sidebar} from "@/components/navigation/Sidebar/Sidebar";
import {MobileBottomNav} from "@/components/navigation/Sidebar/MobileBottomNav";

export interface NavigationShellProps {
    children: ReactNode;
    /** Fetch this server-side (session / DB) and pass down as a plain prop. */
    userAvatarUrl?: string | null;
    userName?: string | null;
}

/**
 * Plain Server Component — no "use client" here. It renders two small
 * client islands (Sidebar, MobileBottomNav) but `children` (the actual
 * page) stays fully server-rendered, so route pages keep their SEO and
 * streaming/server-component benefits untouched.
 *
 * `lg:pl-20` reserves space equal to the sidebar's collapsed width so
 * content never sits under it; because the sidebar expands via `fixed`
 * positioning + GSAP (not a layout-affecting box), that reserved space
 * doesn't need to change when the sidebar is hovered/expanded.
 */
export function NavigationShell({ children, userAvatarUrl , userName }: NavigationShellProps) {
    return (
        <>
            <Sidebar userAvatarUrl={userAvatarUrl} userName={userName}  />
            <MobileBottomNav userAvatarUrl={userAvatarUrl} />
            <main className="min-h-screen pb-16 lg:pb-0 lg:pl-20">{children}</main>
        </>
    );
}