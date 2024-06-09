import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { formatFecha } from '../../utilidades/FormatearFecta.js';
import './styles.css';  // Importa el archivo CSS
import Filtros from './Filtros.jsx';

const URL = process.env.REACT_APP_URL;

const HornosChart = () => {
  const [datos, setDatos] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha_creacion_inicio: formatFecha(new Date()),
    turn: 1,
    horno: 1,
  });
  const [error, setError] = useState('');

  const fetchData = () => {
    const { fecha_creacion_inicio, turn, horno } = filtros;
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_inicio || 'null'}/null/${turn || 'null'}/${horno || 'null'}`;

    axios.get(url)
      .then((response) => {
        const datosOrdenados = response.data.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
        setDatos(datosOrdenados);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [filtros]);

  useEffect(() => {
    if (datos.length === 0) return;

    const chartDom = document.getElementById('chart');
    const myChart = echarts.init(chartDom);

    const category = [];
    const barData = [];
    const lineData = [];

    datos.forEach((dato) => {
      const date = dato.hora_creacion;
      category.push([date].join('-'));
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

  const handleFiltrosChange = (newFiltros) => {
    setFiltros(newFiltros);
  };

  return (
    <div>
      <Filtros onChange={handleFiltrosChange} />
      <div id="chart" style={{ width: '100%', height: 400 }}></div>
    </div>
  );
};

export default HornosChart;
