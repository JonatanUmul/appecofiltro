import React from 'react';
import DasAserrin from './DasAserrin';
import PropsHornos from './PropsHornos';
import './estilos.css'
import Clima from './Clima';
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div style={{ marginRight: '20px', marginBottom: '20px' }}>
        <DasAserrin />
      </div>
      <div className='xl'>
        <PropsHornos />
      </div>
     
    </div>
  );
};

export default Dashboard;
