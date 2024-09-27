import React, { useRef } from 'react';
import TablasBoard from './TablasBoard';

const App = () => {
  // Ref para la sección que se maximizará
  const sectionRef = useRef(null);

  // Función para activar pantalla completa
  const handleFullscreen = () => {
    if (sectionRef.current.requestFullscreen) {
      sectionRef.current.requestFullscreen();
    } else if (sectionRef.current.webkitRequestFullscreen) { // Para Safari
      sectionRef.current.webkitRequestFullscreen();
    } else if (sectionRef.current.msRequestFullscreen) { // Para IE11
      sectionRef.current.msRequestFullscreen();
    }
  };

  return (
    <div>
      <button onClick={handleFullscreen}>Pantalla Completa</button>
      
      {/* Sección de la app que se mostrará en pantalla completa */}
      <div
        ref={sectionRef}
        style={{ width: '100%', height: 'calc(110vh - 50px)', backgroundColor: '#f0f0f0', marginTop: '20px', overflow: 'auto' }} // Ajuste en el height y overflow
      >
        <TablasBoard />
      </div>
    </div>
  );
};

export default App;
