import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import FilterButton from "./FilterButton";
import { ExportButton } from "./ExportButton";
import SearchBar from "./SearchBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function EnhancedTableToolbar(props) {
  const { numSelected, onSearch } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = window.innerWidth <= 600;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex">
          {numSelected > 0 ? (
            <div className="flex items-center">
              <div className="p-2 text-[12px]">
                <p>{numSelected} rows selected</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <SearchBar onSearch={onSearch} />
          <div className="hidden md:flex gap-2">
            <FilterButton />
            <ExportButton />
          </div>

          <div className="md:hidden">
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ padding: 0 }}
            >
              <MenuItem onClick={handleMenuClose}>
                <FilterButton />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ExportButton />
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
