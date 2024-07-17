import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../../api/documentApi"; // Adjust the path as needed
import useAuthStore from "../../stores/useAuthStore";
import { getAllUser } from "../../api/data-user";
import useDataUsersStore from "../../stores/useDataUsersStore";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImportButton() {
  const { token } = useAuthStore((state) => ({ token: state.token}));
  const { setRows } = useDataUsersStore((state) => ({ setRows: state.setRows}));

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      try {
        await uploadFile(file, token);
        const dataUsers = await getAllUser(token); // Fetch the latest data
        setRows(dataUsers.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        bgcolor: "transparent",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "grey.300",
        color: "black",
        textTransform: "none",
        fontSize: "12px",
        "&:hover": {
          bgcolor: "grey.100",
          boxShadow: "none",
        },
        boxShadow: "none",
      }}
    >
      Upload Data
      <VisuallyHiddenInput
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
      />
    </Button>
  );
}
