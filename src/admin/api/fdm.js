import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getFdm = async (token, body) => {

  const response = await axios.post(`${apiUrl}/fdm`, body, {
        headers: { Authorization: `Bearer ${token}` },
  })

  return response.data.data;
};

