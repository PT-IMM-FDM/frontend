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
import { getAllDepartments } from "../../api/data-company";
import useDataCompanyStore from "../../stores/useDataCompanyStore";
import { EditDepartmentButton } from "./EditDepartmentButton";

const CACHE_KEY = "dataDepartments";

export default function EnhancedTable({ token }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { rowsDepartment, selected, setRowsDepartment, setSelected } =
    useDataCompanyStore();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsDepartment.map((n) => n.department_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, department_id) => {
    event.stopPropagation(); // Hentikan propagasi event untuk mencegah baris terseleksi

    const selectedIndex = selected.indexOf(department_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, department_id);
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

  const isSelected = (department_id) => selected?.indexOf(department_id) !== -1;

  const emptyRows =
    page < 0
      ? Math.max(0, (1 + page) * rowsPerPage - rowsDepartment.length)
      : 0;

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(0);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const data = JSON.parse(cachedData).map((row, index) => ({
          ...row,
          id: row.department_id,
        }));
        setRowsDepartment(data);
      }

      try {
        const dataDepartments = await getAllDepartments(token);
        const data = dataDepartments.map((row, index) => ({
          ...row,
          id: row.department_id,
          index: index + 1,
        }));

        if (!cachedData || JSON.stringify(data) !== cachedData) {
          setRowsDepartment(data);
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [token, setRowsDepartment]);

  const visibleRows = React.useMemo(() => {
    const filteredRows = rowsDepartment.filter((row) =>
      String(row.name).toLowerCase().includes(searchQuery.toLowerCase())
    );
    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, rowsDepartment, searchQuery]);

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
            numSelected={selected?.length}
            onSearch={handleSearch}
            selected={selected}
          />
          <TableContainer sx={{ maxHeight: 450, borderRadius: "10px" }}>
            <Table
              stickyHeader
              sx={{
                minWidth: 750,
              }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected?.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rowsDepartment.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.department_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.department_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => handleCheckboxClick(event, row.department_id)} // Menangani klik pada checkbox
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ fontSize: "12px", width: "10px" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }} align="left">
                        {row.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          pl: "1.5rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        align="left"
                      >
                        <EditDepartmentButton department_id={row.department_id} department_name={row.name}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 10 : 10) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rowsDepartment.length}
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
