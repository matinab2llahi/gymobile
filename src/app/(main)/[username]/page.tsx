import {getProfilePageData} from "@/hooks/profile/use-profile-view-model";
import {notFound} from "next/navigation";


export default async function ProfilePage(
    {
                                              params,
                                          }: {
    params: Promise<{
        username: string;
    }>;
}
) {
    const { username } = await params;

    const result =
        await getProfilePageData(username);

    if (result.status === "not-found") {
        notFound();
    }

    if (result.status === "forbidden") {
        return <>دسترسی نداری عزیز</>;
    }

    return (
        <> {result.isOwner ? "پیح مال تو هست" : " پیج مال تو نیست" }</>
    );
}