
import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import RDTCC from '../consultas/RDTCC'

const Detalle = ({  id,fechaHorneado,nombretabla,id_turno,id_modelo,id_horno }) => {
 console.log( 'datos props',fechaHorneado,nombretabla,id_turno,id_modelo,id_horno)
  const [modalVisible, setModalVisible] = useState(false); 

console.log('nombre tabla',nombretabla)

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
      case 'cthh':
          return <RDTCC 
  id={id} 
  nombretabla={nombretabla}
  id_horno={id_horno}
  fechaHorneado={fechaHorneado}
  id_turno={id_turno}
  id_modelo={id_modelo}

  />
          
     
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
  <Modal isOpen={modalVisible} toggle={handleCloseModal} >
    <ModalHeader toggle={handleCloseModal}>{nombretabla}</ModalHeader>
    <ModalBody>{renderSelectedForm()}</ModalBody>
    <ModalFooter></ModalFooter>
  </Modal>
  </div>
</div>

  
  );
}

export default Detalle;
