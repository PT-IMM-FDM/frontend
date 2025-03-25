import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@emotion/react";
import EnhancedTableToolbar from "./TableToolbar";
import { theme } from "./TableTheme";
import useDataFDM from "../../stores/useDataFDM";
import { countResultTable, getFdm } from "../../api/fdm";
import { tableMonitoringColumns } from "./TableColumn";
import { useState, useEffect, useMemo } from "react";
import useSearchStore from "../../stores/useSearchStore";

// Komponen Custom Row untuk DataGrid
const CustomRow = ({ children, ...props }) => {
  return (
    <div
      style={{ backgroundColor: props.index % 2 === 0 ? "#f9f9f9" : "white" }}>
      {children} {/* Ini harus ada agar data tetap tampil */}
    </div>
  );
};

export default function EnhancedTable({ token }) {
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 100,
    page: 0,
  });
  const { rows, setRows, selected, setSelected, filters } = useDataFDM();
  const searchQuery = useSearchStore((state) => state.searchQuery);

  // Memoize slots untuk mencegah re-render tidak perlu
  const slots = useMemo(
    () => ({
      rows: CustomRow, // Slot custom row
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const data = await getFdm(token, {
            ...filters,
            name: searchQuery,
          });

          setTotalRows(data.length);
          setRows(data);

          return;
        }

        const data = await getFdm(token, {
          ...filters,
          page: paginationModel.page + 1,
        });

        const dataMonitoring = await countResultTable(token, { ...filters });

        setTotalRows(dataMonitoring.totalRespondent);
        setRows(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, filters, page, setRows, paginationModel.page, searchQuery]);

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
            onSearch={() => {}}
            numSelected={selected.length}
            selected={selected}
          />
          <Box sx={{ height: 650, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.attendance_health_result_id}
              rows={rows}
              pageSizeOptions={[100]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              columns={tableMonitoringColumns}
              rowCount={totalRows}
              loading={loading}
              pagination
              paginationMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              checkboxSelection
              disableRowSelectionOnClick={true}
              disableColumnMenu={true}
              disableColumnResize={true}
              disableColumnReorder={true}
              onRowSelectionModelChange={(rowSelectionModel) => {
                setSelected(rowSelectionModel);
              }}
              slots={slots} // Tambahkan slots di sini
              sx={{
                fontSize: "12px",
                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
                "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                  {
                    outline: "none !important",
                  },
              }}
            />
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
