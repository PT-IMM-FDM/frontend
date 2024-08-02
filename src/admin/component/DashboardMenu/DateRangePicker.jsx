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
      <div className="bg-white p-4 rounded-[10px] shadow-md">
        <p className="text-[16px] medium mb-2">Filter Date</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="startDate"
              className="text-[14px] leading-none text-gray-500"
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
          <div className="flex flex-col gap-2">
            <label
              htmlFor="endDate"
              className="text-[14px] leading-none text-gray-500"
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
