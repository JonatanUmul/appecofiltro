import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'

const ConsultaDTHH = ({ encabezado, EncName, fecha_creacion, id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/DTHH/${id}`)
      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
        console.log(response.data.data)
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 console.log('Orden seleccionada',id)
  return (
    <div className="table-responsive">
      {error && <div>Error: {error}</div>}
      <table className="table  text-center ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Producción</th>
            <th scope="col">OTHH</th>
            <th scope="col">Horneado</th>
            <th scope="col">Mermas Crudas</th>
            <th scope="col">barro</th>
            <th scope="col">Aserrin</th>
            <th scope="col">Inicio</th>
            <th scope="col">Fin</th>
            <th scope="col">Turno</th>
            <th scope="col">Aserradero</th>
            <th scope="col">Cernido</th>
            <th scope="col">Modelo</th>
            <th scope="col">Horno</th>
            <th scope="col">Hornero</th>
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.id_othh}</td>
              <td>{fila.horneado}</td>
              <td>{fila.mermasCrudas}</td>
              <td>{fila.librasBarro}</td>
              <td>{fila.librasAserrin}</td>
              <td>{fila.codigoInicio}</td>
              <td>{fila.CodigoFin}</td>
              <td>{fila.turno}</td>
              <td>{fila.aserradero}</td>
              <td>{fila.tipocernido}</td>
              <td>{fila.ufmodelo}</td>
              <td>{fila.enc_maq}</td>
              <td>{fila.operarios}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTHH;

