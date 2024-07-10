import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUser = async (token) => {
  const response = await axios.get(`${apiUrl}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const createUser = async (token, dataBody) => {
  const response = await axios.post(
    `${apiUrl}/user/create`,
    {
      company_id: parseInt(dataBody.company_id),
      job_position_id: parseInt(dataBody.job_position_id),
      employment_status_id: parseInt(dataBody.employment_status_id),
      department_id: parseInt(dataBody.department_id),
      full_name: dataBody.full_name,
      phone_number: dataBody.phone_number,
      birth_date: dataBody.birth_date,
      role_id: parseInt(dataBody.role_id),
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const deleteUsers = async (token, dataBody) => {
  // console.log(dataBody);
  const response = await axios.delete(`${apiUrl}/user/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      user_id: dataBody,
    },
  });

  return response.data.data;
};
