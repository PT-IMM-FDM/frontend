import React, { useEffect, useState } from "react";
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
        borderColor: "rgba(34, 197, 94, 0.6)", // Green color
        tension: 0.2,
      },
      {
        label: "Fit Follow Up",
        data: [],
        fill: false,
        borderColor: "rgba(234, 179, 8, 0.6)", // Yellow color
        tension: 0.2,
      },
      {
        label: "Unfit",
        data: [],
        fill: false,
        borderColor: "rgba(239, 68, 68, 0.6)", // Red color
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const months = generateMonths();
        const fitData = Array(months.length).fill(0);
        const fitFollowUpData = Array(months.length).fill(0);
        const unfitData = Array(months.length).fill(0);

        // Fetch data for each month in the last year
        await Promise.all(months.map(async (month, index) => {
          const [monthName, year] = month.split(" ");
          const monthIndex = new Date(Date.parse(`${monthName} 1, ${year}`)).getMonth();
          const startDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`;
          
          // Calculate endDate as the last day of the month
          const endDate = new Date(year, monthIndex + 1, 1).toISOString().split("T")[0];

          // console.log(`Fetching data from ${startDate} to ${endDate}`);

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
              console.error(`Failed to fetch data for ${month}: `, response.data.message);
            }
          } catch (error) {
            console.error(`Error fetching data for ${month}: `, error);
          }
        }));

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Fit",
              data: fitData,
              fill: false,
              borderColor: "rgba(34, 197, 94, 0.6)", // Green color
              tension: 0.2,
            },
            {
              label: "Fit Follow Up",
              data: fitFollowUpData,
              fill: false,
              borderColor: "rgba(234, 179, 8, 0.6)", // Yellow color
              tension: 0.2,
            },
            {
              label: "Unfit",
              data: unfitData,
              fill: false,
              borderColor: "rgba(239, 68, 68, 0.6)", // Red color
              tension: 0.2,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [token]);

  const generateMonths = () => {
    const now = new Date();
    const labels = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      labels.unshift(month.toLocaleString("default", { month: "short", year: "numeric" }));
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
  };

  // console.log("Chart data:", chartData);

  return (
    <div className="bg-white p-4 rounded-[10px] h-[18rem] shadow-md">
      <h1 className="bold text-left leading-none">Monthly FDM Report</h1>
      <div className="flex h-[15rem] items-center justify-center">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
