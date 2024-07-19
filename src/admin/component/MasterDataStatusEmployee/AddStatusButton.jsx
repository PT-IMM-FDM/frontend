import { Button, Modal, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import useAuthStore from "../../stores/useAuthStore";
import { createPosition, createStatusEmployment } from "../../api/data-company";
import useDataCompanyStore from "../../stores/useDataCompanyStore";

const CACHE_KEY = "dataStatus";

export function AddStatusButton() {
  // Fetch the token from the authentication store
  const { token } = useAuthStore((state) => ({ token: state.token }));

  // Fetch the user data from the data users store
  const { rowsStatus, setRowsStatus } = useDataCompanyStore((state) => ({
    rowsStatus: state.rowsStatus,
    setRowsStatus: state.setRowsStatus,
  }));

  // State variables for managing the modal visibility and form data
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    status_employment: ''
  });

  // Function to close the modal and reset the form data
  function onCloseModal() {
    setOpenModal(false);
    setFormData({
      status_employment: ''
    });
  }

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({[name]: value,});
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the API to create a new user with the provided form data
    const newDataStatus = await createStatusEmployment(token, formData);

    // Update the user data in the store
    setRowsStatus([...rowsStatus, newDataStatus]);

    // Cache the updated user data in the local storage
    localStorage.setItem(CACHE_KEY, JSON.stringify([...rowsStatus, newDataStatus]));
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
        <p className="ml-1 text-[12px]">Tambah Status</p>
      </Button>

      {/* Modal */}
      <Modal dismissible show={openModal} size="lg" onClose={onCloseModal}>
        <Modal.Header style={{ fontSize: "12px" }}>
          Tambah Status
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* nama perusahaan */}
            <div>
              <label
                htmlFor="status_employment"
                className="block text-[12px] font-medium text-gray-700"
              >
                Nama Status
              </label>
              <TextInput
                id="status_employment"
                name="status_employment"
                placeholder="Enter a Status Employement"
                value={formData.status_employment}
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
                <p className="text-[12px]">Tambah Status</p>
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
