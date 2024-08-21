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
  console.log(dataBody)
  const dataToSend = {};

  if (dataBody.user_id) dataToSend.user_id = dataBody.user_id;
  if (dataBody.company_id) dataToSend.company_id = parseInt(dataBody.company_id);
  if (dataBody.job_position_id) dataToSend.job_position_id = parseInt(dataBody.job_position_id);
  if (dataBody.employment_status_id) dataToSend.employment_status_id = parseInt(dataBody.employment_status_id);
  if (dataBody.department_id) dataToSend.department_id = parseInt(dataBody.department_id);
  if (dataBody.full_name) dataToSend.full_name = dataBody.full_name;
  if (dataBody.phone_number) dataToSend.phone_number = dataBody.phone_number;
  if (dataBody.birth_date) dataToSend.birth_date = dataBody.birth_date;
  if (dataBody.role_id) dataToSend.role_id = parseInt(dataBody.role_id);
  if (dataBody.email) dataToSend.email = dataBody.email;
  console.log(dataToSend)

  const response = await axios.post(
    `${apiUrl}/user/create`,
    dataToSend,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const updateUser = async (token, dataBody) => {
  const dataToSend = {};

  if (dataBody.user_id) dataToSend.user_id = dataBody.user_id;
  if (dataBody.company?.company_id) dataToSend.company_id = parseInt(dataBody.company.company_id);
  if (dataBody.job_position?.job_position_id) dataToSend.job_position_id = parseInt(dataBody.job_position.job_position_id);
  if (dataBody.employment_status?.employment_status_id) dataToSend.employment_status_id = parseInt(dataBody.employment_status.employment_status_id);
  if (dataBody.department?.department_id) dataToSend.department_id = parseInt(dataBody.department.department_id);
  if (dataBody.full_name) dataToSend.full_name = dataBody.full_name;
  if (dataBody.phone_number) dataToSend.phone_number = dataBody.phone_number;
  if (dataBody.birth_date) dataToSend.birth_date = dataBody.birth_date;
  if (dataBody.role?.role_id) dataToSend.role_id = parseInt(dataBody.role.role_id);
  if (dataBody.email) dataToSend.email = dataBody.email;
  if (dataBody.is_active !== undefined ) dataToSend.is_active = dataBody.is_active
  if (dataBody.get_notification !== undefined ) dataToSend.get_notification = dataBody.get_notification

  console.log("data body", dataBody)
  console.log("data send", dataToSend)

  const response = await axios.put(
    `${apiUrl}/user/update`,
    dataToSend,
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

export const resetPasswordToDefault = async (token, user_id) => {
  const response = await axios.put(
    `${apiUrl}/user/resetPassword/${user_id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
}
