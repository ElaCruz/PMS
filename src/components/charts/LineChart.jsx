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

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function LineChart() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const [visitorData, setVisitorData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/visitors/")
      .then((response) => response.json())
      .then((data) => {
        // Process the visitor data to extract the date/month information
        const visitorDates = data.map((visitor) => {
          const date = new Date(visitor.date);
          const month = date.toLocaleString("default", { month: "long" });

          return month;
        });

        // Count the number of visits for each date/month
        const visitCounts = visitorDates.reduce((counts, month) => {
          counts[month] = (counts[month] || 0) + 1;
          return counts;
        }, {});

        const visitData = Object.values(visitCounts);
        setVisitorData(visitData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  




}

export default LineChart;