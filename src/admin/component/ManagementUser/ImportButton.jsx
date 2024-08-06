import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../../api/documentApi"; // Adjust the path as needed
import useAuthStore from "../../stores/useAuthStore";
import { getAllUser } from "../../api/data-user";
import useDataUsersStore from "../../stores/useDataUsersStore";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

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
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { setRows } = useDataUsersStore((state) => ({
    setRows: state.setRows,
  }));
  const [loading, setLoading] = React.useState(false)

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    let bodydata;
    if (file) {
      try {
        setLoading(true)
        await uploadFile(file, token);
        const dataUsers = await getAllUser(token, bodydata); // Fetch the latest data
        setRows(dataUsers.data);
        toast.success("Upload Data successfully.", {
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
          theme: "colored"
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed Upload Data.", {
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
          theme: "colored"
        });
      } finally {
        setLoading(false)
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <>
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
    </>
  );
}
