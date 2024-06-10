import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { formatFecha } from '../../utilidades/FormatearFecta.js';
import './styles.css';


const URL = process.env.REACT_APP_URL;

const HornosChart = ({filtros1}) => {
  
  const [datos, setDatos] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha_creacion_inicio: formatFecha(new Date()),
    fecha_creacion_fin: formatFecha(new Date()),
    turn: 1,
    horno: 1,
  });
  const [error, setError] = useState('');
  const chartRef = useRef(null);
console.log('datos que vienen en filtro',filtros)
useEffect(() => {
  setFiltros(filtros1);
}, [filtros1]);

  const fetchData = async () => {
    try {
      const { fecha_creacion_inicio,fecha_creacion_fin, turn, horno } = filtros;
      const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/null/${turn || 'null'}/${horno || 'null'}`;
      const response = await axios.get(url);
      const datosOrdenados = response.data.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
      setDatos(datosOrdenados);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al obtener los datos');
    }
  };

  useEffect(() => {
    fetchData();
  }, [filtros]);

  useEffect(() => {
    const chartDom = chartRef.current;
    let myChart = echarts.init(chartDom);

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

    const resizeChart = () => {
      if (myChart) {
        myChart.resize();
      }
    };

    const debounce = (func, wait) => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
      };
    };

    const debouncedResizeChart = debounce(resizeChart, 200);

    window.addEventListener('resize', debouncedResizeChart, { passive: true });

    return () => {
      window.removeEventListener('resize', debouncedResizeChart);
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [datos]);

 

  return (
    <div>
      <div id="chart" ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default HornosChart;
