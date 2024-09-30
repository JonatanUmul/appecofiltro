import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import './App.css';
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
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', height: '100vh', overflow: 'auto' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>Dashboard</h2>
      
      <DatePicker 
          onChange={handleDateChange} 
          style={{ marginBottom: '20px', width: '100%' }} 
          getPopupContainer={trigger => trigger.parentNode} 
      />

      {/* Contenedor de los gráficos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Gráficos 1, 2 y 3 en una fila */}
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '20px',
          }}>
          {/* Gráfico 1 */}
          <div style={{ flex: '1', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de Planificación Mensual</p>
            <div style={{ height: '400px' }}>
              <PlanMensual planCumplido={planMesData} />
            </div>
          </div>

          {/* Gráfico 2 */}
          <div style={{ flex: '1', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de % Eficiencia</p>
            <div style={{ height: '400px' }}>
              <PorcentajeEficienciaMensual planCumplido={planMesData} />
            </div>
          </div>

          {/* Gráfico 3 */}
          <div style={{ flex: '1', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de Responsables</p>
            <div style={{ height: '400px' }}>
              <ResponsablesArea data={planMesData} />
            </div>
          </div>
        </div>

        {/* Gráficos 4 y 5 en otra fila */}
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '20px',
          }}>
          {/* Gráfico 4 */}
          <div style={{ flex: '1', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de Planificación Diario</p>
            <div style={{ height: '400px' }}>
              <PlanDiario planCumplido={planCumplido} />
            </div>
          </div>

          {/* Gráfico 5 */}
          <div style={{ flex: '1', padding: '10px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Gráfico de Comparativa</p>
            <div style={{ height: '400px' }}>
              <PorcentajeEficienciaDiario planCumplido={planCumplido} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

