import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Title, Legend, Tooltip } from "chart.js";

Chart.register(ArcElement, Legend, Title, Tooltip);

const DoughnutChart = ({name}) => {
  const data = {
    labels: ["UNFIT", "FIT", "FIT FOLLOW UP"],
    datasets: [
      {
        label: "My First Dataset",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          font: {
            size: 10, // Mengatur ukuran font
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-[10px] h-[18rem] shadow-md">
      <h1 className="bold text-left leading-none">{name}</h1>
      <div className="flex h-[15rem] items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
