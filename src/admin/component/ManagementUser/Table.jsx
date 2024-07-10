// EnhancedTable.js
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
import { FaRegEdit } from "react-icons/fa";
import { Button, Tooltip } from "flowbite-react";
import useDataUsersStore from "../../stores/useDataUsersStore";
import { toCamelCase } from "../../utils/stringUtils";

const CACHE_KEY = "usersData";
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

export default function EnhancedTable({ token }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("full_name");
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  // const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { rows, selected, setRows, setSelected } = useDataUsersStore();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(`${CACHE_KEY}_timestamp`);
      const now = new Date().getTime();

      if (cachedData && cachedTime && now - cachedTime < CACHE_EXPIRATION) {
        setRows(JSON.parse(cachedData));
      } else {
        const dataUsers = await getAllUser(token);
        setRows(dataUsers.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(dataUsers.data));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, now);
      }
    };

    fetchData();
  }, [token, setRows]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.user_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, user_id) => {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (user_id) => selected.indexOf(user_id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    const filteredRows = rows.filter((row) =>
      String(row.full_name).toLowerCase().includes(searchQuery.toLowerCase())
    );
    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, rows, searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }} className="shadow-md rounded-[10px]">
        <Paper
          className="shadow-md"
          sx={{
            width: "100%",
            overflow: "hidden",
            mb: 2,
            boxShadow: "none",
            borderRadius: "10px",
          }}
        >
          <EnhancedTableToolbar
            numSelected={selected.length}
            onSearch={handleSearch}
            selected={selected}
          />
          <TableContainer sx={{ borderRadius: "10px" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
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
                      onClick={(event) => handleClick(event, row.user_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ fontSize: "12px" }}
                      >
                        {toCamelCase(row.full_name)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.phone_number}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.department?.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.job_position?.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.employment_status?.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.company?.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        <Tooltip content="Edit" className="text-[10px]">
                          <Button
                            className="text-sm p-0 border-none bg-transparent"
                            size="xs"
                            color="light"
                            onClick={(event) => {
                              event.stopPropagation();
                              console.log("edit", row.user_id);
                            }}
                          >
                            <FaRegEdit className="text-[1rem] hover:text-purple-700" />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
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
