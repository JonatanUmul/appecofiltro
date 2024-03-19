import React, { useState } from 'react'

import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'

import ConsultaCKTA from '../consutas/ConsultaCKTA'
import ConsultaCKEXT from '../consutas/ConsultaCKEXT'
import ConsultaCKBT from '../consutas/ConsultaCKBT'
import ConsultaCKCTA from '../consutas/ConsultaCKCTA'
import ConsultaCKCTAM from '../consutas/ConsultaCKTAM'
import ConsultaCKCM2 from '../consutas/ConsultaCKM2'
import ConsultaCKMM from '../consutas/ConsultaCKMM'
import ConsultaCKPH2 from '../consutas/ConsultaCKPH2'
import ConsultaCKPHM from '../consutas/ConsultaCKPHM'
import ConsultaCKPM from '../consutas/ConsultaCKPM'
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
      case 'CKTA':
        return <ConsultaCKTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKEXT':
        return <ConsultaCKEXT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKBT':
        return <ConsultaCKBT id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKCTA':
        return <ConsultaCKCTA id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKCTAM':
        return <ConsultaCKCTAM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKM2':
        return <ConsultaCKCM2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKMM':
        return <ConsultaCKMM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKPH2':
        return <ConsultaCKPH2 id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKPHM':
        return <ConsultaCKPHM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
      case 'CKPM':
        return <ConsultaCKPM id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />
                
        
    

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
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size="lg">
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
