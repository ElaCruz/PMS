import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const CellPopulation = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cells/');
        const data = response.data;

        // Log the entire response to inspect its structure
        console.log('API Response:', response);

        if (Array.isArray(data)) {
          const cellNames = data.map(cell => cell.name);
          const prisonerCounts = data.map(cell => cell.prisoner_count);

          const formattedChartData = {
            labels: cellNames,
            datasets: [
              {
                label: 'Number of Prisoners',
                data: prisonerCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 10, // Round borders of the bars
                barPercentage: 0.5, 
              },
            ],
          };

          setChartData(formattedChartData);
        } else {
          console.error('API response is not an array');
          setError('API response is not an array');
        }
      } catch (error) {
        console.error('Error fetching cell data:', error);
        setError('Error fetching cell data');
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      
      {error ? (
        <p>{error}</p>
      ) : (
        chartData && ( // Ensure chartData is not null before rendering the chart
          <Bar
            data={chartData}
            options={{
                plugins: {
        legend: {
          display: true,
          position: 'bottom',
          boxWidth: 10, 
          boxHeight: 10,
          usePointStyle: true
        },},
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        )
      )}
    </div>
  );
};

export default CellPopulation;
