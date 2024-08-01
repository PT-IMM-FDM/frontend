import axios from "axios";

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
      params.fdm_result = fdm_result.map((e) => e.id);
    if (is_active !== undefined) params.is_active = is_active;
    if (user_id) params.uid = user_id;
    if (attendance_health_result_id) params.ahrid = attendance_health_result_id;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
  }

  return params;
};

export const getFdm = async (token, filters) => {
  try {
    const params = buildParams(filters);
    const response = await axios.get(`${apiUrl}/fdm`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const resultFDMCount = async (token, filters) => {
  try {
    const params = buildParams(filters);
    // console.log(params)
    if (params) {
      // console.log("test")
      params.startDate = new Date()
      params.endDate = new Date()
      // console.log(params)
    }
    // console.log(params)
    const response = await axios.get(`${apiUrl}/fdm/countResult`, {
      params: params,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
};

export const getTotalResponden = async (token, filters) => {
  try {
    const params = buildParams(filters);
    console.log(params)
    const response = await axios.get(`${apiUrl}/fdm/countFilledToday`, {
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
    const response = await axios.get(`${apiUrl}/fdm/usersNotFilledToday`, {
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
    const response = await axios.get(
      `${apiUrl}/fdm/response/${user_id}/${attendance_health_result_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch FDM response details: ${error}`);
  }
};
