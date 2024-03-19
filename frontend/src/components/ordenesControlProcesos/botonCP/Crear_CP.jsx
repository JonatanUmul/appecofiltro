import React, { useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import DCPB from '../detallado/DCPB'
import DCPS from '../detallado/DCPS'
import DRM from '../detallado/DRM'
import DTT from '../detallado/DTT'
import LogoEco from '../../utilidades/LogoEco'


const CrearCT = ({ encabezado, id, EncName, fecha_creacion, codigoInicio,codigoFinal  }) => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

console.log('propr recibios', encabezado, id)

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
        return <DCPB  encabezado={encabezado} EncName={EncName}fecha_creacion={fecha_creacion} id={id} codigoInicio={codigoInicio} codigoFinal= {codigoFinal} />
      case 'CPS':
        return <DCPS  encabezado={encabezado} EncName={EncName}fecha_creacion={fecha_creacion} id={id} codigoInicio={codigoInicio} codigoFinal= {codigoFinal} />
      case 'CRM':
        return <DRM  encabezado={encabezado} EncName={EncName}fecha_creacion={fecha_creacion} id={id} codigoInicio={codigoInicio} codigoFinal= {codigoFinal} />
      case 'CTT':
        return <DTT  encabezado={encabezado} EncName={EncName}fecha_creacion={fecha_creacion} id={id} codigoInicio={codigoInicio} codigoFinal= {codigoFinal} />
      
  
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
      <button type="button" className="btn btn-success bt-sm" style={{width: '60px', fontSize: '0.8rem', padding: '0.2rem 0.4rem'}} onClick={handleClick}>
        OT
      </button>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal} size='md' backdrop="static">
        <ModalHeader toggle={handleCloseModal}><LogoEco/></ModalHeader>
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

export default CrearCT;
