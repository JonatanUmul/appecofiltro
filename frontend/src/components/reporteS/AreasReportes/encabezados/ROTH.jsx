import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta.js";
import PdfROTHP from '../pdfECO/PdfROTHH.jsx';
import ExcelROTHP from '../Excel/ExcelRothp.jsx';
import Detalle from '../detalles/Detalle_ROTT.jsx';
const URL = process.env.REACT_APP_URL;

const ROTH = () => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
const [ufmodelo, setUfmodelo]= useState([]);
const [modeloUF, setModeloUF]=useState('')
const [turno, setTurno] = useState([]);
const [turn, setTurn]=useState('')
const[horno, setHorno]=useState('')
  useEffect(() => {
    axios.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Turnos`),
      // axios.get(`${URL}/GrupodeTrabajo`)
    ])
    .then(axios.spread((ModelosufResponse, TurnosResponse) => {
      setUfmodelo(ModelosufResponse.data)
      setTurno(TurnosResponse.data);
    }))
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, []);

  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${modeloUF || 'null'}/${turn || 'null'}/${horno||'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data);

      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [fecha_creacion_inicio, fecha_creacion_fin]);

  return (
    <div className="row mb-3">
      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">Fecha 1</label>
          <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">Fecha 2</label>
          <input className="form-control" type="date" value={fecha_creacion_fin} onChange={(e) => setFecha2(e.target.value)} />
        </div>
       

        <div className="col-md-3">
      <label htmlFor="modelo"  className="form-label">Modelo:</label>
      <select className="form-select" name="ufmodelo" value={modeloUF}  onChange={(e) => setModeloUF(e.target.value)}>
      <option value="" disabled selected>Seleccione...</option>
        {Array.isArray(ufmodelo.rows) && ufmodelo.rows.map((item) => (
          <option key={item.id_mod} value={item.id_mod}>{item.nombre_modelo}</option>
        ))}
      </select>
    </div>
    
    <div className="col-md-6">
    <label htmlFor="aserradero" className="form-label">
        Turno de Producción
    </label>
    <select className="form-select" id="id_turno" value={turn} onChange={(e)=>setTurn(e.target.value)}>
    <option>--</option>
    {Array.isArray(turno.rows)
      && turno.rows.length>0 && turno.rows.map((turno) => (
        <option key={turno.id} value={turno.id}>
          {turno.turno}
        </option>
      ))}
    </select>
  </div>
    <div className="col-md-3 d-flex align-items-end">
    <PdfROTHP datos={datos} />
    <ExcelROTHP datos={datos} />
  </div>
      </div>



      <table className="table text-center" style={{ lineHeight: '1.5' }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Turno</th>
            <th scope="col">Estado</th>
           
          </tr>
        </thead>
        <tbody>
          {Array.isArray(datos) && datos.map((fila, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <th>
                <Detalle
                  nombretabla={fila.tabla}
                  id={fila.id}
                />
              </th>
              <td>{formatFecha(fila.fecha_creacion)}</td>
              <td>{fila.turnos}</td>
              <td>{fila.estadoOrden}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ROTH;
