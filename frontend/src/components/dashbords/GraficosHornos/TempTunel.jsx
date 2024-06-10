import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { formatFecha } from '../../utilidades/FormatearFecta.js';
import './styles.css';

const URL = process.env.REACT_APP_URL;

const TempTunel = ({filtros1}) => {
const fechaInicio = filtros1.fecha_creacion_inicio;
const fechaFin = filtros1.fecha_creacion_fin;
const horno = filtros1.horno;
const turno = filtros1.turn;

 console.log('datos de temp',fechaInicio,fechaFin,horno,turno)
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setfecha_creacion_inicio]=useState(formatFecha(fechaInicio))
  const [fecha_creacion_fin, setfecha_creacion_fin]=useState(formatFecha(fechaFin))
  const [turnoProd, setturnoProd]=useState('')
 const [tunelNum, settunelNum]=useState('')
 const [ ufmodelo, setufmodelo]=useState('')
 const [id, setid]= useState('')
  const [error, setError] = useState('');
  const chartRef = useRef(null);
  console.log('Esperando datos de Tunel',datos)
 

  const fetchData = async () => {
    try {
     const url = `${URL}/DTT/${id || 'null'}/${ufmodelo || 'null'}/${turnoProd || 'null'}/${tunelNum || 'null'}/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;
      const response = await axios.get(url);
      const datosOrdenados = response.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
      setDatos(datosOrdenados);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al obtener los datos');
    }
  };
  // const fetchData = async () => {
  //   try {
  //     const url = `${URL}/DTT/${id || 'null'}/${ufmodelo || 'null'}/${turnoProd || 'null'}/${tunelNum || 'null'}/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;
  //     const response = await axios.get(url);
  //     const datosOrdenados = response.data.sort((a, b) => new Date(a.fecha_real) - new Date(b.fecha_real));
  //     setDatos(datosOrdenados);
  //   } catch (error) {
  //     console.error('Error al obtener los datos:', error);
  //     setError('Error al obtener los datos');
  //   }
  // };
  

  useEffect(() => {
    fetchData();
  },[]);


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

export default TempTunel;
