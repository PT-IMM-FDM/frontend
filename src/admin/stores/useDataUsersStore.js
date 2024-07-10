import { create } from "zustand";

const useDataUsersStore = create((set) => ({
    rows: [],
    selected: [],
    setRows: (rows) => set({ rows }),
    setSelected: (selected) => set({ selected }),
}));

export default useDataUsersStore;