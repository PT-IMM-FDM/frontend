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
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const { token } = await loginApi(email, password);
          set({ token, loading: false });
          console.log(token);
        } catch (error) {
          let errorMessage = "An error occurred";
          if (error.response?.data?.status === "VALIDATION_ERROR") {
            errorMessage = error.response.data.errors[0].password;
          } else {
            errorMessage = error.response?.data?.message || errorMessage;
          }
          set({ error: errorMessage, loading: false });
        }
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
