
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const URL = process.env.REACT_APP_URL

const EstadoProc = ({ id, encabezado }) => {
  const [estado, setEstado] = useState([]);
  const [cambiarEst, setCambiarEst] = useState(""); // Estado para almacenar el estado seleccionado
  const [cambiarRuta, setCambiarRuta] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = `${URL}/EstadosProc`;
        const response = await axios.get(urls);
        setEstado(response.data);
        console.log('datos: ', response.data);
      } catch (error) {
        console.log('No se obtuvieron datos', error);
      }
    };

    fetchData();
  }, []);

  // Manejar el cambio de opción
  const handleChange = (e) => {
    setCambiarEst(e.target.value); // Actualizar el estado con el valor seleccionado
  };

  // Definir la ruta basada en el encabezado seleccionado
  useEffect(() => {
    switch (encabezado) {
      case 'othp':
        setCambiarRuta('othp');
        break;
      case 'otsa':
        setCambiarRuta('otsa');
        break;
      case 'otca1':
        setCambiarRuta('otca1');
        break;
      case 'otca2':
        setCambiarRuta('otca2');
        break;
      case 'otpv':
        setCambiarRuta('otpv');
        break;
      case 'otp':
        setCambiarRuta('otp');
        break;
      case 'othh':
        setCambiarRuta('othh');
        break;
      case 'otfm':
        setCambiarRuta('otfm');
        break;
      case 'otip':
          setCambiarRuta('otip');
          break; 
          case 'otcc':
          setCambiarRuta('otcc');
          break;  
      // default:
      //   setCambiarRuta('ruta-por-defecto');
      //   break;
    }
  }, [encabezado]); // Ejecutar el efecto cuando el encabezado cambie 

  // Realizar la solicitud POST cuando se seleccione un estado
  useEffect(() => {
    const enviarEstado = async () => {
      if (cambiarEst !== "") {
        try {
          const response = await axios.put(`${URL}/${cambiarRuta}`, { id_est: cambiarEst, id });
          console.log('Datos de la tabla:', response.data);
          // Aquí puedes hacer algo con los datos de la tabla, por ejemplo, actualizar el estado
          window.location.href = "/Home/TablaOT";
        } catch (error) {
          console.log('Error al obtener los datos de la tabla:', error);
        }
      }
    };

    enviarEstado();
  }, [cambiarEst, cambiarRuta]); // Ejecutar cuando cambiarEst o cambiarRuta cambien

  console.log(id, encabezado);
  console.log(cambiarRuta);
  console.log(cambiarEst);

  return (  
    <div>
      <select
        name="estado"
        id="id_est"
        className="btn btn-sm btn-dark dropdown-toggle"
        onChange={handleChange} // Agregar el evento onChange
        value={cambiarEst} // Establecer el valor seleccionado
      >
        <option value="">Estado</option>
        {Array.isArray(estado.rows) &&
          estado.rows.map((estados) => (
            <option key={estados.id_est} value={estados.id_est}>
              {estados.estado}
            </option>
          ))}
      </select>

      
    </div>
  );
};

export default EstadoProc;
