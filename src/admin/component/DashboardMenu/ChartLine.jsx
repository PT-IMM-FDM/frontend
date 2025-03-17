import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAuthStore from "../../stores/useAuthStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  startOfMonth,
  endOfMonth,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { id } from "date-fns/locale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Fit",
        data: [],
        fill: false,
        borderColor: "rgba(34, 197, 94, 0.6)",
        tension: 0.2,
      },
      {
        label: "Fit Follow Up",
        data: [],
        fill: false,
        borderColor: "rgba(234, 179, 8, 0.6)",
        tension: 0.2,
      },
      {
        label: "Unfit",
        data: [],
        fill: false,
        borderColor: "rgba(239, 68, 68, 0.6)",
        tension: 0.2,
      },
    ],
  });
  const [startDate, setStartDate] = useState(
    startOfMonth(subMonths(new Date(), 11))
  );
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const months = generateMonths(startDate, endDate);
        const fitData = Array(months.length).fill(0);
        const fitFollowUpData = Array(months.length).fill(0);
        const unfitData = Array(months.length).fill(0);

        await Promise.all(
          months.map(async (month, index) => {
            const [monthName, year] = month.split(" ");
            const monthIndex = new Date(
              Date.parse(`${monthName} 1, ${year}`)
            ).getMonth();
            const startDate = `${year}-${String(monthIndex + 1).padStart(
              2,
              "0"
            )}-01`;
            const endDate = new Date(year, monthIndex + 1, 1)
              .toISOString()
              .split("T")[0];

            try {
              const response = await axios.get(`${apiUrl}/fdm/countResult`, {
                params: { startDate, endDate },
                headers: { Authorization: `Bearer ${token}` },
              });

              if (response.data.success) {
                const data = response.data.data;
                fitData[index] = data.resultFit || 0;
                fitFollowUpData[index] = data.resultFitFollowUp || 0;
                unfitData[index] = data.resultUnfit || 0;
              } else {
                console.error(
                  `Failed to fetch data for ${month}: `,
                  response.data.message
                );
              }
            } catch (error) {
              console.error(`Error fetching data for ${month}: `, error);
            }
          })
        );

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Fit",
              data: fitData,
              fill: false,
              borderColor: "rgba(34, 197, 94, 0.6)",
              tension: 0.2,
            },
            {
              label: "Fit Follow Up",
              data: fitFollowUpData,
              fill: false,
              borderColor: "rgba(234, 179, 8, 0.6)",
              tension: 0.2,
            },
            {
              label: "Unfit",
              data: unfitData,
              fill: false,
              borderColor: "rgba(239, 68, 68, 0.6)",
              tension: 0.2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [token, startDate, endDate]);

  const generateMonths = (start, end) => {
    const labels = [];
    let current = start;
    while (current <= end) {
      labels.push(format(current, "MMM yyyy"));
      current = addMonths(current, 1);
    }
    return labels;
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-[10px] xl:h-full lg:h-[20rem] shadow-md">
      <h1 className="font-semibold text-sm text-left leading-none">
        Laporan FDM Bulanan
      </h1>
      <div className="flex gap-2 mt-2 mb-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          locale={id}
          className="w-full text-xs rounded-[5px] border-gray-300"
          wrapperClassName="w-full"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          locale={id}
          className="w-full text-xs rounded-[5px] border-gray-300"
          wrapperClassName="w-full"
        />
      </div>

      <div className="h-[45vh] md:h-[30rem] lg:h-[14rem] xl:h-[85%] flex items-center justify-center">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
