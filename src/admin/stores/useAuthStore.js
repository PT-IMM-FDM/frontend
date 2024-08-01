import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, logoutApi } from "../api/auth";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      error: null,
      loading: false,
      setUser: (newUser) => set({ user: newUser }),
      setToken: (newToken) => set({ token: newToken }),
      setError: (newError) => set({ error: newError }),
      setLoading: (loading) => set({ loading }),
      login: async (email_or_phone_number, password) => {
          set({ loading: true, error: null });
          const { token } = await loginApi(email_or_phone_number, password);
          set({ token: token});
      },
      logout: () => {
        logoutApi();
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
