import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Title, Legend, Tooltip } from "chart.js";

Chart.register(ArcElement, Legend, Title, Tooltip);

const DoughnutChart = ({
  name,
  dataResult,
  position,
  noDataText,
  noDepartmentFilterText,
  checkDepartmentFilter,
  isDepartmentFilterApplied,
}) => {
  const fit = dataResult?.resultFit || 0;
  const fitFollowUp = dataResult?.resultFitFollowUp || 0;
  const unfit = dataResult?.resultUnfit || 0;
  const total = fit + fitFollowUp + unfit;

  const getPercentage = (value) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) + "%" : "0%";
  };

  const hasData = total > 0;

  const data = {
    labels: [
      `FIT: ${fit} (${getPercentage(fit)})`,
      `FIT FOLLOW UP: ${fitFollowUp} (${getPercentage(fitFollowUp)})`,
      `UNFIT: ${unfit} (${getPercentage(unfit)})`,
    ],
    datasets: [
      {
        data: [fit, fitFollowUp, unfit],
        backgroundColor: [
          "rgba(34, 197, 94, 0.4)", // Green
          "rgba(234, 179, 8, 0.4)", // Yellow
          "rgba(239, 68, 68, 0.4)", // Red
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)", // Green
          "rgba(234, 179, 8, 1)", // Yellow
          "rgba(239, 68, 68, 1)", // Red
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
            size: 12, // Set font size
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
    <div className="bg-white p-4 rounded-[10px] h-[20rem] w-full shadow-md">
      <h1 className="font-semibold text-left leading-none">{name}</h1>
      <div className="flex h-[18rem] items-center justify-center p-2">
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
