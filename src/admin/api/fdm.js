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
      result,
      startDate,
      endDate,
      user_id,
      is_active,
      attendance_health_result_id,
      page,
    } = filters;

    if (name) params.name = name;
    if (jobPosition && jobPosition.length > 0)
      params.jpid = jobPosition.map((e) => e.id);
    if (company && company.length > 0) params.cid = company.map((e) => e.id);
    if (department && department.length > 0)
      params.did = department.map((e) => e.id);
    if (employmentStatus && employmentStatus.length > 0)
      params.esid = employmentStatus.map((e) => e.id);
    if (result && result.length > 0) params.result = result[0].name;
    if (is_active !== undefined) params.is_active = is_active;
    if (user_id) params.uid = user_id;
    if (attendance_health_result_id) params.ahrid = attendance_health_result_id;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (page) params.page = page;
  }

  return params;
};

export const getFdm = async (token, filters) => {
  try {
    const params = buildParams(filters);

    const response = await apiClient.get("/fdm", {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const countResultDepartemen = async (token, filters) => {
  try {
    let params = buildParams(filters);
    const { did, startDate, endDate } = params;

    const today = new Date().toISOString().split("T")[0];
    const finalParams = {
      startDate: startDate || today,
      endDate: endDate || today,
      did: did || undefined,
    };

    const response = await apiClient.get("/fdm/countResult", {
      params: finalParams,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
};

export const countResult = async (token, filters) => {
  try {
    let params = buildParams(filters);
    const { startDate, endDate } = params;

    // const today = new Date().toLocaleDateString();
    const finalParams = {
      startDate: startDate || null,
      endDate: endDate || null,
    };

    const response = await apiClient.get(`/fdm/countResult`, {
      params: finalParams,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const countResultTable = async (token, filters) => {
  try {
    let params = buildParams(filters);

    const response = await apiClient.get(`/fdm/countResult`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const countFilledToday = async (token, filters) => {
  try {
    const params = buildParams(filters);
    const response = await apiClient.get(`/fdm/countFilledToday`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const getUserNotFilled = async (token, filters) => {
  try {
    const params = buildParams(filters);
    const response = await apiClient.get(`/fdm/usersNotFilledToday`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const getFDMResponseDetails = async (
  token,
  user_id,
  attendance_health_result_id
) => {
  try {
    const response = await apiClient.get(
      `/fdm/response/${user_id}/${attendance_health_result_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch FDM response details: ${error}`);
  }
};
