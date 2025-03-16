import useDataFDM from "../../stores/useDataFDM";

const DateRangePicker = () => {
  const { filtersDashboard, setFiltersDashboard } = useDataFDM();

  const handleReset = () => {
    setFiltersDashboard({
      ...filtersDashboard,
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
    });
  };

  return (
    <>
      <div className="bg-white p-4 rounded-[10px] shadow-md">
        <p className="text-[14px] font-semibold mb-2">Filter Date</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="startDate"
              className="text-[12px] leading-none text-gray-500">
              Start Date
            </label>
            <input
              className="text-[12px] rounded-lg border-gray-200 h-[2rem] w-full placeholder:text-[10px]"
              type="date"
              name="startDate"
              value={filtersDashboard.startDate || ""}
              placeholder="YYYY-MM-DD"
              onChange={(event) =>
                setFiltersDashboard({
                  ...filtersDashboard,
                  startDate: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="endDate"
              className="text-[12px] leading-none text-gray-500">
              End Date
            </label>
            <input
              className="text-[12px] rounded-lg border-gray-200 h-[2rem]  w-full"
              type="date"
              name="endDate"
              placeholder="YYYY-MM-DD"
              value={filtersDashboard.endDate || ""}
              onChange={(event) =>
                setFiltersDashboard({
                  ...filtersDashboard,
                  endDate: event.target.value,
                })
              }
            />
          </div>
        </div>
        <button
          onClick={handleReset}
          className="mt-2 bg-white border rounded-[5px] w-full py-1 px-4 text-[12px]">
          Reset Filter
        </button>
      </div>
    </>
  );
};

export default DateRangePicker;
