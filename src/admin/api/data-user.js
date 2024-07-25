import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllUser = async (token, filters) => {
  const body = {};
  if (filters) {
    const { name, jobPosition, company, department, employmentStatus, is_active, user_id } = filters;
    // Buat objek body hanya jika filter tidak kosong
    if (name) body.name = name;
    if (jobPosition && jobPosition.length > 0) body.job_position = jobPosition.map((e) => e.name);
    if (company && company.length > 0) body.company_name = company.map((e) => e.name);
    if (department && department.length > 0) body.department = department.map((e) => e.name);
    if (employmentStatus && employmentStatus.length > 0) body.employment_status = employmentStatus.map((e)=> e.name);
    if (is_active !== undefined) body.is_active = is_active;
    if (user_id) body.user_id = user_id;
  }

  try {
    const response = await axios.post(`${apiUrl}/user`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};


export const getUserById = async (token, user_id) => {
  const response = await axios.post(`${apiUrl}/user`,{
    user_id: user_id
  }, {
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

export const updateUser = async (token, dataBody) => {
  const response = await axios.put(
    `${apiUrl}/user/update`,
    {
      user_id: dataBody.user_id,
      company_id: parseInt(dataBody.company.company_id),
      job_position_id: parseInt(dataBody.job_position.job_position_id),
      employment_status_id: parseInt(dataBody.employment_status.employment_status_id),
      department_id: parseInt(dataBody.department.department_id),
      full_name: dataBody.full_name,
      phone_number: dataBody.phone_number,
      birth_date: dataBody.birth_date,
      role_id: parseInt(dataBody.role.role_id),
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const deleteUsers = async (token, dataBody) => {
  const response = await axios.delete(`${apiUrl}/user/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      user_id: dataBody,
    },
  });

  return response.data.data;
};
