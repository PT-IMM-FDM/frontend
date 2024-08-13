"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import useAuthStore from "../../stores/useAuthStore";
import useDataCompanyStore from "../../stores/useDataCompanyStore";
import { deleteCompany, deleteDepartment } from "../../api/data-company";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

const CACHE_KEY = "dataDepartments";

export function DeleteButton({ numSelected, selected }) {
  // State variable to control the visibility of the modal
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Retrieve the user token from the authentication store
  const { token } = useAuthStore((state) => ({ token: state.token }));

  // Retrieve the user data rows and the setter function from the data users store
  const { rowsDepartment, setRowsDepartment, setSelected } = useDataCompanyStore((state) => ({
    rowsDepartment: state.rowsDepartment,
    setRowsDepartment: state.setRowsDepartment,
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
    setLoading(true);
    try {
      // Call the API to delete the selected user data
      await deleteDepartment(token, selected);

      // Filter out the deleted user data from the rows
      const updatedRows = rowsDepartment.filter((row) => !selected.includes(row.department_id));

      // Update the rows in the data users store
      setRowsDepartment(updatedRows);
      setSelected([])

      // Update the local storage with the updated rows
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedRows));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());

      // Close the modal
      setOpenModal(false);
      toast.success("Department Deleted Successfully.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored"
      });
    } catch (error) {
      console.error('Failed to delete Department:', error);
      toast.error("Failed to Delete Department.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored"
      });
      // Handle error state or display error message
    } finally {
      setLoading(false);
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
        <p className="hidden md:block ml-2 text-[12px]">Delete</p>
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="z-[999]"
      > {loading && (
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
