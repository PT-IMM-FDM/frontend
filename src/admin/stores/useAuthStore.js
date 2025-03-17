import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, logoutApi } from "../api/auth";

const encode = (data) => btoa(JSON.stringify(data)); // Encode ke Base64
const decode = (data) => {
  try {
    return JSON.parse(atob(data)); // Decode dari Base64
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
};

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
        try {
          const { token } = await loginApi(email_or_phone_number, password);
          set({ token });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ loading: false });
        }
      },
      logout: () => {
        logoutApi();
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (key) => {
          const storedValue = localStorage.getItem(key);
          return storedValue ? decode(storedValue) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, encode(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

export default useAuthStore;
