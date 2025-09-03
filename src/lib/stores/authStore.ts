import { IAuthStore } from "@/types/store";
import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  token: null,

  login: (email, password) => {
    if (email === "admin@gmail.com" && password === "admin") {
      const fakeUser = { id: "1", name: "Dan", avatarUrl: "https://avatar.iran.liara.run/public/10" };
      const fakeToken = "some-token";
      Cookies.set("token", fakeToken);
      set({ user: fakeUser, token: fakeToken });
      return true;
    }
    return false;
  },

  signUp: (email, username, password, repeatPassword) => {
    return true;
  },

  logout: () => {
    Cookies.remove("token");
    set({ user: null, token: null });
  },
}));
