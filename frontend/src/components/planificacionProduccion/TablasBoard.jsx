import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
// import './App.css';
import PlanMensual from './graficos/PlanMensual';
import PorcentajeEficienciaMensual from './graficos/PorcentajeEficienciaMensual.jsx';
import PlanDiario from './graficos/PlanDiario.jsx';
import PorcentajeEficienciaDiario from './graficos/PorcentajeEficienciaDiario.jsx';
import ResponsablesArea from './graficos/ResponsablesArea.jsx';

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

    // Actualizar datos cada 5 minutos
    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // 5 minutos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
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
    <div style={{ padding: '10px', backgroundColor: '#f0f2f5', height: '100vh', overflow: 'hidden' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Dashboard</h2>
      
      <DatePicker 
          onChange={handleDateChange} 
          style={{ marginBottom: '10px', width: '100%' }} 
          getPopupContainer={trigger => trigger.parentNode} 
      />

      {/* Contenedor de los gráficos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Gráficos en una sola fila */}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap', // Permitir que los gráficos se envuelvan en pantallas más pequeñas
          }}>
          {/* Gráfico 1 */}
          <div style={{ flex: '1 1 30%', padding: '5px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', fontFamily:'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de Planificación Mensual</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlanMensual planCumplido={planMesData} />
            </div>
          </div>

          {/* Gráfico 2 */}
          <div style={{ flex: '1 1 30%', padding: '5px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', fontFamily:'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de % Eficiencia</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PorcentajeEficienciaMensual planCumplido={planMesData} />
            </div>
          </div>

          {/* Gráfico 3 */}
          <div style={{ flex: '1 1 30%', padding: '5px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', fontFamily:'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de Responsables</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsablesArea data={planMesData} />
            </div>
          </div>
        </div>

        {/* Gráficos 4 y 5 en otra fila */}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap', // Permitir que los gráficos se envuelvan en pantallas más pequeñas
          }}>
          {/* Gráfico 4 */}
          <div style={{ flex: '1 1 30%', padding: '5px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', fontFamily:'Poppins', fontWeight: 'bold', fontSize: '26px' }}>Gráfico de Planificación Diario</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlanDiario planCumplido={planCumplido} />
            </div>
          </div>

          {/* Gráfico 5 */}
          <div style={{ flex: '1 1 30%', padding: '5px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', fontFamily:'Poppins', fontWeight: 'bold',   fontSize: '26px' }}>Gráfico de Comparativa Diario</p>
            <div style={{ height: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PorcentajeEficienciaDiario planCumplido={planCumplido} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
