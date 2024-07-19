import { create } from "zustand";

const useDataUsersStore = create((set) => ({
    rows: [],
    selected: [],
    filters: {
        name: null,
        company: [],
        department: [],
        jobPosition: [],
        employmentStatus: [],
    },
    setRows: (rows) => set({ rows }),
    setSelected: (selected) => set({ selected }),
    setFilters: (filters) => set((state) => ({
        filters: {
            ...state.filters,
            ...filters,
        },
    })),
}));

export default useDataUsersStore;
