import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import './App.css'; // Asegúrate de tener un archivo CSS para los estilos
import PlanMensual from './graficos/PlanMensual';
import PorcentajeEficienciaMensual from './graficos/PorcentajeEficienciaMensual.jsx';
import PlanDiario from './graficos/PlanDiario.jsx';
import PorcentajeEficienciaDiario from './graficos/PorcentajeEficienciaDiario.jsx';

const App = () => {
  const URL = process.env.REACT_APP_URL;
  const [planMesData, setPlanMesData] = useState([]);
  const [planCumplido, setPlanCumplido] = useState([]);
  const [hoy, setHoy] = useState(dayjs().format('YYYY-MM-DD'));
  const [fechaInicial, setFechaInicial] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planCumplidoResponse, planMesResponse] = await Promise.all([
          axios.get(`${URL}/PlanCumplido/${hoy}`),
          axios.get(`${URL}/PlanCumplido/${fechaInicial}/${fechaFin}`)
        ]);
        setPlanCumplido(planCumplidoResponse.data.rows);
        setPlanMesData(planMesResponse.data.rows);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [URL, hoy, fechaInicial, fechaFin]);

  const handleDateChange = (date) => {
    if (date) {
      setHoy(date.format('YYYY-MM-DD'));
      const firstDayOfMonth = date.startOf('month').format('YYYY-MM-DD');
      const lastDayOfMonth = date.endOf('month').format('YYYY-MM-DD');
      setFechaInicial(firstDayOfMonth);
      setFechaFin(lastDayOfMonth);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', overflow: 'auto', maxHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Dashboard</h2>
      
      <DatePicker 
          onChange={handleDateChange} 
          style={{ marginBottom: '20px', width: '100%' }} 
          getPopupContainer={trigger => trigger.parentNode} // Ajusta el contenedor del popup
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', marginBottom:'30px' }}>
        {/* Gráfico 1 */}
        <div style={{ flex: '1 1 45%', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '500px', marginBottom: '10px' }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de Planificación Mensual</p>
          <PlanMensual planCumplido={planMesData} />
        </div>

        {/* Gráfico 2 */}
        <div style={{ flex: '1 1 45%', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '500px', marginBottom: '10px' }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de % Eficiencia</p>
          <PorcentajeEficienciaMensual planCumplido={planMesData} />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px',  marginBottom:'30px'}}>
        {/* Gráfico 3 */}
        <div style={{ flex: '1 1 45%', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '500px', marginBottom: '10px' }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de Planificación Diario</p>
          <PlanDiario planCumplido={planCumplido} />
        </div>

        {/* Gráfico 4 */}
        <div style={{ flex: '1 1 45%', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '500px', marginBottom: '10px' }}>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de Comparativa</p>
          <PorcentajeEficienciaDiario planCumplido={planCumplido} />
        </div>
      </div>
    </div>
  );
};

export default App;


