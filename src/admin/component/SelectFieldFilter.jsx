import { useState, useEffect } from "react";
import Select from "react-select";

export default function SelectFieldFilter({
  label = "Select", // Placeholder label
  fetchData, // Function to fetch options
  filters, // State filters
  setFilters, // Function to update filters
  filterKey, // Key in filters state (e.g., "department")
  idKey = "id", // Custom key for unique identifier (default: "id")
  nameKey = "name", // Custom key for display label (default: "name")
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchData(); // Fetch data dynamically
        setOptions(data);
        localStorage.setItem(`d_${filterKey}`, JSON.stringify(data));
      } catch (error) {
        console.error(`Error fetching ${filterKey} options:`, error);
        setOptions([]);
      }
    };

    const storedData = localStorage.getItem(`d_${filterKey}`);
    if (!storedData) {
      fetchOptions();
    } else {
      setOptions(JSON.parse(storedData));
    }
  }, [fetchData, filterKey]);

  const handleSelectChange = (selectedOptions) => {
    const updatedFilters = {
      ...filters,
      [filterKey]: selectedOptions
        ? selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
          }))
        : [],
    };
    setFilters(updatedFilters);
  };

  const selectOptions = options.map((item) => ({
    value: item[idKey], // Bisa company_id, department_id, dll.
    label: item[nameKey], // Bisa name, company_name, department_name, dll.
  }));

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg">
      <div className="flex-grow">
        <Select
          isMulti
          options={selectOptions}
          onChange={handleSelectChange}
          value={filters[filterKey]?.map((item) => ({
            value: item[idKey],
            label: item[nameKey],
          }))}
          className="basic-multi-select text-[12px]"
          classNamePrefix="select"
          placeholder={label}
          menuPortalTarget={document.body} // Agar dropdown muncul di luar modal
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999, fontSize: 12 }), // Pastikan dropdown di atas modal
            input: (base) => ({
              ...base,
              "input:focus": { boxShadow: "none" },
            }),
          }}
        />
      </div>
    </div>
  );
}
