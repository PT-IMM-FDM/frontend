import React, { useState, useEffect } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { Button, Modal, Checkbox, Label } from "flowbite-react";
import {
  getAllCompany,
  getAllDepartments,
  getAllPositions,
  getAllStatusEmployment,
} from "../../api/data-company";
import useAuthStore from "../../stores/useAuthStore";
import useDataUsersStore from "../../stores/useDataUsersStore"; // Import store

export default function FilterButton() {
  const [openModal, setOpenModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { filters, setFilters } = useDataUsersStore(); // Get filters and setFilters from store


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const fetchedCompanies = await getAllCompany(token);
        setCompanies(fetchedCompanies);
        localStorage.setItem("dataCompany", JSON.stringify(fetchedCompanies));
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
      }

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

      try {
        const fetchedPositions = await getAllPositions(token);
        setJobPositions(fetchedPositions);
        localStorage.setItem(
          "dataJobPositions",
          JSON.stringify(fetchedPositions)
        );
      } catch (error) {
        console.error("Error fetching job positions:", error);
        setJobPositions([]);
      }

      try {
        const fetchedStatuses = await getAllStatusEmployment(token);
        setEmploymentStatuses(fetchedStatuses);
        localStorage.setItem("dataStatus", JSON.stringify(fetchedStatuses));
      } catch (error) {
        console.error("Error fetching employment statuses:", error);
        setEmploymentStatuses([]);
      }
    };

    const storedDepartments = localStorage.getItem("dataDepartments");
    const storedJobPositions = localStorage.getItem("dataJobPositions");
    const storedStatuses = localStorage.getItem("dataStatus");
    const storedCompanies = localStorage.getItem("dataCompany");

    if (
      !storedDepartments ||
      !storedJobPositions ||
      !storedStatuses ||
      !storedCompanies
    ) {
      fetchDataFromAPI();
    } else {
      setDepartments(JSON.parse(storedDepartments));
      setJobPositions(JSON.parse(storedJobPositions));
      setEmploymentStatuses(JSON.parse(storedStatuses));
      setCompanies(JSON.parse(storedCompanies));
    }
  }, [token]);

  const handleCheckboxChange = (event, filterKey, id, name) => {
    const isChecked = event.target.checked;
    let updatedFilters = { ...filters };

    if (isChecked) {
      if (!updatedFilters[filterKey].some((item) => item.id === id)) {
        updatedFilters[filterKey] = [
          ...updatedFilters[filterKey],
          { id, name },
        ];
      }
    } else {
      updatedFilters[filterKey] = updatedFilters[filterKey].filter(
        (item) => item.id !== id
      );
    }

    setFilters(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({
      company: [],
      department: [],
      jobPosition: [],
      employmentStatus: [],
    });
  };

  return (
    <>
      <Button
        className="h-[2.5rem] text-gray-700 bg-transparent"
        color="light"
        onClick={() => setOpenModal(true)}
      >
        <FilterListRoundedIcon sx={{ fontSize: "large" }} />
        <p className="ml-2 text-[12px]">Filters</p>
      </Button>
      <Modal
        size="md"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body className="h-[50vh]">
          {/* Nama Perusahaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Nama Perusahaan</p>
            <div className="grid grid-cols-3 grid-flow-row gap-1">
              {companies.map((company) => (
                <div
                  key={company.company_id}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={`company_${company.company_id}`}
                    checked={filters.company.some(
                      (item) => item.id === company.company_id
                    )}
                    onChange={(event) =>
                      handleCheckboxChange(
                        event,
                        "company",
                        company.company_id,
                        company.name
                      )
                    }
                  />
                  <Label
                    htmlFor={`company_${company.company_id}`}
                    className="flex text-[12px]"
                  >
                    {company.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Departemen */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Departemen</p>
            <div className="grid grid-cols-3 grid-flow-row gap-1">
              {departments.map((department) => (
                <div
                  key={department.department_id}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={`department_${department.department_id}`}
                    checked={filters.department.some(
                      (item) => item.id === department.department_id
                    )}
                    onChange={(event) =>
                      handleCheckboxChange(
                        event,
                        "department",
                        department.department_id,
                        department.name
                      )
                    }
                  />
                  <Label
                    htmlFor={`department_${department.department_id}`}
                    className="flex text-[12px]"
                  >
                    {department.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Posisi */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Posisi</p>
            <div className="grid grid-cols-3 grid-flow-row gap-1">
              {jobPositions.map((position) => (
                <div
                  key={position.job_position_id}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={`position_${position.job_position_id}`}
                    checked={filters.jobPosition.some(
                      (item) => item.id === position.job_position_id
                    )}
                    onChange={(event) =>
                      handleCheckboxChange(
                        event,
                        "jobPosition",
                        position.job_position_id,
                        position.name
                      )
                    }
                  />
                  <Label
                    htmlFor={`position_${position.job_position_id}`}
                    className="flex text-[12px]"
                  >
                    {position.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status Pekerjaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Status Pekerjaan</p>
            <div className="grid grid-rows-3 grid-flow-col gap-1">
              {employmentStatuses.map((status) => (
                <div
                  key={status.employment_status_id}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={`status_${status.employment_status_id}`}
                    checked={filters.employmentStatus.some(
                      (item) => item.id === status.employment_status_id
                    )}
                    onChange={(event) =>
                      handleCheckboxChange(
                        event,
                        "employmentStatus",
                        status.employment_status_id,
                        status.name
                      )
                    }
                  />
                  <Label
                    htmlFor={`status_${status.employment_status_id}`}
                    className="flex text-[12px]"
                  >
                    {status.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="purple" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button color="light" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
