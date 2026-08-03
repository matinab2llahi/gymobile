export interface Profile {
    id: number;
    username: string;
    name: string;
    avatar: string;
    role: "coach" | "student";
    bio?: string;
}

export const fakeUsers: Profile[] = [
    {
        id: 1,
        username: "ali",
        name: "Ali Ahmadi",
        avatar: "/images/ali.jpg",
        role: "coach",
        bio: "Professional fitness coach",
    },

    {
        id: 2,
        username: "mohammad",
        name: "Mohammad Rezaei",
        avatar: "/images/mohammad.jpg",
        role: "student",
        bio: "Fitness enthusiast",
    },

    {
        id: 3,
        username: "sara",
        name: "Sara",
        avatar: "/images/sara.jpg",
        role: "coach",
        bio: "Personal trainer",
    },
];