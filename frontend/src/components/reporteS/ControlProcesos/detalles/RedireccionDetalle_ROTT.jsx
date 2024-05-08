
import React, {  useState } from 'react'
import './CssdetalleOTT.css'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ROTT from '../consultas/ROTT'
import ROTH from '../consultas/ROTH'

const Detalle = ({  
  id,
  id_horno,
  nombretabla,
  codigoInicio,
  codigoFinal,
  cantidad,
  fechaHorneado,
  turnoHorneado,
  turnoHorn,
  id_turno,
  hornedo,
  MCrudas,
  LBarro,
  LBaserrin,
  aserradero,
  tipCernido,
  modelo,
  id_modelo,
  hornn,
  hornero }) => {
 
  const [modalVisible, setModalVisible] = useState(false); 

console.log('verificacndo fecha',turnoHorn)

  // Función para abrir el modal cuando se hace clic en el botón
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal 
  const handleCloseModal = () => {
    setModalVisible(false);
  };



  // Función para renderizar el formulario seleccionado según el ID
  const renderSelectedForm = () => {
    switch (nombretabla) {
      case 'ctt':
        return <ROTT id={id}  nombretabla={nombretabla} codigoInicio={codigoInicio} codigoFinal={codigoFinal} cantidad={cantidad}  />
      case 'cthh':
          return <ROTH 
  id={id} 
  nombretabla={nombretabla}
  codigoInicio={codigoInicio}
  codigoFinal={codigoFinal}
  id_horno={id_horno}
  cantidad={cantidad}
  fechaHorneado={fechaHorneado}
  id_turno={id_turno}
  hornedo={hornedo}
  MCrudas={MCrudas}
  LBarro={LBarro}
  LBaserrin={LBaserrin}
  aserradero={aserradero}
  tipCernido={tipCernido}
  modelo={modelo}
  id_modelo={id_modelo}
  hornn={hornn}
  hornero={hornero} />
          
     
      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${nombretabla}`);
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${id}`);
    // Aquí puedes realizar cualquier acción necesaria con el ID seleccionado
    // Por ejemplo, abrir el modal correspondiente
    handleOpenModal();
  };

  return (
    
    <div className="container-fluid">
    <div className="d-flex justify-content-center align-items-center">
  <a type="button" onClick={handleClick}>
    <i className="bi bi-arrow-bar-right"></i>
  </a>
  <Modal isOpen={modalVisible} toggle={handleCloseModal} className="responsive-modal">
    <ModalHeader toggle={handleCloseModal}>{nombretabla}</ModalHeader>
    <ModalBody>{renderSelectedForm()}</ModalBody>
    <ModalFooter></ModalFooter>
  </Modal>
  </div>
</div>

  
  );
}

export default Detalle;
