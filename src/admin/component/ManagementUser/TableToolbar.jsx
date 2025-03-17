import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import FilterButton from "./FilterButton";
import { DeleteButton } from "./DeleteButton";
import { ExportButton } from "./ExportButton";
import { AddUserButton } from "./AddUserButton";
import SearchBar from "./SearchBar";
import ImportButton from "./ImportButton";
import DownloadTemplateButton from "./DownloadTemplateButton";
import useAuthStore from "../../stores/useAuthStore";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function EnhancedTableToolbar(props) {
  const { numSelected, onSearch, selected } = props;
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  const isAdmin = user.role.name === "Admin";
  const [departments, setDepartments] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUserMenu, setAnchorElUserMenu] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const storedDepartments = localStorage.getItem("dataDepartments");
      if (storedDepartments) {
        setDepartments(JSON.parse(storedDepartments));
      }

      const storedJobPositions = localStorage.getItem("d_jobPosition");
      if (storedJobPositions) {
        setJobPositions(JSON.parse(storedJobPositions));
      }

      const storedStatuses = localStorage.getItem("d_employmentStatus");
      if (storedStatuses) {
        setEmploymentStatuses(JSON.parse(storedStatuses));
      }

      const storedCompanies = localStorage.getItem("d_company");
      if (storedCompanies) {
        setCompanies(JSON.parse(storedCompanies));
      }
    };

    fetchData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorElUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorElUserMenu(null);
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
      }}>
      <div className="flex justify-between items-center w-full">
        <div className="flex">
          {numSelected > 0 ? (
            <div className="flex items-center">
              <div className="p-2 text-[10px] font-medium md:text-[12px]">
                <p>{numSelected} rows selected</p>
              </div>
              {isAdmin && (
                <DeleteButton
                  className="right-0"
                  numSelected={numSelected}
                  selected={selected}
                />
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              {isAdmin && (
                <>
                  <div className="hidden sm:flex gap-2">
                    <AddUserButton
                      departments={departments}
                      jobPositions={jobPositions}
                      employmentStatuses={employmentStatuses}
                      companies={companies}
                    />
                    <ImportButton />
                  </div>
                  <div className="sm:hidden">
                    <IconButton
                      aria-label="user-menu"
                      aria-controls="user-menu"
                      aria-haspopup="true"
                      onClick={handleUserMenuOpen}>
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="text-lg text-purple-800"
                      />
                    </IconButton>
                    <Menu
                      id="user-menu"
                      anchorEl={anchorElUserMenu}
                      keepMounted
                      open={Boolean(anchorElUserMenu)}
                      onClose={handleUserMenuClose}>
                      <MenuItem onClick={handleUserMenuClose}>
                        <AddUserButton
                          departments={departments}
                          jobPositions={jobPositions}
                          employmentStatuses={employmentStatuses}
                          companies={companies}
                        />
                      </MenuItem>
                      <MenuItem onClick={handleUserMenuClose}>
                        <ImportButton />
                      </MenuItem>
                    </Menu>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SearchBar onSearch={onSearch} />
          <div className="hidden sm:flex gap-2">
            <FilterButton />
            <ExportButton />
            {isAdmin && <DownloadTemplateButton />}
          </div>
          <div className="sm:hidden">
            <IconButton
              aria-label="more"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>
                <FilterButton />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ExportButton />
              </MenuItem>
              {isAdmin && (
                <MenuItem onClick={handleMenuClose}>
                  <DownloadTemplateButton />
                </MenuItem>
              )}
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
  selected: PropTypes.array.isRequired,
};

export default EnhancedTableToolbar;
