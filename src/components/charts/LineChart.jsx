// import React from 'react';
// import { Line } from 'react-chartjs-2';

// function LineChart() {
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         label: 'Visitors',
//         data: [500, 1000, 750, 1250, 800, 1500],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 2,
//         pointRadius: 4,
//         pointBackgroundColor: 'rgba(75, 192, 192, 1)',
//         pointBorderColor: '#fff',
//         pointHoverRadius: 6,
//         pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//         pointHoverBorderColor: '#fff',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// }

// export default LineChart;

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineChart() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance.current) {
        // Destroy the previous chart instance if it exists
        chartInstance.current.destroy();
      }

      const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Visitors',
            // data: [500, 1000, 750, 1250, 800, 1500],
            data: [5, 10, 7.5, 12.5, 8, 15],
            backgroundColor: '#5B5FC7',
            // borderColor: 'rgba(75, 192, 192, 1)',
            borderColor: '#5B5FC7',
            borderWidth: 2,
            pointRadius: 4,
            // pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: '#5B5FC7',
            pointBorderColor: '#fff',
            pointHoverRadius: 6,
            // pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointHoverBackgroundColor: '#5B5FC7',
            pointHoverBorderColor: '#fff',
          },
        ],
      };

      const chartConfig = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 20,
            },
          },
        },
      };

      // Create a new chart instance
      chartInstance.current = new Chart(chartContainer.current, chartConfig);
    }

    // Clean up the chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartContainer}></canvas>;
}

export default LineChart;