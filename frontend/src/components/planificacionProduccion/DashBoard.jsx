import React, { useRef } from 'react';
import TablasBoard from './TablasBoard';
// import ButtonPlna from './BotonCrearPlan';

const App = () => {
  const sectionRef = useRef(null);

  const handleFullscreen = () => {
    if (sectionRef.current.requestFullscreen) {
      sectionRef.current.requestFullscreen();
    } else if (sectionRef.current.webkitRequestFullscreen) {
      sectionRef.current.webkitRequestFullscreen();
    } else if (sectionRef.current.msRequestFullscreen) {
      sectionRef.current.msRequestFullscreen();
    }
  };

  return (
    <div>
      {/* Contenedor para alinear los botones */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {/* Botón de crear plan */}
        {/* <ButtonPlna /> */}
        
        {/* Botón para pantalla completa */}
        <button style={{marginTop:'5px', width:'10%'}} className='btn-primary' onClick={handleFullscreen}>Pantalla Completa</button>
      </div>

      {/* Sección de la app que se mostrará en pantalla completa */}
      <div
        ref={sectionRef}
        style={{
          width: '100%',
          height: 'calc(110vh - 50px)',
          backgroundColor: '#f0f0f0',
          marginTop: '20px',
          overflow: 'auto',
        }}
      >
        <TablasBoard />
      </div>
    </div>
  );
};

export default App;
