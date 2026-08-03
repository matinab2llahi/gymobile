import type { ReactNode } from "react";
import {Sidebar} from "@/components/navigation/Sidebar/Sidebar";
import {MobileBottomNav} from "@/components/navigation/Sidebar/MobileBottomNav";

export interface NavigationShellProps {
    children: ReactNode;
    /** Fetch this server-side (session / DB) and pass down as a plain prop. */
    userAvatarUrl?: string | null;
    userName?: string | null;
}

export function NavigationShell({ children, userAvatarUrl , userName }: NavigationShellProps) {
    return (
        <>
            <Sidebar userAvatarUrl={userAvatarUrl} userName={userName}  />
            <MobileBottomNav userAvatarUrl={userAvatarUrl} userName={userName} />
            <main className="min-h-screen pb-16 lg:pb-0 lg:pl-20">{children}</main>
        </>
    );
}