import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PorcentajeEficienciaMensual = ({ planCumplido }) => {
  const chartRef = useRef(null);
  console.log('Datos en gráfico mensual', planCumplido);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    // Agrupar los datos por proceso
    const procesos = {};

    planCumplido.forEach((item) => {
      const proceso = item.procesosBuscar;

      if (!procesos[proceso]) {
        procesos[proceso] = { planificado: 0, producido: 0 };
      }

      procesos[proceso].planificado += parseFloat(item.cantidad_planificada);
      if (item.producido !== null) {
        procesos[proceso].producido += parseFloat(item.producido);
      }
    });

    // Extraer los nombres de los procesos y sus cantidades
    const nombresProcesos = Object.keys(procesos);
    const planificado = nombresProcesos.map(proceso => procesos[proceso].planificado);
    const producido = nombresProcesos.map(proceso => procesos[proceso].producido || 0); // Usar 0 si no hay producción

    // Definición de las series de datos
    const series = [
      {
        data: planificado,
        type: 'bar',
        name: 'Planificado',
        itemStyle: {
          color: '#5470C6', // Color para lo planificado
        },
        label: {
          show: true,
          position: 'inside', // Colocar las etiquetas dentro de las barras
          formatter: '{c}', // Formato de las etiquetas (solo el valor)
          color: '#fff', // Color de las etiquetas
        },
      },
      {
        data: producido,
        type: 'bar',
        name: 'Producido',
        itemStyle: {
          color: '#91CC75', // Color para lo producido
        },
        label: {
          show: true,
          position: 'inside', // Colocar las etiquetas dentro de las barras
          formatter: '{c}', // Formato de las etiquetas (solo el valor)
          color: '#fff', // Color de las etiquetas
        },
      },
    ];

    // Configuración del gráfico
    const option = {
      legend: {
        data: ['Planificado', 'Producido'],
        orient: 'horizontal',
        top: 'top', // Colocar la leyenda en la parte superior
        textStyle: {
          fontSize: 16, // Tamaño de letra de la leyenda
        },
      },
      xAxis: {
        type: 'category',
        data: nombresProcesos, // Usar los nombres de los procesos
        axisLabel: {
          rotate: 30, // Rotar las etiquetas para mejorar la legibilidad
          fontSize: 12, // Ajustar el tamaño de la fuente
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 12, // Aumentar el tamaño de los números en el eje y
        },
      },
      grid: {
        top: '10%', // Espacio superior
        bottom: '15%', // Espacio inferior
        left: '10%', // Espacio izquierdo
        right: '10%', // Espacio derecho
      },
      series: series,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow', // Mostrar puntero de eje
        },
      },
    };

    // Establecer las opciones del gráfico
    myChart.setOption(option);

    // Limpiar el gráfico cuando el componente se desmonte
    return () => {
      myChart.dispose();
    };
  }, [planCumplido]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px' }} // Asegúrate de que la altura sea consistente
    />
  );
};

export default PorcentajeEficienciaMensual;

