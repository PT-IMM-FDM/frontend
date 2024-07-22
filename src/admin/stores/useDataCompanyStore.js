import { create } from "zustand";

const useDataCompanyStore = create((set) => ({
  rows: [],
  selected: [],
  rowsDepartment: [],
  rowsPosition: [],
  rowsStatus: [],
  setRows: (newRows) => set({ rows: newRows }),
  setSelected: (newSelected) => set({ selected: newSelected }),
  setRowsDepartment: (rowsDepartment) => set({ rowsDepartment }),
  setRowsPosition: (rowsPosition) => set({ rowsPosition }),
  setRowsStatus: (rowsStatus) => set({ rowsStatus }),
}));

export default useDataCompanyStore;

