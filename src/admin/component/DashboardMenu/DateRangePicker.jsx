import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
import "./theme-style.css"
import "./default-style.css"

const DateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const pickerStyles = {
    width: "25rem",
    fontSize: "10px",
    borderRadius: "20px",
    ".rdrDateDisplayWrapper": {
      backgroundColor: "transparent",
    },
  };
  

  return (
    <div className="bg-white p-1 rounded-[10px] shadow-md">
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
