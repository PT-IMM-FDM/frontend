import useDataFDM from "../../stores/useDataFDM";

const DateRangePicker = () => {
  const { filtersDashboard, setFiltersDashboard } = useDataFDM();

  // Format tanggal ke YYYY-MM-DD dengan mempertimbangkan zona waktu lokal
  const formatDate = (date) => {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  };

  const handleReset = () => {
    const today = new Date(); // Menggunakan waktu lokal
    setFiltersDashboard({
      ...filtersDashboard,
      startDate: formatDate(today),
      endDate: formatDate(today),
    });
  };

  return (
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
            className="text-[12px] rounded-lg border-gray-200 h-[2rem] w-full"
            type="date"
            name="endDate"
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
  );
};

export default DateRangePicker;
