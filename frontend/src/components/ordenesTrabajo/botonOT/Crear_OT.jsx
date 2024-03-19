import React, { useEffect, useState } from 'react'
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap'
import DTHP from '../detallado/DTHP'
import DTSASERRIN from '../detallado/DTSASERRIN'
import DTCMP1 from '../detallado/DTCA1'
import DTCA2 from '../detallado/DTCA2'
import DTPV from '../detallado/DTPV'
import DTFM from '../detallado/DTFM'
import DTP from '../detallado/DTP'
import DTHH from '../detallado/DTHH'
import LogoEco from '../../utilidades/LogoEco'



const CrearOT = ({ encabezado, id,EncName, fecha_creacion }) => {
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
      case 'OTHP':
        return <DTHP id={id}  encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion} />

      case 'OTSA':
        return <DTSASERRIN id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      

      case 'OTCA1':
        return <DTCMP1 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'OTCA2':
        return <DTCA2 id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>

      case 'OTPV':
          return <DTPV id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'OTFM':
          return <DTFM id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
    
      case 'OTP':
            return <DTP id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
      case 'OTHH':
            return <DTHH id={id} encabezado={encabezado} EncName={EncName} fecha_creacion={fecha_creacion}/>
      
  
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
      <button type="button" className="btn btn-success bt-sm" style={{ width: '60px', fontSize: '0.8rem', display: 'flex', justifyContent: 'center' }} onClick={handleClick}>
        OT
      </button>
      {/* Modal */}
      <Modal isOpen={modalVisible} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}>
          <LogoEco/>
        </ModalHeader>
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

export default CrearOT;
