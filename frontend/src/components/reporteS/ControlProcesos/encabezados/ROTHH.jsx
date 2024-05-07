import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatFecha } from "../../../utilidades/FormatearFecta.js";
import PdfROTHP from '../pdfECO/PdfROTHP.jsx';
import ExcelROTHP from '../Excel/ExcelRothp.jsx';
import Detalle from '../detalles/Detalle_ROTT.jsx';
const URL = process.env.REACT_APP_URL;

const ROTHP = () => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
const [modeloUF, setModeloUF]=useState('')
const [turn, setMturn]=useState('')
const [horno, sethorno]=useState('')
  useEffect(() => {
    // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
    const url = `${URL}/DTHH/${fecha_creacion_inicio ? fecha_creacion_inicio : 'null'}/${fecha_creacion_fin ? fecha_creacion_fin : 'null'}/${modeloUF ? modeloUF : 'null'}/${turn ? turn : 'null'}/${horno ? horno : 'null'}`;

    axios.get(url)
      .then((response) => {
        setDatos(response.data.data);

      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [fecha_creacion_inicio, fecha_creacion_fin, modeloUF, turn,horno]);
console.log('datos', datos)
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
    <div className="col-md-3 d-flex align-items-end">
      <PdfROTHP datos={datos} />
      <ExcelROTHP datos={datos} />
    </div>
  </div>

  <div className="table-responsive">
    <table className="table text-center" style={{ lineHeight: '1.5' }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col"></th>
          <th scope="col">Fecha Horneado</th>
          <th scope="col">Turno</th>
          <th scope="col">C.Inicio</th>
          <th scope="col">C.Fin</th>
          <th scope="col">Horneado</th>
          <th scope="col">Mermas C.</th>
          <th scope="col">Barro</th>
          <th scope="col">Aserrín</th>
          <th scope="col">Aserradero</th>
          <th scope="col">T. Cernido</th>
          <th scope="col">Modelo</th>
          <th scope="col">Horno</th>
          <th scope="col">Hornero</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(datos) && datos.map((fila, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <th>
              <Detalle
                nombretabla={fila.tabla}
                fechaHorneado={fila.fecha_creacion}
                turnoHorneado= {fila.turno}
                id_turno={fila.id_turno}
                turnoHorn={fila.id_turno}
                codigoInicio={fila.codigoInicio}
                codigoFinal= {fila.CodigoFin}
                hornedo={fila.horneado}
                MCrudas={fila.mermasCrudas}
                LBarro={fila.librasBarro}
                LBaserrin={fila.librasAserrin}
                aserradero={fila.aserradero}
                tipCernido={fila.tipocernido}
                modelo={fila.ufmodelo}
                id_modelo={fila.id_modelo}
                hornn={fila.enc_maq}
                id_horno={fila.id_horno}
                hornero={fila.operarios}
               
              />
            </th>
            <td>{formatFecha(fila.fecha_creacion)}</td>
            <td>{fila.turno}</td>
            <td>{fila.codigoInicio}</td>
            <td>{fila.CodigoFin}</td>
            <td>{fila.horneado}</td>
            <td>{fila.mermasCrudas}</td>
            <td>{fila.librasBarro}</td>
            <td>{fila.librasAserrin}</td>
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
</div>

  );
}

export default ROTHP;
