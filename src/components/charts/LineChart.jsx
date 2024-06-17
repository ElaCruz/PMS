
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

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

        // Create an array of visit count values in the order of months
        const visitData = Object.values(visitCounts);

        // Update the visitor data state
        setVisitorData(visitData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
            data: visitorData,
            backgroundColor: "#5B5FC7",
            borderColor: "#5B5FC7",
            borderWidth: 2,
            pointRadius: 4,
            // pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: '#5B5FC7',
            pointBorderColor: '#fff',
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#5B5FC7",
            pointHoverBorderColor: "#fff",
          },
        ],
      };

      const chartConfig = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 20,
              max: Math.max(...visitorData) + 5,
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
  }, [visitorData]);

  return <canvas ref={chartContainer}></canvas>;
}

export default LineChart;