// mocks/auth.mock.ts

// models/auth/auth.model.ts

export interface CurrentUser {
    id: number;
    username: string;
    name: string;
    role: "coach" | "student";
}

export const fakeCurrentUser : CurrentUser= {
    id: 2,
    username: "mohammad",
    name: "Mohammad Rezaei",
    role: "student",
};