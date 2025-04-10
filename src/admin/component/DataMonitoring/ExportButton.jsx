"use client";

import { Button } from "flowbite-react";
import { useState } from "react";
import { PiExportBold } from "react-icons/pi";
import { exportDocumentFDM } from "../../api/documentApi";
import useAuthStore from "../../stores/useAuthStore";
import useDataFDM from "../../stores/useDataFDM";
import { Box } from "@mui/material";

export function ExportButton({ selected }) {
  // const [openModal, setOpenModal] = useState(false);
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { filters } = useDataFDM((state) => ({ filters: state.filters })); // Get filters from store
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const urlFile = await exportDocumentFDM(token, {...filters, user_id: selected});
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
        className="h-[2.5rem] text-gray-700 bg-transparent border-gray-300 border-0 md:border-[1px] hover:bg-gray-400"
        onClick={() => handleClick()}>
        <PiExportBold className="text-lg" />
        <p className="ml-2 text-[12px]">Export</p>
      </Button>
    </>
  );
}
