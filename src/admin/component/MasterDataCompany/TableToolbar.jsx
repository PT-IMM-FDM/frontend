import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import { DeleteButton } from "./DeleteButton";
import { AddCompanyButton } from "./AddCompanyButton";
import SearchBar from "./SearchBar";

function EnhancedTableToolbar(props) {
  const { numSelected, onSearch, selected } = props;

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
              <DeleteButton className="right-0" numSelected={numSelected} selected={selected} />
            </div>
          ) : (
            <div className="flex gap-2">
              <AddCompanyButton />
              {/* <ImportButton/> */}
              <DeleteButton className="right-0" numSelected={numSelected} selected={selected} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SearchBar onSearch={onSearch} />
          {/* <FilterButton /> */}
          {/* <ExportButton /> */}
        </div>
      </div>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
