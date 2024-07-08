"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export function DeleteButton({ selected }) {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteClick = () => {
    if (selected <= 0) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <Button
        color="light"
        className="border-gray-300 h-[2.5rem] bg-transparent text-red-500 hover:bg-gray-400"
        onClick={handleDeleteClick}
        disabled={selected <= 0}
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
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
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
