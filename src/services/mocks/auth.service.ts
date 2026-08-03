import { fakeCurrentUser } from "@/services/mocks/auth.mock";

export async function getCurrentUser() {
    return fakeCurrentUser;
}