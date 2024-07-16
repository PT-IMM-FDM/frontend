"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import useAuthStore from "../../stores/useAuthStore";
import useDataCompanyStore from "../../stores/useDataCompanyStore";
import { deleteCompany } from "../../api/data-company";

const CACHE_KEY = "dataCompany";
export function DeleteButton({ numSelected, selected }) {
  // State variable to control the visibility of the modal
  const [openModal, setOpenModal] = useState(false);

  // Retrieve the user token from the authentication store
  const { token } = useAuthStore((state) => ({ token: state.token }));

  // Retrieve the user data rows and the setter function from the data users store
  const { rows, setRows, setSelected } = useDataCompanyStore((state) => ({
    rows: state.rows,
    setRows: state.setRows,
    setSelected: state.setSelected,
  }));

  // Function to handle the delete button click event
  const handleDeleteClick = () => {
    if (numSelected <= 0) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  // Function to handle the confirmation of the delete action
  const handleConfimDeleteClick = async (token) => {
    try {
      // Call the API to delete the selected user data
      await deleteCompany(token, selected);

      // Filter out the deleted user data from the rows
      const updatedRows = rows.filter((row) => !selected.includes(row.company_id));

      // Update the rows in the data users store
      setRows(updatedRows);
      setSelected([])

      // Update the local storage with the updated rows
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedRows));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());

      // Close the modal
      setOpenModal(false);
    } catch (error) {
      console.error('Failed to delete users:', error);
      // Handle error state or display error message
    }
  };

  return (
    <>
      <Button
        color="light"
        className="border-gray-300 h-[2.5rem] bg-transparent text-red-500 hover:bg-gray-400"
        onClick={handleDeleteClick}
        disabled={selected?.length <= 0} // Check length of selected array
      >
        <DeleteRoundedIcon sx={{ fontSize: "large" }} />
        <p className="ml-2 text-[12px]">Delete</p>
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this data?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleConfimDeleteClick(token)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
