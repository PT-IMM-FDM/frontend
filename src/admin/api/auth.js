import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Session Expired! Please relogin");
      logoutApi();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const loginApi = async (email_or_phone_number, password) => {
  const response = await apiClient.post("/auth/login", {
    email_or_phone_number,
    password,
  });
  const { token } = response.data.data;
  Cookies.set("token", token);
  return response.data.data;
};

export const logoutApi = () => {
  Cookies.remove("token");
  localStorage.clear();
};

export const getCurrentLogin = async (token) => {
  try {
    const response = await apiClient.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      // Handle other errors
      console.error("An error occurred:", error);
      throw error;
    }
  }
};
