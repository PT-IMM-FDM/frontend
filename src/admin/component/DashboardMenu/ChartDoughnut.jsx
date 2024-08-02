import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Title, Legend, Tooltip } from "chart.js";

Chart.register(ArcElement, Legend, Title, Tooltip);

const DoughnutChart = ({ name, dataResult, position, noDataText, noDepartmentFilterText, checkDepartmentFilter, isDepartmentFilterApplied }) => {
  const hasData = dataResult && (dataResult.resultFit || dataResult.resultFitFollowUp || dataResult.resultUnfit);

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
          "rgba(34, 197, 94, 0.4)", // Green color
          "rgba(234, 179, 8, 0.4)", // Yellow color
          "rgba(239, 68, 68, 0.4)", // Red color
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)", // Green color
          "rgba(234, 179, 8, 1)", // Yellow color
          "rgba(239, 68, 68, 1)", // Red color
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
        position: position,
        labels: {
          font: {
            size: 10, // Set font size
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
      <div className="flex h-[15rem] items-center justify-center p-2">
        {checkDepartmentFilter && isDepartmentFilterApplied <= 0 ? (
          <p className="text-gray-500">{noDepartmentFilterText}</p>
        ) : hasData ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p className="text-gray-500">{noDataText}</p>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
