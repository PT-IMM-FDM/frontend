import { create } from "zustand";

const formatDate = (date) => {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
};

const useDataFDM = create((set) => ({
  rows: [],
  rowsNotFilled: [],
  selected: [],
  filters: {
    name: null,
    company: [],
    department: [],
    jobPosition: [],
    employmentStatus: [],
    result: [],
    startDate: "",
    endDate: "",
    user_id: [],
    attendance_health_result_id: null,
    is_active: null,
    page: null,
  },
  filtersUserNotFilled: {
    name: null,
    company: [],
    department: [],
    jobPosition: [],
    employmentStatus: [],
    user_id: [],
    attendance_health_result_id: null,
    is_active: null,
  },
  filtersDashboard: {
    name: null,
    company: [],
    department: [],
    jobPosition: [],
    employmentStatus: [],
    result: [],
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
    user_id: [],
    attendance_health_result_id: null,
    is_active: null,
  },
  setRows: (rows) => set({ rows }),
  setRowsNotFilled: (rowsNotFilled) => set({ rowsNotFilled }),
  setSelected: (selected) => set({ selected }),
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
  setFiltersDashboard: (filtersDashboard) =>
    set((state) => ({
      filtersDashboard: {
        ...state.filtersDashboard,
        ...filtersDashboard,
      },
    })),
  setFiltersUserNotFilled: (filtersUserNotFilled) =>
    set((state) => ({
      filtersUserNotFilled: {
        ...state.filtersUserNotFilled,
        ...filtersUserNotFilled,
      },
    })),
}));

export default useDataFDM;
