import { Button, Tooltip } from "flowbite-react";
import React from "react";
import { FaFileDownload } from "react-icons/fa";
import { downloadTemplate } from "../../api/documentApi";
import useAuthStore from "../../stores/useAuthStore";

const DownloadTemplateButton = () => {
  const { token } = useAuthStore((state) => state);

  const handleClick = async () => {
    try {
      const fileUrl = await downloadTemplate(token);
      let fileLink = fileUrl.data.data;

      // Get the base URL from the environment variable
      const baseUrl = import.meta.env.VITE_API_URL;

      // Ensure fileLink does not include localhost:3030
      if (fileLink.includes("localhost:3030")) {
        fileLink = fileLink.replace("localhost:3030", baseUrl);
      }

      // Open the download link in a new tab
      window.open(fileLink, '_blank');
      // console.log(fileLink)
    } catch (error) {
      console.error('Error downloading the template:', error);
    }
  };

  return (
    <Tooltip content="Download Template File" className="text-[10px]">
      <Button
        color="light"
        className="h-[2.5rem] text-gray-700 bg-transparent border-gray-300 border-[1px] hover:bg-gray-400"
        onClick={handleClick}
      >
        <FaFileDownload className="text-lg" />
      </Button>
    </Tooltip>
  );
};

export default DownloadTemplateButton;
