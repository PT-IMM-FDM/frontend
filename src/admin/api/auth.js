import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL;

export const loginApi = async (email_or_phone_number, password) => {
  const response = await axios.post(`${apiUrl}/auth/login`, {
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
  const response = await axios.get(`${apiUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
