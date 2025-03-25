import { useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { Button, Modal, Checkbox, Label } from "flowbite-react";
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
  const { filters, setFilters } = useDataFDM(); // Get filters and setFilters from store


  const handleCheckboxFdmResult = (event, filterKey, id, name) => {
    const isChecked = event.target.checked;
    let updatedFilters = { ...filters };

    if (isChecked) {
      // Hanya simpan satu elemen dalam array
      updatedFilters[filterKey] = [{ id, name }];
    } else {
      // Kosongkan array jika checkbox di-uncheck
      updatedFilters[filterKey] = [];
    }

    setFilters(updatedFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      company: [],
      department: [],
      jobPosition: [],
      employmentStatus: [],
      result: [],
      startDate: "",
      endDate: "",
    };
    setFilters(newFilters);
    // updateRoute(newFilters);
  };

  return (
    <>
      <Button
        className="border-0 md:border h-[2.5rem] text-gray-700 bg-transparent"
        color="light"
        onClick={() => setOpenModal(true)}>
        <FilterListRoundedIcon sx={{ fontSize: "large" }} />
        <p className="ml-2 text-[12px]">Filters</p>
      </Button>
      <Modal
        size="lg"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="z-[999]">
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body className="h-[50vh]">
          <div className="mb-4">
            <p className="text-[14px] font-semibold">Filter Date</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="text-[12px] leading-none text-gray-500">
                  Start Date
                </label>
                <input
                  className="text-[12px] rounded-lg border-gray-200 h-[2rem] w-full placeholder:text-[10px]"
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={(event) =>
                    setFilters({ ...filters, startDate: event.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="text-[12px] leading-none text-gray-500">
                  End Date
                </label>
                <input
                  className="text-[12px] rounded-lg border-gray-200 h-[2rem]  w-full"
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={(event) =>
                    setFilters({ ...filters, endDate: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {/* FDM Result */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Status FDM</p>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              {[
                { id: 1, value: "FIT", name: "FIT" },
                { id: 2, value: "FIT_FOLLOW_UP", name: "FIT FOLLOW UP" },
                { id: 3, value: "UNFIT", name: "UNFIT" },
              ].map((e) => (
                <div key={e.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`result_${e.id}`}
                    checked={filters.result.some(
                      (item) => item.id === e.id
                    )}
                    onChange={(event) =>
                      handleCheckboxFdmResult(
                        event,
                        "result",
                        e.id,
                        e.value
                      )
                    }
                  />
                  <Label
                    htmlFor={`status_${e.id}`}
                    className="flex text-[12px]">
                    {e.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Nama Perusahaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] font-semibold">Nama Perusahaan</p>
            <SelectFieldFilter
              label="Nama Perusahaan"
              fetchData={() => getAllCompany(token)}
              filters={filters}
              setFilters={setFilters}
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
              filters={filters}
              setFilters={setFilters}
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
              filters={filters}
              setFilters={setFilters}
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
              filters={filters}
              setFilters={setFilters}
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
