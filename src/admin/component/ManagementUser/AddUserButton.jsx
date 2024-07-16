import { Button, Modal, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { createUser } from "../../api/data-user";
import useAuthStore from "../../stores/useAuthStore";
import useDataUsersStore from "../../stores/useDataUsersStore";

const CACHE_KEY = "usersData";
// const CACHE_EXPIRATION = 60 * 60 * 1000;

export function AddUserButton() {
  // Fetch the token from the authentication store
  const { token } = useAuthStore((state) => ({ token: state.token }));

  // Fetch the user data from the data users store
  const { rows, setRows } = useDataUsersStore((state) => ({
    rows: state.rows,
    setRows: state.setRows,
  }));

  // State variables for managing the modal visibility and form data
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
  });

  // Function to close the modal and reset the form data
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
    });
  }

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the API to create a new user with the provided form data
    const newDataUser = await createUser(token, formData);

    // Update the user data in the store
    setRows([...rows, newDataUser]);

    // Cache the updated user data in the local storage
    localStorage.setItem(CACHE_KEY, JSON.stringify([...rows, newDataUser]));
    localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());

    // Close the modal after successful submission
    onCloseModal();
  };

  return (
    <>
      {/* Button */}
      <Button
        color="purple"
        className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
        onClick={() => setOpenModal(true)}
      >
        <LuUser className="text-lg" />
        <p className="ml-1 text-[12px]">Tambah Pengguna</p>
      </Button>

      {/* Modal */}
      <Modal dismissible show={openModal} size="2xl" onClose={onCloseModal}>
        <Modal.Header style={{ fontSize: "12px" }}>
          Tambah Pengguna
        </Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* nama lengkap */}
            <div>
              <label
                htmlFor="full_name"
                className="block text-[12px] font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <TextInput
                id="full_name"
                name="full_name"
                placeholder="Enter a fullname"
                value={formData.full_name}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* nomor telepon */}
            <div>
              <label
                htmlFor="phone_number"
                className="block text-[12px] font-medium text-gray-700"
              >
                No. Telepon
              </label>
              <TextInput
                id="phone_number"
                name="phone_number"
                placeholder="ex. 081234567899"
                value={formData.phone_number}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* nama perusahaan */}
            <div>
              <label
                htmlFor="company_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Nama Perusahaan
              </label>
              <Select
                id="company_id"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Company</option>
                <option value="1">Company 1</option>
                <option value="2">Company 2</option>
                <option value="3">Company 3</option>
              </Select>
            </div>

            {/* nama departemen */}
            <div>
              <label
                htmlFor="department_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Departemen
              </label>
              <Select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Department</option>
                <option value="1">Department 1</option>
                <option value="2">Department 2</option>
                <option value="3">Department 3</option>
              </Select>
            </div>

            {/* posisi */}
            <div>
              <label
                htmlFor="job_position_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Posisi
              </label>
              <Select
                id="job_position_id"
                name="job_position_id"
                value={formData.job_position_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Job Position</option>
                <option value="1">Position 1</option>
                <option value="2">Position 2</option>
                <option value="3">Position 3</option>
              </Select>
            </div>

            {/* status pekerjaan */}
            <div>
              <label
                htmlFor="employment_status_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Status Pekerjaan
              </label>
              <Select
                id="employment_status_id"
                name="employment_status_id"
                value={formData.employment_status_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Employment Status</option>
                <option value="1">Status 1</option>
                <option value="2">Status 2</option>
                <option value="3">Status 3</option>
              </Select>
            </div>

            {/* tanggal lahir */}
            <div>
              <label
                htmlFor="birth_date"
                className="block text-[12px] font-medium text-gray-700"
              >
                Birth Date
              </label>
              <TextInput
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

            {/* role */}
            <div>
              <label
                htmlFor="role"
                className="block text-[12px] font-medium text-gray-700"
              >
                Role
              </label>
              <Select
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
                <option value="2">Monitoring</option>
                <option value="3">User</option>
              </Select>
            </div>
            <div className="col-span-2 flex gap-2 justify-end">
              <Button
                color="purple"
                className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
                onClick={handleSubmit}
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
    </>
  );
}
