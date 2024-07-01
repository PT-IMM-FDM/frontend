import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
import "./style.css"

const DateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const pickerStyles = {
    width: "35rem",
    fontSize: "11px",
    borderRadius: "10px",
    ".rdrDateDisplayWrapper": {
      backgroundColor: "transparent",
    },
  };
  

  return (
    <div className="mt-4 mx-auto bg-white rounded-[10px] flex items-center shadow-md">
      <DateRange
        editableDateInputs={true}
        style={pickerStyles}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
};

export default DateRangePicker;
