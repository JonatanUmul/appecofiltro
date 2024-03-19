import React, {  useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ConsultaDTP from '../consutas/ConsultaDTP'
import ConsultaDTHP from '../consutas/ConsultaDTHP'
import ConsultaDTSA from '../consutas/ConsultaDTSA'
import ConsultaDTCA1 from '../consutas/ConsultaDTCA1'
import ConsultaDTCA2 from '../consutas/ConsultaDTCA2'
import ConsultaDTPV from '../consutas/ConsultaDTPV'
import ConsultaDTFM from '../consutas/ConsultaDTFM'
import ConsultaDTHH from '../consutas/ConsultaDTHH'

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
      case 'OTHP':
        return <ConsultaDTHP id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />

      case 'OTSA':
        return <ConsultaDTSA id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      

      case 'OTCA1':
        return <ConsultaDTCA1 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'OTCA2':
        return <ConsultaDTCA2 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'OTPV':
          return <ConsultaDTPV id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'OTFM':
          return <ConsultaDTFM id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'OTP':
            return <ConsultaDTP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
      case 'OTHH':
            return <ConsultaDTHH id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
        
    

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
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="xl">
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
