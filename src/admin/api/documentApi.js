import axios from "axios";
import { getAllUser } from "./data-user";

const apiUrl = import.meta.env.VITE_API_URL;

export const downloadTemplate = async (token) => {
  const response = axios.get(`${apiUrl}/document/template-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append("file_of_users", file);

  try {
    const response = await axios.post(
      `${apiUrl}/document/import-users`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to upload file:", response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
