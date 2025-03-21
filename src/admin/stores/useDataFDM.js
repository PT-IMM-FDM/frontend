import { create } from "zustand";

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
    fdm_result: [],
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
    fdm_result: [],
    startDate: new Date().toLocaleDateString(),
    endDate: new Date().toLocaleDateString(),
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
