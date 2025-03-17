import { formatResult } from "../../utils/formatResult";
import { formatDate, toCamelCase } from "../../utils/stringUtils";
import { EditUserButton } from "./EditUserButton";

export const tableMonitoringColumns = [
  {
    field: "created_at",
    headerName: "Timestamp",
    flex: 1,
    minWidth: 150,
    valueGetter: (value, row) => formatDate(row?.created_at || ""),
    renderCell: (params) => {
      const dateTime = formatDate(params.row?.created_at || "").split(", ");
      return (
        <div
          className="flex flex-col h-full"
          style={{
            alignItems: "start",
            justifyContent: "center",
            lineHeight: 1.2,
          }}>
          <span>{dateTime[0]},</span>
          <span>{dateTime[1]}</span>
        </div>
      );
    },
  },
  {
    field: "full_name",
    headerName: "Nama Lengkap",
    flex: 2,
    minWidth: 200,
    sortable: false,
    valueGetter: (value, row) => toCamelCase(row?.user?.full_name || "-"),
  },
  {
    field: "department",
    headerName: "Departemen",
    flex: 1,
    minWidth: 200,
    sortable: false,
    valueGetter: (value, row) => row?.user?.department?.name || "-",
  },
  {
    field: "job_position",
    headerName: "Posisi",
    flex: 1,
    minWidth: 200,
    sortable: false,
    valueGetter: (value, row) => row?.user?.job_position?.name || "-",
  },
  {
    field: "employment_status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    sortable: false,
    valueGetter: (value, row) => row?.user?.employment_status?.name || "-",
  },
  {
    field: "company",
    headerName: "Nama Perusahaan",
    flex: 1,
    minWidth: 200,
    sortable: false,
    valueGetter: (value, row) => row?.user?.company?.name || "-",
  },
  {
    field: "result",
    headerName: "Hasil",
    flex: 1,
    maxWidth: 60,
    sortable: false,
    valueGetter: (value, row) => row.result,
    renderCell: (params) => formatResult(params.row.result),
    headerAlign: "center",
  },
  {
    field: "actions",
    headerName: "Detail",
    flex: 1,
    maxWidth: 70,
    sortable: false,
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <div
          className="h-full flex justify-center items-center"
          onClick={(event) => event.stopPropagation()} // Mencegah event naik ke DataGrid
        >
          <EditUserButton
            user_id={params.row?.user_id}
            attendance_health_result_id={
              params.row?.attendance_health_result_id
            }
          />
        </div>
      );
    },
    disableClickEventBubbling: true, // Mencegah klik cell sebelum tombol bisa diklik
  },
  {
    field: "note",
    headerName: "Follow Up",
    width: 200,
    sortable: false,
    valueGetter: (value, row) => row?.note || "-",
  },
  {
    field: "attachment",
    headerName: "Attachment",
    width: 120,
    sortable: false,
    valueGetter: (value, row) => row.attachment_health_file.length || "-",
  },
];
