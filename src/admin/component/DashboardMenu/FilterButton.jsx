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
        localStorage.setItem("dataDepartments", JSON.stringify(fetchedDepartments));
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
      department: selectedOptions ? selectedOptions.map(option => ({ id: option.value, name: option.label })) : []
    };
    setFiltersDashboard(updatedFilters);
  };

  const departmentOptions = departments.map(department => ({
    value: department.department_id,
    label: department.name
  }));

  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontSize: '12px',
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '12px',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '12px',
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '12px',
    }),
    control: (provided) => ({
      ...provided,
      fontSize: '12px',
      minHeight: '38px',
      borderRadius: '4px',
      boxShadow: 'none',
      border: '1px solid #d1d5db',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: '4px',
      backgroundColor: '#e5e7eb',
      padding: '0 8px',
      margin: '2px',
      whiteSpace: 'nowrap',
      overflow: 'auto',
      textOverflow: 'ellipsis',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: '12px',
      overflow: 'auto',
      textOverflow: 'ellipsis',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      fontSize: '12px',
      ':hover': {
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      overflowY: 'auto', // Enable horizontal scrolling
      whiteSpace: 'nowrap', // Prevent wrapping
      padding: '4px',
      height: '38px', // Ensure the container height remains constant
    }),
  };

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg">
      <div className="flex-grow">
        <Select
          isMulti
          options={departmentOptions}
          onChange={handleSelectChange}
          value={filtersDashboard.department.map(department => ({
            value: department.id,
            label: department.name
          }))}
          className="basic-multi-select text-[12px]"
          classNamePrefix="select"
          placeholder="Select Departments..."
          styles={customStyles}
        />
      </div>
    </div>
  );
}
