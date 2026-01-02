import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("preferredTheme") || "forest",
  setTheme: (newTheme) => {
    localStorage.setItem("preferredTheme", newTheme);
    set({ theme: newTheme });
  },
}));
