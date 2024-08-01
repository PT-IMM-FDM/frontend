import React from "react";
import { useState } from "react";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import "./theme-style.css";
// import "./default-style.css";
// import FilterButton from "./FilterButton";
import useDataFDM from "../../stores/useDataFDM";

const DateRangePicker = () => {
  const { filtersDashboard, setFiltersDashboard } = useDataFDM();

  return (
    <>
      <div className="mb-4">
        <p className="text-[14px] medium">Filter Date</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="text-[12px] leading-none text-gray-500"
            >
              Start Date
            </label>
            <input
              className="text-[12px] rounded-lg border-gray-200 h-[2rem] w-full placeholder:text-[10px]"
              type="date"
              name="startDate"
              value={filtersDashboard.startDate}
              placeholder="YYYY-MM-DD"
              onChange={(event) =>
                setFiltersDashboard({ ...filtersDashboard, startDate: event.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="text-[12px] leading-none text-gray-500"
            >
              End Date
            </label>
            <input
              className="text-[12px] rounded-lg border-gray-200 h-[2rem]  w-full"
              type="date"
              name="endDate"
              placeholder="YYYY-MM-DD"
              
              value={filtersDashboard.endDate}
              onChange={(event) =>
                setFiltersDashboard({ ...filtersDashboard, endDate: event.target.value })
              }
            />
          </div>
        </div>
      </div>
      {/* <FilterButton /> */}
    </>
  );
};

export default DateRangePicker;
