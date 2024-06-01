import React from 'react';
import { Bar } from 'react-chartjs-2';

function GenderChart() {
  // Sample data
  const maleCount = 40;
  const femaleCount = 20;

  // Data for the bar chart
  const data = {
    labels: ['Males', 'Females'],
    datasets: [
      {
        label: 'Number of Prisoners',
        data: [maleCount, femaleCount],
        backgroundColor: ['#FF5252', '#FBC02D'],
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
        max: 60,
      },
    },
  };

  return (
    <div style={{height: '400px', margin: '9px auto',width:'280px'}}>
      {/* <h2>Gender Proportion of Prisoners</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default GenderChart;