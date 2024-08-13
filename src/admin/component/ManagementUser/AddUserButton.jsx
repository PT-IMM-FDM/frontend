import { Button, Modal, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { createUser } from "../../api/data-user";
import {
  getAllCompany,
  getAllDepartments,
  getAllPositions,
  getAllStatusEmployment,
} from "../../api/data-company";
import useAuthStore from "../../stores/useAuthStore";
import useDataUsersStore from "../../stores/useDataUsersStore";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

const CACHE_KEY = "usersData";

export function AddUserButton({ isMobile }) {
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { rows, setRows } = useDataUsersStore((state) => ({
    rows: state.rows,
    setRows: state.setRows,
  }));
  const [departments, setDepartments] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    company_id: "",
    job_position_id: "",
    employment_status_id: "",
    department_id: "",
    full_name: "",
    phone_number: "",
    birth_date: "",
    role_id: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const fetchedCompanies = await getAllCompany(token);
        setCompanies(fetchedCompanies);
        localStorage.setItem("dataCompany", JSON.stringify(fetchedCompanies));
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      }

      try {
        const fetchedDepartments = await getAllDepartments(token);
        setDepartments(fetchedDepartments);
        localStorage.setItem(
          "dataDepartments",
          JSON.stringify(fetchedDepartments)
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }

      try {
        const fetchedPositions = await getAllPositions(token);
        setJobPositions(fetchedPositions);
        localStorage.setItem(
          "dataJobPositions",
          JSON.stringify(fetchedPositions)
        );
      } catch (error) {
        console.error("Error fetching job positions:", error);
        setJobPositions([]);
      }

      try {
        const fetchedStatuses = await getAllStatusEmployment(token);
        setEmploymentStatuses(fetchedStatuses);
        localStorage.setItem("dataStatus", JSON.stringify(fetchedStatuses));
      } catch (error) {
        console.error("Error fetching employment statuses:", error);
        setEmploymentStatuses([]);
      }
    };

    const storedDepartments = localStorage.getItem("dataDepartments");
    const storedJobPositions = localStorage.getItem("dataJobPositions");
    const storedStatuses = localStorage.getItem("dataStatus");
    const storedCompanies = localStorage.getItem("dataCompany");

    if (
      !storedDepartments ||
      !storedJobPositions ||
      !storedStatuses ||
      !storedCompanies
    ) {
      fetchDataFromAPI();
    } else {
      setDepartments(JSON.parse(storedDepartments));
      setJobPositions(JSON.parse(storedJobPositions));
      setEmploymentStatuses(JSON.parse(storedStatuses));
      setCompanies(JSON.parse(storedCompanies));
    }
  }, [token]);

  function onCloseModal() {
    setOpenModal(false);
    setFormData({
      company_id: "",
      job_position_id: "",
      employment_status_id: "",
      department_id: "",
      full_name: "",
      phone_number: "",
      birth_date: "",
      role_id: "",
      email: "",
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const newDataUser = await createUser(token, formData);
      setRows([...rows, newDataUser]);
      localStorage.setItem(CACHE_KEY, JSON.stringify([...rows, newDataUser]));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());
      toast.success("User created successfully.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
      onCloseModal();
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response) {
        toast.error(error.response.data.message, {
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
          theme: "colored",
        });
      } else {
        toast.error(error.message, {
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
          theme: "colored",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        color={isMobile ? "light" : "purple"}
        className="h-[2.5rem] border-[1px] flex items-center justify-center space-x-2 px-2"
        onClick={() => setOpenModal(true)}
      >
        <FaUserPlus className="text-lg mr-2" />
        <div className="text-[10px] whitespace-nowrap">Tambah Pengguna</div>
      </Button>

      <Modal
        className="z-[999]"
        dismissible
        show={openModal}
        size="2xl"
        onClose={onCloseModal}
      >
        {loading && (
          <Box
            sx={{
              position: "fixed",
              width: "100%",
              height: "100%",
              zIndex: 999,
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(240, 240, 240, 0.7)",
            }}
          >
            <img src="/Loader-1.gif" alt="loader" className="h-[5rem] z-10" />
          </Box>
        )}
        <Modal.Header style={{ fontSize: "12px" }}>
          Tambah Pengguna
        </Modal.Header>
        <Modal.Body>
          <form
            className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6"
            onSubmit={handleSubmit}
          >
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="full_name"
                className="block w-full text-[12px] font-medium text-gray-700"
              >
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
                placeholder="Enter a fullname"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* No. Telepon */}
            <div className="min-w-full">
              <label
                htmlFor="phone_number"
                className="block w-full text-[12px] font-medium text-gray-700"
              >
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                id="phone_number"
                name="phone_number"
                placeholder="ex. 081234567899"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[12px] font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Nama Perusahaan */}
            <div>
              <label
                htmlFor="company_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Nama Perusahaan <span className="text-red-500">*</span>
              </label>
              <select
                id="company_id"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Departemen */}
            <div>
              <label
                htmlFor="department_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Departemen <span className="text-red-500">*</span>
              </label>
              <select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option
                    key={department.department_id}
                    value={department.department_id}
                  >
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Posisi */}
            <div>
              <label
                htmlFor="job_position_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Posisi <span className="text-red-500">*</span>
              </label>
              <select
                id="job_position_id"
                name="job_position_id"
                value={formData.job_position_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Job Position</option>
                {jobPositions.map((position) => (
                  <option
                    key={position.job_position_id}
                    value={position.job_position_id}
                  >
                    {position.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Pekerjaan */}
            <div>
              <label
                htmlFor="employment_status_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Status Pekerjaan <span className="text-red-500">*</span>
              </label>
              <select
                id="employment_status_id"
                name="employment_status_id"
                value={formData.employment_status_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Employment Status</option>
                {employmentStatuses.map((status) => (
                  <option
                    key={status.employment_status_id}
                    value={status.employment_status_id}
                  >
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Birth Date */}
            <div>
              <label
                htmlFor="birth_date"
                className="block text-[12px] font-medium text-gray-700"
              >
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <input
                id="birth_date"
                name="birth_date"
                type="date"
                placeholder="2003/09/27"
                value={formData.birth_date}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-[12px] font-medium text-gray-700"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Full Viewer</option>
                <option value="3">Viewer</option>
                <option value="4">User</option>
              </select>
            </div>
            <div className="mt-2 md:col-span-2 flex gap-2 justify-end">
              <Button
                color="purple"
                className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
                type="submit"
              >
                <p className="text-[12px]">Tambah Pengguna</p>
              </Button>
              <Button
                color="failure"
                className="h-[2.5rem] text-white border-[1px]"
                onClick={onCloseModal}
              >
                <p className="text-[12px]">Batal</p>
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
