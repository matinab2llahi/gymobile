import {getProfileByUsername} from "@/services/mocks/profile.service";
import {getCurrentUser} from "@/services/mocks/auth.service";
import {canViewProfile} from "@/services/mocks/profile-access.service";

export async function getProfilePageData(
    username: string
) {
    // Step 1
    const profile =
        await getProfileByUsername(username);

    // Step 2
    if (!profile) {
        return {
            status: "not-found" as const,
        };
    }

    // Step 3
    const currentUser =
        await getCurrentUser();

    // Step 4
    const canView =
        await canViewProfile(
            currentUser?.id ?? null,
            profile.id
        );

    // Step 5
    if (!canView) {
        return {
            status: "forbidden" as const,
        };
    }

    // Step 6
    const isOwner =
        currentUser?.id === profile.id;

    // Step 7
    return {
        status: "success" as const,
        profile,
        isOwner,
    };
}