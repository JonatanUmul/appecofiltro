
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estiloTabla.css'
const URL = process.env.REACT_APP_URL

const ConsultaDTHP = ({OTDats,  id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);
// const [id]= OTDats.length>0?OTDats[0].id:''
console.log('id seleccionado', fila)
  useEffect(() => {
    axios.get(`${URL}/DOTDMP/${id || 'null'} `)
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
        <th scope="col">Fecha</th>
        <th scope="col">Aserradero</th>
        <th scope="col">Lb Aserrin</th>
        <th scope="col">Tipo Cernido</th>
     
      </tr>
    </thead>
    <tbody>
      {Array.isArray(fila) && fila.length > 0 && fila.map((fila, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className="text-wrap">{formatFecha(fila.fecha_creacion)}</td>
          <td>{fila.lbaserrin}/{fila.lbaserrin2}</td>
          <td>{fila.aserradero1}/{fila.aserradero2}</td>
          <td>{fila.tipocernido1}/{fila.tipocernido2}</td>
     
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
  );
};

export default ConsultaDTHP;
