import { IAuthStore } from "@/types";
import { create } from "zustand";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
