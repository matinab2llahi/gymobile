import { create } from "zustand";

interface NavBadgeState {
    unreadMessages: number;
    unreadNotifications: number;
    setUnreadMessages: (count: number) => void;
    setUnreadNotifications: (count: number) => void;
}

export const useNavBadgeStore = create<NavBadgeState>((set) => ({
    unreadMessages: 3,
    unreadNotifications: 99,
    setUnreadMessages: (count) => set({ unreadMessages: count }),
    setUnreadNotifications: (count) => set({ unreadNotifications: count }),
}));