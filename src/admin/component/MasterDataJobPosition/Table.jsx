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
import { getAllPositions } from "../../api/data-company";
import useDataCompanyStore from "../../stores/useDataCompanyStore";
import { EditJobPositionButton } from "./EditJobPositionButton";
import useAuthStore from "../../stores/useAuthStore";

const CACHE_KEY = "d_jobPosition";

export default function EnhancedTable({ token }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { rowsPosition, selected, setRowsPosition, setSelected } =
    useDataCompanyStore();
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const isAdmin = user.role.name === "Admin";

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsPosition.map((n) => n.job_position_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, job_position_id) => {
    event.stopPropagation();

    const selectedIndex = selected.indexOf(job_position_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, job_position_id);
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

  const isSelected = (job_position_id) =>
    selected?.indexOf(job_position_id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsPosition.length) : 0;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  // Modify the useEffect to include index
  React.useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        setRowsPosition(JSON.parse(cachedData));
      }

      try {
        const dataPosition = await getAllPositions(token);
        const data = dataPosition.map((row, index) => ({
          ...row,
          index: index + 1,
        }));
        if (!cachedData || JSON.stringify(data) !== cachedData) {
          setRowsPosition(data);
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token, setRowsPosition]);

  const visibleRows = React.useMemo(() => {
    const filteredRows = rowsPosition.filter((row) =>
      String(row.name).toLowerCase().includes(searchQuery.toLowerCase())
    );
    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, rowsPosition, searchQuery]);

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
          }}>
          <EnhancedTableToolbar
            numSelected={selected?.length}
            onSearch={handleSearch}
            selected={selected}
          />
          <TableContainer sx={{ borderRadius: "10px", maxHeight: 450 }}>
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
                rowCount={rowsPosition.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.job_position_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.job_position_id}
                      selected={isItemSelected}>
                      {isAdmin && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) =>
                              handleClick(event, row.job_position_id)
                            }
                          />
                        </TableCell>
                      )}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding={isAdmin === true ? "none" : "normal"}
                        sx={{ fontSize: "12px", width: "10px" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", paddingY: "10px" }}
                        align="left">
                        {row.name}
                      </TableCell>
                      {isAdmin && (
                        <TableCell
                          sx={{ fontSize: "12px", pl: "1.5rem" }}
                          align="left">
                          <EditJobPositionButton
                            job_position_id={row.job_position_id}
                            job_position_name={row.name}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      maxHeight: (dense ? 33 : 53) * emptyRows,
                    }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rowsPosition.length}
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
