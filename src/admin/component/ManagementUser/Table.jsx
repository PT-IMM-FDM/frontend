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
import { getAllUser } from "../../api/data-user";
import useDataUsersStore from "../../stores/useDataUsersStore";
import { toCamelCase } from "../../utils/stringUtils";
import { EditUserButton } from "./EditUserButton";
import { Badge } from "@mui/material";

const CACHE_KEY = "usersData";

export default function EnhancedTable({ token }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("full_name");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { rows, selected, setRows, setSelected, filters } = useDataUsersStore();

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
        const { data } = await getAllUser(token, filters);
        const newData = data.map((row) => ({ ...row }));

        if (!cachedData || JSON.stringify(newData) !== cachedData) {
          setRows(newData);
          localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
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
      setSelected(rows.map((row) => row.user_id));
    } else {
      setSelected([]);
    }
  };

  // Function to handle individual row click
  const handleClick = (event, user_id) => {
    // Ensure only checkboxes trigger this function
    if (event.target.type !== "checkbox") return;

    const selectedIndex = selected.indexOf(user_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user_id);
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
  const isSelected = (user_id) => selected.includes(user_id);

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
            (item) => item.id === row.company?.company_id
          )) &&
        (!filters.department.length ||
          filters.department.some(
            (item) => item.id === row.department?.department_id
          )) &&
        (!filters.jobPosition.length ||
          filters.jobPosition.some(
            (item) => item.id === row.job_position?.job_position_id
          )) &&
        (!filters.employmentStatus.length ||
          filters.employmentStatus.some(
            (item) => item.id === row.employment_status?.employment_status_id
          ))
      );
    });
  }, [rows, filters]);

  const visibleRows = React.useMemo(() => {
    const filteredRows = filterRows.filter((row) =>
      String(row.full_name).toLowerCase().includes(searchQuery.toLowerCase())
    );
    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filterRows, order, orderBy, page, rowsPerPage, searchQuery]);

  // Calculate empty rows for pagination
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filterRows.length);

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
          <TableContainer sx={{ maxHeight: 600 }}>
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
                  const isItemSelected = isSelected(row.user_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => event.stopPropagation()}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user_id}
                      selected={isItemSelected}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={(event) => handleClick(event, row.user_id)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ fontSize: "12px" }}>
                        {row.full_name ? toCamelCase(row.full_name) : "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.phone_number || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.department?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.job_position?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        <span className="flex items-center gap-2">
                          <Badge
                            color={row.is_active ? "success" : "error"}
                            variant="dot"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            sx={{ marginBottom: "2px" }}></Badge>
                          <>{row.employment_status?.name || "-"}</>
                        </span>
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.company?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        <EditUserButton user_id={row.user_id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{ maxHeight: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={8} />
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
