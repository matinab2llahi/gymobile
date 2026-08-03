// services/profile/profile-access.service.ts

export async function canViewProfile(
    currentUserId: number | null,
    profileUserId: number
) {
    // Fake authorization

    return true;
}