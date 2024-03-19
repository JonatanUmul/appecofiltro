import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Importa Axios
import User from './Usr'
import { Button, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import '../EstiloModal.css'

const TablaUsuarios = () => {
    const [datos, setDatos] = useState([]);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const URL = 'http://localhost:3001/UsuariosR';
        axios.get(URL)
            .then(response => {
                setDatos(response.data.rows); // Actualiza los datos con los datos de la respuesta
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // const abrirFormularioCUsiario=()=>{
    //     window.location.href = '/User';
    // }
    const toggleModal = () => setModal(!modal);
    return (
        <div >
    
    <Button className='btn btn-primary btn-xl btn-block w-25' onClick={toggleModal}>Crear Usuario</Button>
            <Modal isOpen={modal} toggle={toggleModal} backdrop="static" collapse={true}>
                <ModalHeader toggle={toggleModal}>Crear Usuario</ModalHeader>
                <ModalBody>
                    {/* Renderiza el componente de creación de usuario dentro del modal */}
                    <User />
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="secondary" onClick={toggleModal}>Cancelar</Button> */}
                    {/* Agrega cualquier otro botón de acción necesario */}
                </ModalFooter>
            </Modal>
    <div style={{ overflowX: 'auto' }}>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre de usuario</th>
                    <th scope="col">Contraseña</th>
                    <th scope="col">Correo electrónico</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Fecha de Creación</th>
                    {/* Agrega más encabezados según tus datos */}
                </tr>
            </thead>
            <tbody>
                {datos.map((usuario, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{usuario.nombre_usuario}</td>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.contraseña}</td>
                        <td>{usuario.correo}</td>
                        <td>{usuario.telefono}</td>
                        <td>{usuario.id_rol}</td>
                        <td>{usuario.fecha_creacion}</td>
                        {/* Agrega más celdas según tus datos */}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
};

export default TablaUsuarios;
