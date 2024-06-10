import React, { useState } from 'react';
import Horno1 from './GraficosHornos/Horno1';
import TempTunel from './GraficosHornos/TempTunel';
import './estilos.css';
import Filtros from './GraficosHornos/Filtros';
import { formatFecha } from "../utilidades/FormatearFecta";
import HumedadMP from './GraficosHornos/HumedadMP';

const Dashboard = () => {
  const [filtros, setFiltros] = useState({
    turn: 1,
    horno: 1,
    fecha_creacion_inicio: formatFecha(new Date()),
    fecha_creacion_fin: formatFecha(new Date())
  });

  const handleFiltrosChange = (newFiltros) => {
    setFiltros(newFiltros);
  };

  console.log('Verificando datos en Dashboard', filtros);

  return (
    <div className="row">
   
      <div className="row">
        <div className="col-4 mb-3">
          <Filtros onChange={handleFiltrosChange} />
        </div>
      </div>
      <div className="col-4 mb-5">
      <div style={{ marginBottom: '20px' }}>
        <HumedadMP  filtros1={filtros}/>
      </div>
    </div>
      <div className="col-4 mb-5">
        <div style={{ marginLeft: '20px' }}>
          <Horno1 filtros1={filtros} />
        </div>
      </div>
      <div className="col-4 mb-5">
        <div style={{ marginBottom: '20px' }}>
          <TempTunel filtros1={filtros} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
