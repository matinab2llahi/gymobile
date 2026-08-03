// services/profile/profile.service.ts

import { fakeUsers } from "@/services/mocks/users.mock";

export async function getProfileByUsername(
    username: string
) {
    const profile = fakeUsers.find(
        (user) => user.username === username
    );

    return profile ?? null;
}