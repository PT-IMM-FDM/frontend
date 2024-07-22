import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import { updateCompany } from "../../api/data-company";
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
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./TableTheme";

const CACHE_KEY = "dataCompany";

export function EditCompanyButton({ company_id, company_name}) {
  // Fetch the token from the authentication store
  const { token } = useAuthStore((state) => ({ token: state.token }));

  // Fetch the company data from the data company store
  const { rows, setRows, setSelected } = useDataCompanyStore((state) => ({
    rows: state.rows,
    setRows: state.setRows,
    setSelected: state.setSelected,
  }));

  // State variables for managing the modal visibility and form data
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    company_id: company_id,
    company_name: company_name,
  });

  // Function to close the modal and reset the form data
  function onCloseModal() {
    setOpenModal(false);
    setFormData({
      company_id: company_id,
      company_name: company_name,
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

    try {
      // Call the API to update the company with the provided form data
      const updatedCompany = await updateCompany(token, formData);

      // Update the company data in the store
      const updatedRows = rows.map((row) =>
        row.company_id === updatedCompany.company_id ? updatedCompany : row
      );
      setSelected([])
      setRows(updatedRows);

      // Cache the updated company data in local storage
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedRows));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime());

      // Close the modal after successful submission
      onCloseModal();
    } catch (error) {
      console.error("Failed to update company:", error);
      // Handle error state or display error message
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
        <IconButton
          onClick={() => setOpenModal(true)}
          className="hover:text-purple-700"
        >
          <FaRegEdit className="text-[1rem] hover:text-purple-700" />
        </IconButton>
      </BootstrapTooltip>

      {/* Modal */}
      <Dialog open={openModal} onClose={onCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle style={{ fontSize: "20px", marginBottom: '20px' }}>Edit Perusahaan</DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <DialogContentText style={{ fontSize: "14px", color: 'black' }}>
              Nama Perusahaan
              {/* nama perusahaan */}
              <TextField
                id="company_name"
                name="company_name"
                hiddenLabel
                placeholder="Enter a company name"
                value={formData.company_name}
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
                <p className="text-[12px]">Update Perusahaan</p>
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
