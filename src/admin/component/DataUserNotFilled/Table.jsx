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
import { toCamelCase } from "../../utils/stringUtils";
import useDataFDM from "../../stores/useDataFDM";
import { getUserNotFilled } from "../../api/fdm";
// import { EditUserButton } from "./EditUserButton";

const CACHE_KEY = "dataNotFilled";

export default function EnhancedTable({ token }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("full_name");
  const [page, setPage] = React.useState(0);
  const dense = true;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { rowsNotFilled, selected, setRowsNotFilled, setSelected, filtersUserNotFilled } = useDataFDM();

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
        setRowsNotFilled(JSON.parse(cachedData));
      }

      try {
        const data = await getUserNotFilled(token, filtersUserNotFilled);
        const newData = data.map((row) => ({ ...row }));

        if (!cachedData || JSON.stringify(newData) !== cachedData) {
          setRowsNotFilled(newData);
          localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token, filtersUserNotFilled, setRowsNotFilled]);

  // Function to handle selecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rowsNotFilled.map((row) => row.user_id));
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
    return rowsNotFilled.filter((row) => {
      return (
        (!filtersUserNotFilled.company.length ||
          filtersUserNotFilled.company.some(
            (item) => item.name === row.company?.name
          )) &&
        (!filtersUserNotFilled.department.length ||
          filtersUserNotFilled.department.some(
            (item) => item.name === row.department?.name
          )) &&
        (!filtersUserNotFilled.jobPosition.length ||
          filtersUserNotFilled.jobPosition.some(
            (item) => item.name === row.job_position?.name
          )) &&
        (!filtersUserNotFilled.employmentStatus.length ||
          filtersUserNotFilled.employmentStatus.some(
            (item) => item.name === row.employment_status?.name
          ))
      );
    });
  }, [rowsNotFilled, filtersUserNotFilled]);

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
          }}
        >
          <EnhancedTableToolbar
            numSelected={selected?.length}
            onSearch={handleSearch}
            selected={selected}
          />
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                numSelected={selected?.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rowsNotFilled.length}
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
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
                        sx={{ fontSize: "12px" }}
                      >
                        {row.full_name ? toCamelCase(row.full_name) : "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.department?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.job_position?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.employment_status?.name || "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.company?.name || "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ maxHeight: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
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
