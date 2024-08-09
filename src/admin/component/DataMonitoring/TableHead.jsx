import * as React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  { id: "timestamp", numeric: false, disablePadding: true, label: "Timestamp", width: 100, align: "left", sortable: true },
  { id: "full_name", numeric: false, disablePadding: false, label: "Nama Lengkap", width: 200, align: "left", sortable: true },
  { id: "department.name", numeric: false, disablePadding: false, label: "Departemen", width: 200, align: "left", sortable: true },
  { id: "job_position.name", numeric: false, disablePadding: false, label: "Posisi", width: 200, align: "left", sortable: true },
  { id: "employment_status.name", numeric: false, disablePadding: false, label: "Status", width: 100, align: "left", sortable: true },
  { id: "company.name", numeric: false, disablePadding: false, label: "Nama Perusahaan", width: 170, align: "left", sortable: true },
  { id: "hasil", numeric: false, disablePadding: false, label: "Hasil", width: 50, align: "center", sortable: false },
  { id: "action", numeric: false, disablePadding: false, label: "Detail", width: 50, align: "center", sortable: false },
  { id: "follow_up", numeric: false, disablePadding: false, label: "Follow Up", width: 200, align: "left", sortable: false },
  { id: "attachment", numeric: false, disablePadding: false, label: "Attachment", width: 50, align: "center", sortable: false },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontSize: "12px", fontWeight: 600, minWidth: headCell.width }}
            key={headCell.id}
            align={headCell.align} // Use the align property from headCells
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
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
