import {NavItem} from "@/types/navigation/navigation.types";
import {paths} from "@/routes/paths";
import {Dumbbell, Home, Search, Send} from "lucide-react";
import {SidebarItem} from "@/components/navigation/Sidebar/SidebarItem";
import {NavigationShellProps} from "@/components/navigation/NavigationShell";

interface NavsLinksProps {
    registerLabel: (el: (HTMLSpanElement | null)) => void
    isActive: (href: string) => boolean
    userAvatarUrl?: NavigationShellProps["userAvatarUrl"];
    userName?: NavigationShellProps["userName"];
}

export const NavsLinks = ({isActive , userName , userAvatarUrl , registerLabel} : NavsLinksProps)=>{
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

    // useEffect(() => {
    //     // ...
    // }, [userName]);

    return(
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
    )
}