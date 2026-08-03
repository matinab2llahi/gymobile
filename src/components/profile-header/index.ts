export interface ProfileSkill {
    id: number;
    title: string;
}

export interface ProfileHeaderProps {
    avatar: string | null;
    username: string;
    teacher_counts: number;
    student_counts: number;
    plans: number;
    bio: string | null;
    skills: ProfileSkill[];
    isOwner: boolean;
}