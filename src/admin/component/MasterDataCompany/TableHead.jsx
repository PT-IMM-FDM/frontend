// EnhancedTableHead.js
import * as React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import useAuthStore from "../../stores/useAuthStore";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const isAdmin = user.role.name === "Admin";

  const headCells = [
    {
      id: "number",
      numeric: true,
      disablePadding: isAdmin,
      label: "No.",
      width: "10px",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nama Perusahaan",
    },
    ...(isAdmin
      ? [
          {
            id: "action",
            numeric: false,
            disablePadding: false,
            label: "Edit",
            width: 100,
          },
        ]
      : []),
  ];

  return (
    <TableHead>
      <TableRow>
        {isAdmin && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all rows" }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontSize: "12px", fontWeight: 600 }}
            key={headCell.id}
            align={
              headCell.id === "action"
                ? "center"
                : headCell.numeric
                ? "right"
                : "left"
            }
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ width: headCell.width }}
          >
            {headCell.id !== "number" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
