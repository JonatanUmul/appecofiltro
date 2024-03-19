import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ConsultaDCPB from '../consutas/ConsultaDCPB'
import ConsultaDCPS from '../consutas/ConsultaDCPS'
import ConsultaDRM from '../consutas/ConsultaDRM'
import ConsultaDTT from '../consutas/ConsultaDTT'


const Detalle = ({ encabezado, id,EncName, fecha_creacion }) => {
  const [modalVisible, setModalVisible] = useState(false); 



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
    switch (encabezado) {
      case 'CPB':
        return <ConsultaDCPB id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />

      case 'CPS':
        return <ConsultaDCPS id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      

      case 'CRM':
        return <ConsultaDRM id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'CTT':
        return <ConsultaDTT id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
  
      default:
        return <p>Formulario no encontrado</p>;
    }
  };

  // Definir una función de manejo de clics
  const handleClick = () => {
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${encabezado}`);
    console.log(`Se ha seleccionado la orden de trabajo con ID: ${id}`);
    // Aquí puedes realizar cualquier acción necesaria con el ID seleccionado
    // Por ejemplo, abrir el modal correspondiente
    handleOpenModal();
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <a type="button"  onClick={handleClick}>
      <i class="bi bi-arrow-bar-right"></i>
      </a>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="xl" backdrop="static">
        <ModalHeader toggle={handleCloseModal}>{encabezado } - {EncName}</ModalHeader>
        <ModalBody>
          {/* Renderiza el componente correspondiente al formulario seleccionado dentro del modal */}
          {renderSelectedForm()}
        </ModalBody>
        <ModalFooter>
          {/* Puedes agregar botones de acción necesarios */}
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Detalle;
