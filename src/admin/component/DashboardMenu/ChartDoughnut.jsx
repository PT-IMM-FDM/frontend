import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Title, Legend, Tooltip } from "chart.js";

Chart.register(ArcElement, Legend, Title, Tooltip);

const DoughnutChart = ({name, dataResult}) => {

  // console.log(dataResult)
  const data = {
    labels: ["FIT", "FIT FOLLOW UP", "UNFIT"],
    datasets: [
      {
        data: [
          dataResult?.resultFit || 0,
          dataResult?.resultFitFollowUp || 0,
          dataResult?.resultUnfit || 0,
        ],
        backgroundColor: [
          "rgba(167, 243, 208, 0.6)", // Green color
          "rgba(254, 240, 138, 0.6)", // Yellow color
          "rgba(254, 202, 202, 0.6)", // Red color
        ],
        borderColor: [
          "rgba(167, 243, 208, 1)", // Green color
          "rgba(254, 240, 138, 1)", // Yellow color
          "rgba(254, 202, 202, 1)", // Red color
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
