import { apiClient } from "./auth";

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
    const response = await apiClient.get(`/document/list-users`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.error("failed to export data", error);
    throw new Error("Failed to export data");
  }
};

// export const exportDataUser = async (token, filters) => {
//   try {
//     const params = buildParams(filters);

//     // Request API untuk mendapatkan file sebagai blob
//     const response = await apiClient.get(`/document/list-users`, {
//       params,
//       headers: { Authorization: `Bearer ${token}` },
//       responseType: "blob", // Tambahkan responseType 'blob'
//     });

//     // Buat URL dari blob respons
//     const blob = new Blob([response.data], {
//       type: response.headers["content-type"],
//     });
//     const fileUrl = window.URL.createObjectURL(blob);

//     // Buat elemen <a> untuk memulai unduhan
//     const link = document.createElement("a");
//     link.href = fileUrl;

//     // Tetapkan nama file (bisa dari header atau default)
//     const contentDisposition = response.headers["content-disposition"];
//     let fileName = "Exported_Data.xlsx"; // Nama default
//     if (contentDisposition) {
//       const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
//       if (fileNameMatch && fileNameMatch[1]) {
//         fileName = fileNameMatch[1];
//       }
//     }
//     link.setAttribute("download", fileName);

//     // Tambahkan elemen ke DOM dan klik untuk memulai unduhan
//     document.body.appendChild(link);
//     link.click();

//     // Bersihkan elemen dan blob URL
//     link.remove();
//     window.URL.revokeObjectURL(fileUrl);
//   } catch (error) {
//     console.error("Failed to export data", error);
//     throw new Error("Failed to export data");
//   }
// };

export const downloadTemplate = async (token) => {
  const response = apiClient.get(`/document/template-users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append("file_of_users", file);

  try {
    const response = await apiClient.post(
      `/document/import-users`,
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
    const response = await apiClient.post(`/document/export-fdm`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to export document FDM:", error);
    throw error;
  }
};

export const addAttachment = async (token, attendanceHealthResultId, file) => {
  const url = `/fdm/addAttachment/${attendanceHealthResultId}`;
  const formData = new FormData();
  formData.append("fdm_attachment_file", file);

  try {
    const response = await apiClient.post(url, formData, {
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
    const response = await apiClient.delete(
      `/fdm/${attendanceHealthResultId}/deleteAttachment/${attachmentId}`,
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
    const response = await apiClient.put(
      `/fdm/${attendance_health_result_id}/addNote`,
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
