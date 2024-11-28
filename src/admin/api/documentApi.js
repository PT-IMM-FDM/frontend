import axios from "axios";
// import { getAllUser } from "./data-user";

const apiUrl = import.meta.env.VITE_API_URL;

const buildParams = (filters) => {
  const params = {};

  if (filters) {
    const {
      name,
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
    } = filters;

    if (name) params.name = name;
    if (jobPosition && jobPosition.length > 0)
      params.jpid = jobPosition.map((e) => e.id);
    if (company && company.length > 0) params.cid = company.map((e) => e.id);
    if (department && department.length > 0)
      params.did = department.map((e) => e.id);
    if (employmentStatus && employmentStatus.length > 0)
      params.esid = employmentStatus.map((e) => e.id);
    if (fdm_result && fdm_result.length > 0)
      params.fdm_result = fdm_result[0].name;
    if (is_active !== undefined) params.is_active = is_active;
    if (user_id) params.uid = user_id;
    if (attendance_health_result_id) params.ahrid = attendance_health_result_id;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
  }

  return params;
};

export const exportDataUser = async (token, filters) => {
  // TODO : wait for response from server changed
  try {
    let params = buildParams(filters);
    const response = await axios.get(`${apiUrl}/document/list-users`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.error("failed to export data", error);
    throw new Error("Failed to export data");
  }
};

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
  const body = {};
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
      // attendance_health_result_id,
    } = data;

    // if (name) params.name = name;
    if (jobPosition && jobPosition.length > 0)
      body.job_position_name = jobPosition.map((e) => e.name);
    if (company && company.length > 0)
      body.company_name = company.map((e) => e.name);
    if (department && department.length > 0)
      body.department_name = department.map((e) => e.name);
    if (employmentStatus && employmentStatus.length > 0)
      body.employment_status_name = employmentStatus.map((e) => e.name);
    if (fdm_result && fdm_result.length > 0) body.result = fdm_result[0].name;
    if (is_active !== undefined) body.is_active = is_active;
    if (user_id && user_id.length > 0) body.user_id = user_id.map((e) => e.id);
    // if (attendance_health_result_id) body.ahrid = attendance_health_result_id;
    if (startDate) body.startDate = startDate;
    if (endDate) body.endDate = endDate;
  }

  try {
    const response = await axios.post(`${apiUrl}/document/export-fdm`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to export document FDM:", error);
    throw error;
  }
};

export const addAttachment = async (token, attendanceHealthResultId, file) => {
  const url = `${apiUrl}/fdm/addAttachment/${attendanceHealthResultId}`;
  const formData = new FormData();
  formData.append("fdm_attachment_file", file);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading attachment:", error);
    throw error;
  }
};

export const deleteAttachment = async (
  token,
  attendanceHealthResultId,
  attachmentId
) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/fdm/${attendanceHealthResultId}/deleteAttachment/${attachmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { attachmentId }, // Use `data` for DELETE request body if needed
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const addNoteFollowUp = async (
  token,
  attendance_health_result_id,
  note
) => {
  try {
    const response = await axios.put(
      `${apiUrl}/fdm/${attendance_health_result_id}/addNote`,
      { note: note }, // Data to be sent in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Headers configuration
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding Note", error);
  }
};
