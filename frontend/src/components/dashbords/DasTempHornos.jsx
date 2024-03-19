import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DashHornos = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current && data) { // Verifica si 'data' está definido
      chartInstance.current = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels: data.map(entry => entry.time),
          datasets: [{
            label: 'Temperatura',
            data: data.map(entry => entry.temperatura),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            tension: 0.3,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Temperatura (°C)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Time'
              }
            }
          }
        }
      });
    }
  
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default DashHornos;


