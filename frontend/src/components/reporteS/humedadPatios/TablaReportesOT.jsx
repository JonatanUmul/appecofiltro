import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ROTHP from './ROTHP'
import ROTSA from './ROTSA'
import ROTCA1 from './ROTCA1'
import ROTCA2 from './ROTCA2'



const BotonOT = () => {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    if (dropdownToggle) {
      new bootstrap.Dropdown(dropdownToggle);
    }
  }, []);

  const toggleModal = () => setModal(!modal);

  // Función para manejar el evento de clic en un elemento del menú desplegable
  const handleDropdownItemClick = (event, option, title) => {
    // Evita que el enlace predeterminado se active
    event.preventDefault();
    // Abre el modal
    setSelectedOption(option);
    setModalTitle(title);
    toggleModal();
  };

  // Función para renderizar el componente correspondiente al formulario seleccionado
  const renderSelectedForm = () => {
    switch (selectedOption) {
    
      case '1':
        return <ROTHP/>
      case '2':
        return <ROTSA/>
      case '3':
        return <ROTCA1/> 
      case '4':
        return <ROTCA2/>
       
     

      default:
        return null;
    }
  };

  return (
    <div className="dropdown">
    
    {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}

      <button
        className="btn btn-secondary dropdown-toggle mb-3"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Crear
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '1', 'Tanque de Agua 2.0')}>
          1. Reporte Humedad en Patios 
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '2', 'Extrusora 2.0')}>
          2. Reporte Secado de ASerrín
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '3', 'Cortador Automático')}>
          3. Reporte Cernido 1  
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '4', 'Banda Trasnportadora 2.0')}>
          4. Reporte Cernido 2
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '5', 'Prensa Hidraulica 2.0')}>
          5. Prensa Hidraulica 2.0
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '6', 'Prensa Hidraulica Mini')}>
          6. Prensa Hidraulica Mini
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '7', 'Mezcladora Mini')}>
          7. Mezcladora Mini
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '8', 'Mezcladora 2.0')}>
          8. Mezcladora 2.0
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '9', 'Tanque de Agua Mini')}>
          9. Tanque de Agua Mini
        </a>
        <a className="dropdown-item" href="#" onClick={(e) => handleDropdownItemClick(e, '10', 'Prensa Hidraulica Manual')}>
          10. Prensa Hidraulica Manual
        </a>

    

        {/* Agrega más elementos del menú desplegable aquí */}
      </div>
      {renderSelectedForm()}
    </div>
  );
};

export default BotonOT;
