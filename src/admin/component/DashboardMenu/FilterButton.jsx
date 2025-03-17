import { getAllDepartments } from "../../api/data-company";
import useAuthStore from "../../stores/useAuthStore";
import useDataFDM from "../../stores/useDataFDM";
import SelectFieldFilter from "../SelectFieldFilter";

export default function FilterButton() {
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { filtersDashboard, setFiltersDashboard } = useDataFDM(); // Get filters and setFilters from store

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg">
      <div className="flex-grow">
        <SelectFieldFilter
          label="Nama Departemen"
          fetchData={() => getAllDepartments(token)}
          filters={filtersDashboard}
          setFilters={setFiltersDashboard}
          filterKey="department"
          idKey="department_id"
          nameKey="name"
        />
      </div>
    </div>
  );
}
