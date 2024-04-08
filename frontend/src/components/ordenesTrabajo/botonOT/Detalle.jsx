
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
import ConsultaDTIP from '../consutas/ConsultaDTIP'
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
      case 'othp':
        return <ConsultaDTHP id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />

      case 'otsa':
        return <ConsultaDTSA id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      

      case 'otca1':
        return <ConsultaDTCA1 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'otca2':
        return <ConsultaDTCA2 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'otpv':
          return <ConsultaDTPV id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'otfm':
          return <ConsultaDTFM id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'otp':
            return <ConsultaDTP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
      case 'othh':
            return <ConsultaDTHH id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
  
      case 'otip':
              return <ConsultaDTIP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
          
    

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
    <div>
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
    </div>
  );
}

export default Detalle;
