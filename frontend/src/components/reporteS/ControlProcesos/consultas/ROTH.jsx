import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { formatFecha } from "../../../utilidades/FormatearFecta";
import PdfROTHP from '../pdfECO/PdfROTHP'
import './estilosCss.css'
import ExcelROTHP from '../Excel/ExcelRothp'
const URL = process.env.REACT_APP_URL

const maquinaria = "Horno";

const ROTHP = ({ turnoHorn,id_modelo,id_turno, nombretabla,id_horno,codigoInicio,codigoFinal,fechaHorneado,turnoHorneado,hornedo,MCrudas,LBarro,LBaserrin,aserradero,tipCernido,modelo,hornn,hornero }) => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(fechaHorneado));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(fechaHorneado));
  const [modeloUF, setModeloUf] = useState(id_modelo);
  const [turn, setTurnoProd] = useState(id_turno)
  const [horno, setHornos] = useState(id_horno);

console.log('fecha horneado', turnoHorn)
  // Realizar las solicitudes para obtener datos
 
  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${modeloUF || 'null'}/${turn || 'null'}/${horno || 'null'}`;
  
    axios.get(url)
      .then((response) => {
        setDatos(response.data.data);
        console.log('datos consulta', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [ modeloUF, turn, horno, fecha_creacion_inicio,fecha_creacion_fin ]);


console.log(datos)
  return (
    




    
    <div className="ROTH">
    <div className="row mb-3">
    <div className="col-md-3">
  

  <div className="col-md-3 d-flex align-items-center justify-content-center">
  {/*<PdfROTHP datos={datos} />*/}
  <ExcelROTHP datos={datos} />
</div>
  

    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
    <strong >
    <div className="card shadow-sm bg-light" >
      <div className="datos card-body">
        <h5 className="card-title">Datos:</h5>
        <ul className="list-group list-group-horizontal" >
          <li className="list-group-item" >Código Inicio: {codigoInicio}</li>
          <li className="list-group-item" >Código Fin: {codigoFinal}</li>
          <li className="list-group-item" >Modelo: {modelo}</li>
          <li className="list-group-item" >Horneado: {hornedo}</li>
          <li className="list-group-item" >Turno: {turnoHorneado}</li>
          <li className="list-group-item" >Mermas Crudas: {MCrudas}</li>
          <li className="list-group-item" >Hornero: {hornero}</li>
          
        </ul>
      </div>
    </div>
  </strong>

    </div>    
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="table-responsive">
        <table className="table table-sm text-center">
       

  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Hora</th>
      <th scope="col">Cabeza IZ</th>
      <th scope="col">Centro IZ</th>
      <th scope="col">Pie IZ</th>
      <th scope="col">Cabeza DR</th>
      <th scope="col">Centro DR</th>
      <th scope="col">Pie DR</th>
   
      <th scope="col">Prom.</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(datos) && datos.map((fila, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{fila.hora_creacion}</td>
        <td>{fila.tempCabezaIZ}</td>
        <td>{fila.tempCentroIZ}</td>
        <td>{fila.tempPieIZ}</td>
        <td>{fila.tempCabezaDR}</td>
        <td>{fila.tempCentroDR}</td>
        <td>{fila.tempPieDR}</td>
        <td>{fila.promedio}</td>
       
      </tr>
    ))}
  </tbody>



        </table>
      </div>
    </div>
  </div>
</div>
);
};

export default ROTHP;
 