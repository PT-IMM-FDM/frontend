import React from "react";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const pickerStyles = {
    display: "flex",
    flexDirection: "column",
    width: "30rem",
    fontSize: "11px",
    padding: ""
  };

  return (
    <div className="mx-auto py-2">
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
