import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL;
const ConsultaDTT = ({  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/DCPFM/${id}`)
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
  <table className="table text-center" >
    <thead>
      <tr>
      <th scope="col">#</th>
            <th scope="col">Fecha de Producción</th>
            <th scope="col">Hora</th>
            <th scope="col">Orden</th>
            <th scope="col">Barro Lb</th>
            <th scope="col">Aserrin LB</th>
            <th scope="col">Humedad Barro</th>
            <th scope="col">Humedad Aserrín</th>
            <th scope="col">Aserradero</th>
            <th scope="col">Turno de Producción</th>
            <th scope="col">Formulador</th>
        
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="text-wrap">{formatFecha(fila.fecha_produccion)}</td>
          <td>{fila.hora_creacion}</td>
          <td>{fila.id_cfmp}</td>
          <td>{fila.barroLB}</td>
          <td>{fila.aserrinLB}</td>
          <td>{fila.humedadBarro}</td>
          <td>{fila.humedadAserrin}</td>
          <td>{fila.aserradero}</td>
          <td>{fila.turnoProduccion}</td>
          <td>{fila.formulador}</td>
          

        
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
  );
};

export default ConsultaDTT;


