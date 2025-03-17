import { apiClient } from "./auth";

export const getAllCompany = async (token) => {
  const response = await apiClient.get(`/company`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

export const createCompany = async (token, data) => {
  const response = await apiClient.post(
    `/company/create`,
    {
      name: data.company_name,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const updateCompany = async (token, data) => {
  const response = await apiClient.put(`/company/update`, 
    {
      company_id: data.company_id,
      new_name: data.company_name,
    },{
      headers: { Authorization: `Bearer ${token}` },
    })

  return response.data.data;
}

export const deleteCompany = async (token, data) => {
  const response = await apiClient.delete(`/company/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      company_id: data,
    },
  });

  return response.data.data;
};

export const getAllDepartments = async (token) => {
  const response = await apiClient.get(`/company/department`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

export const createDepartment = async (token, data) => {
  const response = await apiClient.post(
    `/company/department/create`,
    {
      name: data.department_name,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const updateDepartment = async (token, data) => {
  const response = await apiClient.put(`/company/department/update`, 
    {
      department_id: data.department_id,
      new_name: data.department_name,
    },{
      headers: { Authorization: `Bearer ${token}` },
    })

  return response.data.data;
}

export const deleteDepartment = async (token, data) => {
  const response = await apiClient.delete(`/company/department/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      department_id: data,
    },
  });

  return response.data.data;
};

export const getAllPositions = async (token) => {
  const response = await apiClient.get(`/company/job-position`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

export const createPosition = async (token, data) => {
  const response = await apiClient.post(
    `/company/job-position/create`,
    {
      name: data.job_position_name,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const updatePosition = async (token, data) => {
  const response = await apiClient.put(`/company/job-position/update`, 
    {
      job_position_id: data.job_position_id,
      new_name: data.job_position_name,
    },{
      headers: { Authorization: `Bearer ${token}` },
    })

  return response.data.data;
}

export const deletePosition = async (token, data) => {
  const response = await apiClient.delete(`/company/job-position/delete`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      job_position_id: data,
    },
  });

  return response.data.data;
};

export const getAllStatusEmployment = async (token) => {
  const response = await apiClient.get(`/company/employment-status`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

export const createStatusEmployment = async (token, data) => {
  const response = await apiClient.post(
    `/company/employment-status/create`,
    {
      name: data.status_employment,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const updateStatus = async (token, data) => {
  const response = await apiClient.put(`/company/employment-status/update`, 
    {
      employment_status_id: data.employment_status_id,
      new_name: data.employment_status_name,
    },{
      headers: { Authorization: `Bearer ${token}` },
    })

  return response.data.data;
}

export const deleteStatusEmployment = async (token, data) => {
  const response = await apiClient.delete(
    `/company/employment-status/delete`,
    {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        employment_status_id: data,
      },
    }
  );

  return response.data.data;
}
