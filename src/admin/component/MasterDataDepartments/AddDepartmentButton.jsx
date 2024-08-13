import { Button, Modal, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import useAuthStore from "../../stores/useAuthStore";
import { createDepartment } from "../../api/data-company";
import useDataCompanyStore from "../../stores/useDataCompanyStore";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

const CACHE_KEY = "dataDepartments";

export function AddDepartmentButton() {
  // Fetch the token from the authentication store
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const [loading, setLoading] = useState(false);

  // Fetch the user data from the data users store
  const { rowsDepartment, setRowsDepartment } = useDataCompanyStore(
    (state) => ({
      rowsDepartment: state.rowsDepartment,
      setRowsDepartment: state.setRowsDepartment,
    })
  );

  // State variables for managing the modal visibility and form data
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    department_name: "",
  });

  // Function to close the modal and reset the form data
  function onCloseModal() {
    setOpenModal(false);
    setFormData({
      department_name: "",
    });
  }

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Call the API to create a new user with the provided form data
      const newDataDepartment = await createDepartment(token, formData);

      // Update the user data in the store
      setRowsDepartment([...rowsDepartment, newDataDepartment]);

      // Cache the updated user data in the local storage
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify([...rowsDepartment, newDataDepartment])
      );
      localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());

      // Close the modal after successful submission
      onCloseModal();
      toast.success("Department Created Successfully.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored"
      });
    } catch (error) {
      console.error("Failed to create department",error);
      toast.error("Failed to Create Department.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button */}
      <Button
        color="purple"
        className="h-[2.5rem] bg-purple-700 text-white border-[1px] flex items-center"
        onClick={() => setOpenModal(true)}
      >
        <FaPlus className="text-md my-auto" />
        <p className="hidden md:block ml-2 text-[12px]">Tambah Departemen</p>
      </Button>

      {/* Modal */}
      <Modal className="z-[999]"dismissible show={openModal} size="lg" onClose={onCloseModal}>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: 9999,
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(243, 244, 246, 0.7)",
          }}
        >
          <img src="/Loader-1.gif" alt="loader" className="h-[5rem] z-10" />
        </Box>
      )}
        <Modal.Header style={{ fontSize: "12px" }}>
          Tambah Departemen
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* nama perusahaan */}
            <div>
              <label
                htmlFor="department_name"
                className="block text-[12px] font-medium text-gray-700"
              >
                Nama Departemen
              </label>
              <TextInput
                id="department_name"
                name="department_name"
                placeholder="Enter a department name"
                value={formData.department_name}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <div className="col-span-2 flex gap-2 justify-end">
              <Button
                color="purple"
                className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
                type="submit"
              >
                <p className="text-[10px] md:text-[12px]">Tambah Departemen</p>
              </Button>
              <Button
                color="failure"
                className="h-[2.5rem] text-white border-[1px]"
                onClick={onCloseModal}
              >
                <p className="text-[10px] md:text-[12px]">Batal</p>
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
