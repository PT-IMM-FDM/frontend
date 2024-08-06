import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import Select from "react-select";
import { getAllDepartments } from "../../api/data-company";
import useAuthStore from "../../stores/useAuthStore";
import useDataFDM from "../../stores/useDataFDM";

export default function FilterButton() {
  const [departments, setDepartments] = useState([]);
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { filtersDashboard, setFiltersDashboard } = useDataFDM(); // Get filters and setFilters from store

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const fetchedDepartments = await getAllDepartments(token);
        setDepartments(fetchedDepartments);
        localStorage.setItem(
          "dataDepartments",
          JSON.stringify(fetchedDepartments)
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };

    const storedDepartments = localStorage.getItem("dataDepartments");

    if (!storedDepartments) {
      fetchDataFromAPI();
    } else {
      setDepartments(JSON.parse(storedDepartments));
    }
  }, [token]);

  const handleSelectChange = (selectedOptions) => {
    const updatedFilters = {
      ...filtersDashboard,
      department: selectedOptions
        ? selectedOptions.map((option) => ({
            id: option.value,
            name: option.label,
          }))
        : [],
    };
    setFiltersDashboard(updatedFilters);
  };

  const departmentOptions = departments.map((department) => ({
    value: department.department_id,
    label: department.name,
  }));

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg">
      <div className="flex-grow">
        <Select
          isMulti
          // unstyled
          options={departmentOptions}
          onChange={handleSelectChange}
          value={filtersDashboard.department.map((department) => ({
            value: department.id,
            label: department.name,
          }))}
          className="basic-multi-select text-[12px]"
          classNamePrefix="select"
          placeholder="Select Departments..."
          // styles={customStyles}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
