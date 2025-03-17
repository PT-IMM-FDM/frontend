import { useState, useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { updateDepartment } from "../../api/data-company";
import useDataCompanyStore from "../../stores/useDataCompanyStore";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  styled,
  tooltipClasses,
  Box
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./TableTheme";
import { toast } from "react-toastify";

const CACHE_KEY = "d_department";

export function EditDepartmentButton({ department_id, department_name }) {
  // Fetch the token from the authentication store
  const { token } = useAuthStore((state) => ({ token: state.token }));

  // Fetch the department data from the data company store
  const { rowsDepartment, setRowsDepartment, setSelected } = useDataCompanyStore((state) => ({
    rowsDepartment: state.rowsDepartment,
    setRowsDepartment: state.setRowsDepartment,
    setSelected: state.setSelected,
  }));

  // State variables for managing the modal visibility and form data
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    department_id: department_id,
    department_name: department_name,
  });
  const [loading, setLoading] = useState(false);

  // Update formData when modal opens or department data changes
  useEffect(() => {
    if (openModal) {
      setFormData({
        department_id: department_id,
        department_name: department_name,
      });
    }
  }, [openModal, department_id, department_name]);

  // Function to close the modal and reset the form data
  function onCloseModal() {
    setOpenModal(false);
    setFormData({
      department_id: department_id,
      department_name: department_name,
    });
  }

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Call the API to update the department with the provided form data
      const updatedDepartment = await updateDepartment(token, formData);

      // Update the department data in the store
      const updatedRows = rowsDepartment.map((row) =>
        row.department_id === updatedDepartment.department_id ? updatedDepartment : row
      );

      setSelected([]);
      setRowsDepartment(updatedRows);

      // Cache the updated department data in local storage
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedRows));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());

      // Show success toast
      toast.success("Department Updated.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });

      // Close the modal after successful submission
      onCloseModal();
    } catch (error) {
      console.error("Failed to update department:", error);

      // Show error toast
      toast.error("Failed to update department.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      {/* Button */}
      <BootstrapTooltip title="Edit" placement="top">
        <IconButton onClick={() => setOpenModal(true)} className="hover:text-purple-700">
          <FaRegEdit className="text-[1rem] hover:text-purple-700" />
        </IconButton>
      </BootstrapTooltip>

      {/* Modal */}
      <Dialog open={openModal} onClose={onCloseModal} maxWidth="xs" fullWidth>
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
              backgroundColor: "rgba(243, 244, 246, 0.7)",
            }}
          >
            <img src="/Loader-1.gif" alt="loader" className="h-[5rem] z-10" />
          </Box>
        )}
        <DialogTitle style={{ fontSize: "20px", marginBottom: '20px' }}>Edit Departemen</DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <DialogContentText style={{ fontSize: "14px", color: 'black' }}>
              Nama Departemen
              {/* nama departemen */}
              <TextField
                id="department_name"
                name="department_name"
                hiddenLabel
                placeholder="Enter a department name"
                value={formData.department_name}
                onChange={handleChange}
                fullWidth
                required
                margin="none"
                InputLabelProps={{ style: { fontSize: "14px" } }}
                inputProps={{ style: { fontSize: "14px", boxShadow: "none" }}}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    boxShadow: "none",
                    "& fieldset": {
                      borderRadius: "6px",
                      boxShadow: "none"
                    },
                  },
                }}
              />
            </DialogContentText>
            <DialogActions className="col-span-2 flex gap-2 justify-end">
              <Button
                variant="contained"
                className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
                type="submit"
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  boxShadow: "none",
                  bgcolor: '#673ab7', // Custom background color
                  '&:hover': {
                    bgcolor: '#5e35b1', // Darker shade on hover
                  }
                }}
              >
                <p className="text-[12px]">Update Departemen</p>
              </Button>
              <Button
                color="error"
                variant="contained"
                className="h-[2.5rem] text-white border-[1px]"
                onClick={onCloseModal}
                sx={{ textTransform: "none", borderRadius: "8px", boxShadow: "none", }}
              >
                <p className="text-[12px]">Batal</p>
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
