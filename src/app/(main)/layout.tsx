import {NavigationShell} from "@/components/navigation/NavigationShell";
import {getProfilePageData} from "@/hooks/profile/use-profile-view-model";
import {getCurrentUser} from "@/services/mocks/auth.service";

export  default async function LayoutMain({
                                              children,
                                          }: Readonly<{
    children: React.ReactNode;

}>){

    const result = await getCurrentUser();

    return (
        <>
            <NavigationShell userName={result?.username} userAvatarUrl={"/images/plans/victor-freitas-WvDYdXDzkhs-unsplash.jpg"}>{children}</NavigationShell>
        </>
    )
}