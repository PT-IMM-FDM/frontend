import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Legend, Tooltip } from 'chart.js';

Chart.register(ArcElement, Legend, Title, Tooltip);

const DoughnutChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Custom Doughnut Chart',
        font: { size: 20 }
      },
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
    <div className='flex justify-center w-[30rem] h-[26rem] bg-white p-6 mt-4 rounded-[10px] shadow-md'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
