import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { formatFecha } from "../utilidades/FormatearFecta.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; // Importar componentes de recharts
import './App.css'; // Asegúrate de tener un archivo CSS para los estilos

const App = () => {
  const URL = process.env.REACT_APP_URL;
  const [planMesData, setPlanMesData] = useState([]);
  const [planCumplido, setPlanCumplido] = useState([]);
  const [hoy, setHoy] = useState(formatFecha(new Date()));
  const [producidoarea, setProducido]= useState(0)
  console.log('Datos planCumplido:', producidoarea);
  console.log('Hoy:', hoy);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planMesResponse, planCumplidoResponse] = await Promise.all([
          axios.get(`${URL}/PlanMes`),
          axios.get(`${URL}/PlanCumplido/${hoy}`)
        ]);

        setPlanMesData(planMesResponse.data.rows);
        setPlanCumplido(planCumplidoResponse.data.rows);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [URL, hoy]);

  const filterPlanCumplidoData = () => {
    const filteredData = planCumplido.filter(item => dayjs(item.fecha).isSame(hoy, 'day'));
    console.log('Datos filtrados:', filteredData); // Añadir este console.log para ver los datos filtrados
    return filteredData;
  };

  const generateDailyColumns = () => {
    return [
      {
        title: 'Proceso',
        dataIndex: 'proceso',
        key: 'proceso',
      },
      {
        title: 'Planificado',
        dataIndex: 'cantidad_planificada',
        key: 'cantidad_planificada',
        render: (text) => parseFloat(text).toLocaleString(), // Formatear números
      },
      {
        title: 'Producido',
        key: 'producido',
        render: (_, record) => {
          const producedValues = Object.keys(record)
            .filter(key => key !== 'proceso' && key !== 'cantidad_planificada')
            .map(key => record[key])
            .filter(value => value > 0); // Filtramos solo valores mayores a 0
          const producedString = producedValues.join(', ');
         
          return producedString;
        },
      },
      {
        title: '% Efectividad',
        key: 'efectividad',
        render: (_, record) => {
          const planificado = parseFloat(record.cantidad_planificada) || 0;
          
          // Revisamos si se puede obtener el valor de producido
          const procesoKey = record.proceso.replace(/\s/g, '');
          const producido = parseFloat(record[procesoKey]) || 0;
          
          // Verificamos los valores obtenidos
          console.log('Proceso:', record.proceso);
          console.log('Proceso Key:', procesoKey, 'Valor producido:', producido);
          console.log('Planificado:', planificado, 'Producido:', producido);
          // Calculamos efectividad
          const efectividad = planificado > 0 ? ((producido / planificado) * 100).toFixed(2) : '0.00';
          
          // Estilos de color basados en la efectividad
          let color;
          if (efectividad >= 100) {
            color = 'green';
          } else if (efectividad >= 75) {
            color = 'orange';
          } else {
            color = 'red';
          }

          return (
            <Tag color={color}>
              {`${efectividad}%`}
            </Tag>
          );
        },
      },
    ];
  };


  // Definir las columnas estáticas para la tabla mensual
  const monthlyColumns = [
    {
      title: 'Proceso',
      dataIndex: 'proceso',
      key: 'proceso',
    },
    {
      title: 'Cantidad Planificada',
      dataIndex: 'cantidad_planificada',
      key: 'cantidad_planificada',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <h2 style={{ color: '#1890ff' }}>Plan Mensual</h2>
      <Table
        columns={monthlyColumns} // Columnas fijas para la tabla mensual
        pagination={{ position: ['topLeft', 'bottomRight'] }}
        dataSource={planMesData} // Datos para la tabla mensual
        rowKey="proceso"
        size="middle"
        className="large-table"
        style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '8px' }}
      />

      <h2 style={{ color: '#1890ff' }}>Plan Diario</h2>
      <DatePicker 
        value={dayjs(hoy)} // Convertir 'hoy' a dayjs
        onChange={(date) => {
          if (date) {
            setHoy(date.format('YYYY-MM-DD')); // Actualizar el estado de hoy
          }
        }} 
        style={{ marginBottom: '20px', width: '100%' }} 
      />
      <Table
        columns={generateDailyColumns()} // Columnas dinámicas filtradas por proceso
        pagination={{ position: ['topLeft', 'bottomRight'] }}
        dataSource={filterPlanCumplidoData()} // Datos filtrados de planCumplido para la tabla diaria
        rowKey="proceso"
        size="middle"
        className="large-table"
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
      />
    </div>
  );
};

export default App;
