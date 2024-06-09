import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { formatFecha } from '../../utilidades/FormatearFecta.js';
import './styles.css';  // Importa el archivo CSS

const URL = process.env.REACT_APP_URL;
const HornosChart = () => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFechaCreacionInicio] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFechaCreacionFin] = useState(formatFecha(new Date()));
  const [modeloUF, setModeloUF] = useState(1);
  const [turn, setTurn] = useState(1);
  const [turno, setTurno] = useState([]);
  const [HornoSelect, setTHornos] = useState([]);
  const [horno, setHornoSelect] = useState(1);
  const [error, setError] = useState('');
  console.log(horno, fecha_creacion_inicio);

  useEffect(() => {
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${modeloUF || 'null'}/${turn || 'null'}/${horno || 'null'}`;

    axios.get(url)
      .then((response) => {
        const datosOrdenados = response.data.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
        setDatos(datosOrdenados);
        console.log('datos consulta', datosOrdenados);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [modeloUF, turn, fecha_creacion_inicio, fecha_creacion_fin, horno]);

  useEffect(() => {
    const maquinaria = "Horno";
    try {
      Promise.all([
        axios.get(`${URL}/maquinaria/${maquinaria}`),
        axios.get(`${URL}/Turnos`),
      ])
        .then(([HornosResponse, turnResponse]) => {
          setTHornos(HornosResponse.data);
          setTurno(turnResponse.data)
        })
        .catch((error) => {
          setError("Error al obtener los datos", error);
        });
    } catch (error) {
      setError("Error al obtener los datos", error);
    }
  }, []);

  useEffect(() => {
    if (datos.length === 0) return;

    const chartDom = document.getElementById('chart');
    const myChart = echarts.init(chartDom);

    const category = [];
    const barData = [];
    const lineData = [];

    datos.forEach((dato) => {
      const date = new Date(dato.fecha_real);
      category.push([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'));
      const b = parseFloat(dato.promedio);
      barData.push(b);
      lineData.push(dato.promedio);
    });

    const option = {
      backgroundColor: '#0f375f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc'
        }
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData,
          label: {
            show: true,
            position: 'top',
            formatter: '{@[0]}'
          }
        },
        {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#14c8d4' },
              { offset: 1, color: '#43eec6' }
            ])
          },
          data: barData
        }
      ]
    };

    myChart.setOption(option);
    window.addEventListener('resize', myChart.resize);

    return () => {
      window.removeEventListener('resize', myChart.resize);
      myChart.dispose();
    };
  }, [datos]);

  return (
    <div>
      <div className="col-md-6">
        <label htmlFor="aserradero" className="form-label small-label">
          Turno de Horneado
        </label>
        <select className="form-select small-select" id="id_turno" value={turn} onChange={(e) => setTurn(e.target.value)}>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(turno.rows) && turno.rows.length > 0 && turno.rows.map((turno) => (
            <option key={turno.id} value={turno.id}>
              {turno.turno}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-6">
        <label htmlFor="aserradero" className="form-label small-label">
          Horno
        </label>
        <select className="form-select small-select" value={horno} onChange={(e) => setHornoSelect(e.target.value)}>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(HornoSelect.rows) && HornoSelect.rows.length > 0 && HornoSelect.rows.map((horno) => (
            <option key={horno.id_maq} value={horno.id_maq}>
              {horno.nombre_maq}
            </option>
          ))}
        </select>
      </div>
      <div id="chart" style={{ width: '100%', height: 400 }}></div>
    </div>
  );
};

export default HornosChart;
