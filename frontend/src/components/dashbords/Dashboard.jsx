import React from 'react';
import Horno1 from './GraficosHornos/Horno1';
import Horno2 from './GraficosHornos/Horno2';
import Horno3 from './GraficosHornos/Horno3';
import Horno4 from './GraficosHornos/Horno4';
import './estilos.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Horno1 />
      <Horno2 />
      <Horno3 />
      <Horno4 />
    </div>
  );
};

export default Dashboard;
