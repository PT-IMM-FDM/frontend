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

export const exportDocumentFDM = async (token, data) => {
  const body = {}
  if (data) {
    const {
      company,
      department,
      jobPosition,
      employmentStatus,
      fdm_result,
      startDate,
      endDate,
      user_id,
      is_active,
      attendance_health_result_id,
    } = data;

    // if (name) params.name = name;
    if (jobPosition && jobPosition.length > 0)
      body.job_position_name = jobPosition.map((e) => e.name);
    if (company && company.length > 0) body.company_name = company.map((e) => e.name);
    if (department && department.length > 0)
      body.department_name = department.map((e) => e.name);
    if (employmentStatus && employmentStatus.length > 0)
      body.employment_status_name = employmentStatus.map((e) => e.name);
    if (fdm_result && fdm_result.length > 0)
      body.result = fdm_result.map((e) => e.name);
    if (is_active !== undefined) body.is_active = is_active;
    if (user_id && fdm_result.length > 0) body.user_id = user_id.map((e) => e.id);
    // if (attendance_health_result_id) body.ahrid = attendance_health_result_id;
    if (startDate) body.startDate = startDate;
    if (endDate) body.endDate = endDate;
  }

  console.log(body)

  try {
    const response = await axios.post(`${apiUrl}/document/export-fdm`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data)
    return response.data.data
  } catch (error) {
    console.error("Failed to export document FDM:", error);
    throw error;
  }
}
