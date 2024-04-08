import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { formatFecha } from "../utilidades/FormatearFecta.js";

const DashHornos = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date())); // Movido al nivel superior

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTHP/${fecha_creacion_inicio || 'null'}`;

    axios.get(url)
      .then((response) => {
        setData(response.data);
        console.log('datos consulta', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [fecha_creacion_inicio]);

  useEffect(() => {
    if (chartContainer.current && data.length > 0) {
      chartInstance.current = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels: data.map(entry => entry.time),
          datasets: [{
            label: 'Temperatura',
            data: data.map(entry => entry.temperature),
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
                text: 'Tiempo'
              }
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div>
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha 1</label>
        <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
      </div>  
      {error && <div>Error: {error}</div>}
      <canvas ref={chartContainer} />
    </div>
  );
};

export default DashHornos;
