"use client";

import { Button, Modal } from "flowbite-react";
import { useState, useCallback } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { deleteUsers } from "../../api/data-user";
import useAuthStore from "../../stores/useAuthStore";
import useDataUsersStore from "../../stores/useDataUsersStore";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CACHE_KEY = "usersData";

export function DeleteButton({ numSelected, selected }) {
  const [openModal, setOpenModal] = useState(false);
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { rows, setRows, setSelected } = useDataUsersStore((state) => ({
    rows: state.rows,
    setRows: state.setRows,
    setSelected: state.setSelected,
  }));

  const [loading, setLoading] = useState(false);

  const handleDeleteClick = () => {
    if (numSelected <= 0) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  const handleConfimDeleteClick = useCallback(async () => {
    setLoading(true);
    try {
      await deleteUsers(token, selected);
      const updatedRows = rows.filter((row) => !selected.includes(row.user_id));
      setRows(updatedRows);
      setSelected([]);
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedRows));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());
      setOpenModal(false);
      toast.success("User deleted successfully.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      console.error("Failed to delete users:", error);
      toast.error("Failed to delete users.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  }, [token, selected, rows, setRows, setSelected]);

  return (
    <>
      {/* <ToastContainer /> */}
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
      <Button
        color="light"
        className="border-0 md:border border-gray-300 h-[2.5rem] bg-transparent text-red-500 hover:bg-gray-400"
        onClick={handleDeleteClick}
        disabled={selected.length <= 0}
      >
        <DeleteRoundedIcon sx={{ fontSize: "large" }} />
        <p className="hidden lg:block ml-2 text-[12px]">Delete</p>
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
              <Button color="failure" onClick={handleConfimDeleteClick}>
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
