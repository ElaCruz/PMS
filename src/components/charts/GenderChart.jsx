import { Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";

function GenderChart() {
  // Sample data
  // const maleCount = 40;
  // const femaleCount = 20;
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    // Fetch prisoner data
    fetch("http://127.0.0.1:8000/api/prisoners/")
      .then((response) => response.json())
      .then((data) => {
        // Calculate male and female counts from the data
        const malePopulation = data.filter(
          (prisoner) => prisoner.gender_name === "MALE"
        );
        const femalePopulation = data.filter(
          (prisoner) => prisoner.gender_name === "FEMALE"
        );
        setMaleCount(malePopulation.length);
        setFemaleCount(femalePopulation.length);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Data for the bar chart
  // Data for the bar chart
  const data = {
    labels: ["Males", "Females"],
    datasets: [
      {
        label: "Number of Prisoners",
        data: [maleCount, femaleCount],
        backgroundColor: ["#FF5252", "#FBC02D"],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(maleCount, femaleCount) + 10,
      },
    },
  };

  return (
    <div style={{ height: "400px", margin: "9px auto", width: "280px" }}>
      {/* <h2>Gender Proportion of Prisoners</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default GenderChart;