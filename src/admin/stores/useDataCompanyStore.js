import { create } from "zustand";

const useDataCompanyStore = create((set) => ({
  rows: [],
  selected: [],
  rowsDepartment: [],
  rowsPosition: [],
  rowsStatus: [],
  setRows: (rows) => set({ rows }),
  setSelected: (selected) => set({ selected }),
  setRowsDepartment: (rowsDepartment) => set({ rowsDepartment }),
  setRowsPosition: (rowsPosition) => set({ rowsPosition }),
  setRowsStatus: (rowsStatus) => set({ rowsStatus }),
}));

export default useDataCompanyStore;

