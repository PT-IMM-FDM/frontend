import { useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { Button, Modal } from "flowbite-react";
import {
  getAllCompany,
  getAllDepartments,
  getAllPositions,
  getAllStatusEmployment,
} from "../../api/data-company";
import useAuthStore from "../../stores/useAuthStore";
import useDataFDM from "../../stores/useDataFDM";
import SelectFieldFilter from "../SelectFieldFilter";

export default function FilterButton() {
  const [openModal, setOpenModal] = useState(false);
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { filtersUserNotFilled, setFiltersUserNotFilled } = useDataFDM(); // Get filters and setFilters from store

  const clearFilters = () => {
    const newFilters = {
      company: [],
      department: [],
      jobPosition: [],
      employmentStatus: [],
    };
    setFiltersUserNotFilled(newFilters);
  };

  return (
    <>
      <Button
        className="h-[2.5rem] text-gray-700 bg-transparent"
        color="light"
        onClick={() => setOpenModal(true)}>
        <FilterListRoundedIcon sx={{ fontSize: "large" }} />
        <p className="ml-2 text-[12px]">Filters</p>
      </Button>
      <Modal
        size="lg"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}>
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body className="h-[50vh]">
          {/* Nama Perusahaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Nama Perusahaan</p>
            <SelectFieldFilter
              label="Nama Perusahaan"
              fetchData={() => getAllCompany(token)}
              filters={filtersUserNotFilled}
              setFilters={setFiltersUserNotFilled}
              filterKey="company"
              idKey="company_id"
              nameKey="name"
            />
          </div>

          {/* Filter Departemen */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Departemen</p>
            <SelectFieldFilter
              label="Nama Departemen"
              fetchData={() => getAllDepartments(token)}
              filters={filtersUserNotFilled}
              setFilters={setFiltersUserNotFilled}
              filterKey="department"
              idKey="department_id"
              nameKey="name"
            />
          </div>

          {/* Filter Posisi */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Posisi</p>
            <SelectFieldFilter
              label="Nama Posisi"
              fetchData={() => getAllPositions(token)}
              filters={filtersUserNotFilled}
              setFilters={setFiltersUserNotFilled}
              filterKey="jobPosition"
              idKey="job_position_id"
              nameKey="name"
            />
          </div>

          {/* Status Pekerjaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Status Pekerjaan</p>
            <SelectFieldFilter
              label="Pilih Status Pekerjaan"
              fetchData={() => getAllStatusEmployment(token)}
              filters={filtersUserNotFilled}
              setFilters={setFiltersUserNotFilled}
              filterKey="employmentStatus"
              idKey="employment_status_id"
              nameKey="name"
            />
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
