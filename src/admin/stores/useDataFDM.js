import { create } from "zustand";

const useDataFDM = create((set) => ({
  rows: [],
  selected: [],
  filters: {
    name: null,
    company: [],
    department: [],
    jobPosition: [],
    employmentStatus: [],
    fdm_result: [],
    dateFilter: null,
    customDateFrom: null,
    customDateTo: null,
    user_id: null,
    attendance_health_result_id: null,
  },
  setRows: (rows) => set({ rows }),
  setSelected: (selected) => set({ selected }),
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
}));

export default useDataFDM;
