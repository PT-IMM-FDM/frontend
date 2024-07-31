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

function EnhancedTableToolbar(props) {
  const { numSelected, onSearch, selected } = props;
  const { user, token } = useAuthStore((state) => ({ user: state.user, token: state.token}));
  const isAdmin = user.role.name === "Admin";
  const [departments, setDepartments] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Get data from localStorage if available
    const fetchData = () => {
      const storedDepartments = localStorage.getItem("dataDepartments");
      if (storedDepartments) {
        setDepartments(JSON.parse(storedDepartments));
      }

      const storedJobPositions = localStorage.getItem("dataJobPositions");
      if (storedJobPositions) {
        setJobPositions(JSON.parse(storedJobPositions));
      }

      const storedStatuses = localStorage.getItem("dataStatus");
      if (storedStatuses) {
        setEmploymentStatuses(JSON.parse(storedStatuses));
      }

      const storedCompanies = localStorage.getItem("dataCompany");
      if (storedCompanies) {
        setCompanies(JSON.parse(storedCompanies));
      }
    };

    fetchData();
  }, []);

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
                  <AddUserButton
                    departments={departments}
                    jobPositions={jobPositions}
                    employmentStatuses={employmentStatuses}
                    companies={companies}
                  />
                  <ImportButton />
                  <DeleteButton
                    className="right-0"
                    numSelected={numSelected}
                    selected={selected}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SearchBar onSearch={onSearch} />
          <FilterButton />
          <ExportButton />
          {isAdmin && <DownloadTemplateButton />}
        </div>
      </div>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
