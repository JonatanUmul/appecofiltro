import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'

const ConsultaDTFM = ({ encabezado, EncName, fecha_creacion, id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]); 

  
  useEffect(() => {
    axios.get(`http://localhost:3001/DTFM/${id}`)

      .then((response) => {
        setFila(response.data.data); // Acceder a response.data.data
        console.log(response.data.data)
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, []);

 
  return (
    <div className="table-responsive">
      {error && <div>Error: {error}</div>}
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Producción</th>
            <th scope="col">OTFM</th>
            <th scope="col">Materia Prima</th>
            <th scope="col">Aserradero</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Peso</th>
            <th scope="col">Humedad</th>
         
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.id_otfm}</td>
              <td>{fila.descripcion_matprima}</td>
              <td>{fila.aserradero}</td>
              <td>{fila.cantidad}</td>
              <td>{fila.peso} Lb</td>
              <td>{fila.humedad}%</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaDTFM;
