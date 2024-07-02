import React from "react";
import { Line } from "react-chartjs-2";
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
  // Data dan options untuk chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Example Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        
      },
      tooltip : {
        enabled: true,
      }
    },
  };

  return (
    <div className="w-[27rem] h-[17.5rem] bg-white p-6 mt-4 rounded-[10px] shadow-md">
      <h1 className="bold text-left">Line Chart</h1>
      <div className="flex items-center justify-center min-h-full">
        <Line data={data} options={options}/>
      </div>
    </div>
  );
};

export default LineChart;
