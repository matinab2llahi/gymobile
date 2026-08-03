import {getProfilePageData} from "@/hooks/profile/use-profile-view-model";
import {notFound} from "next/navigation";
import {ProfileHeader} from "@/components/profile-header/ProfileHeader";
import {ProfileHeaderProps} from "@/components/profile-header";

const fakeProfileVisitor: ProfileHeaderProps = {
    avatar: "/images/plans/danielle-cerullo-CQfNt66ttZM-unsplash.jpg",
    username: "coach_neda",
    teacher_counts: 2,
    student_counts: 45,
    plans: 6,
    bio: "test",
    skills: [
        { id: 1, title: "Yoga" },
        { id: 2, title: "Mobility" },
    ],
    isOwner: true,
};

export default async function LayoutProfile({
                                                children,
                                                params,
                                            }: Readonly<{
    children: React.ReactNode;
    params: Promise<{
        username: string;
    }>;
}>){

    const { username } = await params;

    const result =
        await getProfilePageData(username);

    if (result.status === "not-found") {
        notFound();
    }

    if (result.status === "forbidden") {
        return <>دسترسی نداری</>;
    }

    return (
        <>
            <ProfileHeader {...fakeProfileVisitor}  />
            <br/>
            {children}
        </>
    );
}