import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider } from "@emotion/react";
import EnhancedTableHead from "./TableHead";
import EnhancedTableToolbar from "./TableToolbar";
import { theme } from "./TableTheme";
import { stableSort, getComparator } from "../../utils/sorting";
import { formatDate, toCamelCase } from "../../utils/stringUtils";
import { EditUserButton } from "./EditUserButton";
import useDataFDM from "../../stores/useDataFDM";
import { getFdm } from "../../api/fdm";
import { formatResult } from "../../utils/formatResult";
import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

const CACHE_KEY = "dataMonitoring";

export default function EnhancedTable({ token }) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("timestamp");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { rows, selected, setRows, setSelected, filters } = useDataFDM();

  // Function to handle sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Fetch data from API or cache
  React.useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        setRows(JSON.parse(cachedData));
      }

      try {
        const data = await getFdm(token, filters);

        if (!cachedData || JSON.stringify(data) !== cachedData) {
          setRows(data);
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token, filters, setRows]);

  // Function to handle selecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows.map((row) => row.attendance_health_result_id));
    } else {
      setSelected([]);
    }
  };

  // Function to handle individual row click
  const handleClick = (event, attendance_health_result_id) => {
    // Ensure only checkboxes trigger this function
    if (event.target.type !== "checkbox") return;

    const selectedIndex = selected.indexOf(attendance_health_result_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, attendance_health_result_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to check if a row is selected
  const isSelected = (attendance_health_result_id) =>
    selected.includes(attendance_health_result_id);

  // Search function
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  // Filter rows based on filters and search query
  const filterRows = React.useMemo(() => {
    return rows.filter((row) => {
      return (
        (!filters.company.length ||
          filters.company.some(
            (item) => item.name === row.user.company?.name
          )) &&
        (!filters.department.length ||
          filters.department.some(
            (item) => item.name === row.user.department?.name
          )) &&
        (!filters.jobPosition.length ||
          filters.jobPosition.some(
            (item) => item.name === row.user.job_position?.name
          )) &&
        (!filters.employmentStatus.length ||
          filters.employmentStatus.some(
            (item) => item.name === row.user.employment_status?.name
          )) &&
        (!filters.fdm_result.length ||
          filters.fdm_result.some((item) => item.name === row.result))
      );
    });
  }, [rows, filters]);

  const visibleRows = React.useMemo(() => {
    const filteredRows = filterRows.filter((row) =>
      String(row.user.full_name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filterRows, order, orderBy, page, rowsPerPage, searchQuery]);

  // Calculate empty rows for pagination
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filterRows.length);

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
      <Box sx={{ width: "100%" }} className="shadow-md rounded-[10px]">
        <Paper
          className="shadow-md"
          sx={{
            width: "100%",
            mb: 2,
            boxShadow: "none",
            borderRadius: "10px",
          }}>
          <EnhancedTableToolbar
            numSelected={selected?.length}
            onSearch={handleSearch}
            selected={selected}
          />
          <TableContainer sx={{ maxHeight: 650, overflowX: "scroll" }}>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}>
              <EnhancedTableHead
                numSelected={selected?.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(
                    row.attendance_health_result_id
                  );
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => event.stopPropagation()}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.attendance_health_result_id}
                      selected={isItemSelected}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) =>
                            handleClick(event, row.attendance_health_result_id)
                          }
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ fontSize: "12px" }}>
                        {row.created_at ? formatDate(row.created_at) : "-"}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "20px",
                          maxWidth: "20px",
                        }}>
                        {row.user.full_name
                          ? toCamelCase(row.user.full_name)
                          : "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.user.department?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.user.job_position?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.user.employment_status?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.user.company?.name || "-"}
                      </TableCell>
                      <BootstrapTooltip
                        title={row.result || "-"}
                        placement="left">
                        <TableCell sx={{ fontSize: "12px" }} align="center">
                          {formatResult(row.result) || "-"}
                        </TableCell>
                      </BootstrapTooltip>
                      <TableCell sx={{ fontSize: "12px" }} align="center">
                        <EditUserButton
                          user_id={row.user_id}
                          attendance_health_result_id={
                            row.attendance_health_result_id
                          }
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "20px",
                          maxWidth: "20px",
                        }}
                        align="left">
                        {row.note || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.attachment_health_file.length > 0
                          ? row.attachment_health_file.length
                          : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{ maxHeight: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={filterRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
