"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {Dumbbell, Home, Search, Send, UserRound} from "lucide-react";
import {isNavItemActive} from "@/utils/navigation/navigation.utils";
import {NavBadge} from "@/components/navigation/Sidebar/NavBadge";
import {NavigationShellProps} from "@/components/navigation/NavigationShell";
import {NavItem} from "@/types/navigation/navigation.types";
import {paths} from "@/routes/paths";

interface MobileBottomNavProps {
    userAvatarUrl?: NavigationShellProps["userAvatarUrl"];

    userName?: NavigationShellProps["userName"];
}

/**
 * No hover states, no expand/collapse — just a fixed icon-only bar.
 * `usePathname` is the only reactive piece; there is nothing here that
 * could cause a re-render outside this small component.
 */
export function MobileBottomNav({ userAvatarUrl , userName }: MobileBottomNavProps) {
    const pathname = usePathname();

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

    return (
        <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border-strong bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
            {navLinks.map((item) => {
                const active = isNavItemActive(pathname, item.href);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        aria-label={item.ariaLabel}
                        aria-current={active ? "page" : undefined}
                        className="flex h-14 flex-1 items-center justify-center"
                    >
            <span className="relative flex items-center justify-center">
              {item.isProfile ? (
                  userAvatarUrl ? (
                      <Image
                          src={userAvatarUrl}
                          alt=""
                          width={24}
                          height={24}
                          className={`h-6 w-6 rounded-full object-cover ${
                              active ? "ring-2 ring-primary ring-offset-1" : ""
                          }`}
                      />
                  ) : (
                      <UserRound className="h-6 w-6" strokeWidth={active ? 2.25 : 1.75} />
                  )
              ) : (
                  <Icon
                      className={`h-6 w-6 ${active ? "text-primary" : "text-text-secondary"}`}
                      strokeWidth={active ? 2.25 : 1.75}
                  />
              )}
                {item.id === "messages" && <NavBadge badgeKey={"messages"} />}
            </span>
                    </Link>
                );
            })}
        </nav>
    );
}