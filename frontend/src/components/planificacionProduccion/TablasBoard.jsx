import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { formatFecha } from "../utilidades/FormatearFecta.js";
import './App.css'; // Asegúrate de tener un archivo CSS para los estilos

const App = () => {
  const URL = process.env.REACT_APP_URL;
  const [planMesData, setPlanMesData] = useState([]);
  const [planCumplido, setPlanCumplido] = useState([]);
  const [hoy, setHoy] = useState(formatFecha(new Date()));

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
    return planCumplido.filter(item => dayjs(item.fecha).isSame(hoy, 'day'));
  };

  // Columnas para la tabla de planificados
  const planColumns = [
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
  ];

  // Columnas para la tabla de producidos
  const producidoColumns = [
    {
      title: 'Producido',
      key: 'producido',
      render: (_, record) => {
        const producedValues = Object.keys(record)
          .filter(key => key !== 'proceso' && key !== 'cantidad_planificada')
          .map(key => record[key])
          .filter(value => value > 0); // Filtramos solo valores mayores a 0
        return producedValues.join(', ');
      },
    },
    {
      title: '% Efectividad',
      key: 'efectividad',
      render: (_, record) => {
        const planificado = parseFloat(record.cantidad_planificada) || 0;
        const procesoKey = record.proceso.replace(/\s/g, '');
        const producido = parseFloat(record[procesoKey]) || 0;
        const efectividad = planificado > 0 ? ((producido / planificado) * 100).toFixed(2) : '0.00';

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

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', overflow: 'auto', maxHeight: '100vh' }}>
      <h2 style={{ color: '#1890ff' }}>Plan Mensual</h2>
      <Table
        columns={[
          { title: 'Proceso', dataIndex: 'proceso', key: 'proceso' },
          { title: 'Cantidad Planificada', dataIndex: 'cantidad_planificada', key: 'cantidad_planificada' },
          { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
        ]}
        pagination={{ position: ['topLeft', 'bottomRight'] }}
        dataSource={planMesData}
        rowKey="proceso"
        size="middle"
        className="large-table"
        style={{ marginBottom: '20px', backgroundColor: '#fff', borderRadius: '8px' }}
      />

      <h2 style={{ color: '#1890ff' }}>Plan Diario</h2>
      {/* <DatePicker
        value={dayjs(hoy)}
        onChange={(date) => date && setHoy(date.format('YYYY-MM-DD'))}
        style={{ marginBottom: '20px', width: '100%' }}
      /> */}

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ width: '100%', maxWidth: '48%', marginRight: '2%' }}>
          {/* <h3 style={{ color: '#1890ff' }}>Planificado</h3> */}
          <Table
            columns={planColumns}
            pagination={{ position: ['topLeft', 'bottomRight'] }}
            dataSource={filterPlanCumplidoData()}
            rowKey="proceso"
            size="middle"
            className="large-table"
            style={{ backgroundColor: '#fff', borderRadius: '8px' }}
          />
        </div>

        <div style={{ width: '100%', maxWidth: '48%' }}>
          {/* <h3 style={{ color: '#1890ff' }}>Producido</h3> */}
          <Table
            columns={producidoColumns}
            pagination={{ position: ['topLeft', 'bottomRight'] }}
            dataSource={filterPlanCumplidoData()}
            rowKey="proceso"
            size="middle"
            className="large-table"
            style={{ backgroundColor: '#fff', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
