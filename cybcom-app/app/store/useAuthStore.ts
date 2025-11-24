import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthState = {
  user: User;
  isLoading: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  signIn: (user) => set({ user }),
  signOut: () => set({ user: null }),
}));
