import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'

const ConsultaDTT = ({ encabezado, EncName, fecha_creacion, id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/DTT/${id}`)
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
            <th scope="col">CTT</th>
            <th scope="col">Modelo</th>
            <th scope="col">Tunel</th>
            <th scope="col">Cabeza Derecha 1</th>
            <th scope="col">Pie Derecho 1</th>
            <th scope="col">Cabeza Derecha 2</th>
            <th scope="col">Pie Derecho 2</th>
            <th scope="col">Cabeza Derecha 3</th>
            <th scope="col">Pie Izquierdo 1</th>
            <th scope="col">Cabeza Izquierda 1</th>
            <th scope="col">Pie Izquierdo 2</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="text-wrap">{formatFecha(fila.fecha_creacion)}</td>
          <td>{fila.id_ctt}</td>
          <td>{fila.modelo}</td>
          <td>{fila.tunel}</td>
          <td>{fila.cabezaDerecha1}°</td>
          <td>{fila.pieDerecho1}°</td>
          <td>{fila.cabezaDerecha2}°</td>
          <td>{fila.pieDerecho2}°</td>
          <td>{fila.cabezaDerecha3}°</td>
          <td>{fila.pieIzquierdo1}°</td>
          <td>{fila.cabezaizquierda1}°</td>
          <td>{fila.pieIzquierdo2}°</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
  );
};

export default ConsultaDTT;


