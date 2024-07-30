"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { PiExportBold } from "react-icons/pi";
import { exportDocumentFDM } from "../../api/documentApi";
import useAuthStore from "../../stores/useAuthStore"
import useDataFDM from "../../stores/useDataFDM";

export function ExportButton() {
  const [openModal, setOpenModal] = useState(false);
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { filters } = useDataFDM(); // Get filters from store

  const handleClick = async () => {
    const urlFile = await exportDocumentFDM(token, filters);
    if (urlFile) {
      window.open(urlFile, '_blank');
    }
  }

  return (
    <>
      <Button
        color="light"
        className="h-[2.5rem] text-gray-700 bg-transparent border-gray-300 border-[1px] hover:bg-gray-400"
        onClick={() => handleClick()}
      >
        <PiExportBold className="text-lg"/>
        <p className="ml-2 text-[12px]">Export</p>
      </Button>
      {/* <Modal
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
      </Modal> */}
    </>
  );
}
