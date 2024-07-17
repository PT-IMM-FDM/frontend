"use client";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { Button, Modal, Checkbox, Label } from "flowbite-react";
import { useState, useEffect } from "react";

export default function FilterButton() {
  const [openModal, setOpenModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Get data from localStorage if available
    const storedDepartments = localStorage.getItem("dataDepartments");
    if (storedDepartments) {
      setDepartments(JSON.parse(storedDepartments));
    }

    const storedJobPositions = localStorage.getItem("dataJobPositions");
    if (storedJobPositions) {
      setJobPositions(JSON.parse(storedJobPositions));
    }

    const storedStatuses = localStorage.getItem("dataStatus");
    if (storedStatuses) {
      setEmploymentStatuses(JSON.parse(storedStatuses));
    }

    const storedCompanies = localStorage.getItem("dataCompany");
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

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
      <Modal size="md" dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body className="h-[50vh]">
          {/* Nama Perusahaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Nama Perusahaan</p>
            <div className="grid grid-cols-2 grid-flow-col gap-1">
              {/* Example: Mapping companies */}
              {companies.map((company) => (
                <div key={company.company_id} className="flex items-center gap-2">
                  <Checkbox id={`company_${company.company_id}`} />
                  <Label htmlFor={`company_${company.company_id}`} className="flex text-[12px]">
                    {company.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Departemen */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Departemen</p>
            <div className="grid grid-rows-3 grid-flow-col gap-1">
              {/* Example: Mapping departments */}
              {departments.map((department) => (
                <div key={department.department_id} className="flex items-center gap-2">
                  <Checkbox id={`department_${department.department_id}`} />
                  <Label htmlFor={`department_${department.department_id}`} className="flex text-[12px]">
                    {department.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Posisi */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Posisi</p>
            <div className="grid grid-rows-3 grid-flow-col gap-1">
              {/* Example: Mapping job positions */}
              {jobPositions.map((position) => (
                <div key={position.job_position_id} className="flex items-center gap-2">
                  <Checkbox id={`position_${position.job_position_id}`} />
                  <Label htmlFor={`position_${position.job_position_id}`} className="flex text-[12px]">
                    {position.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status Pekerjaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Status Pekerjaan</p>
            <div className="grid grid-rows-3 grid-flow-col gap-1">
              {/* Example: Mapping employment statuses */}
              {employmentStatuses.map((status) => (
                <div key={status.employment_status_id} className="flex items-center gap-2">
                  <Checkbox id={`status_${status.employment_status_id}`} />
                  <Label htmlFor={`status_${status.employment_status_id}`} className="flex text-[12px]">
                    {status.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-purple-800" onClick={() => setOpenModal(false)}>Use Filter</Button>
          <Button color="light" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
