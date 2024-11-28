"use client";

import { Button } from "flowbite-react";
import { useState } from "react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
import { PiExportBold } from "react-icons/pi";
import { Box } from "@mui/material";
import useAuthStore from "../../stores/useAuthStore";
import { exportDataUser } from "../../api/documentApi";
import useDataUsersStore from "../../stores/useDataUsersStore";

export function ExportButton() {
  // const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { filters } = useDataUsersStore();
  const { token } = useAuthStore((state) => ({ token: state.token }));

  const handleClick = async () => {
    setLoading(true);
    try {
      const urlFile = await exportDataUser(token, filters);
      if (urlFile) {
        window.open(urlFile, "_blank");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          }}>
          <img src="/Loader-1.gif" alt="loader" className="h-[5rem] z-10" />
        </Box>
      )}
      <Button
        color="light"
        className="h-[2.5rem] text-gray-700 bg-transparent  border-0 md:border  border-gray-300 hover:bg-gray-400"
        onClick={() => handleClick()}>
        <PiExportBold className="text-lg" />
        <p className="ml-2 text-[12px]">Export</p>
      </Button>
    </>
  );
}
