    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTHP from './pdfECO/PdfROTHP'
    import ExcelROTHP from './Excel/ExcelRotP'
    const URL = process.env.REACT_APP_URL


    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      // const [fecha_creacion_inicio, setFecha] = useState('2024/04/01');
      // const [fecha_creacion_fin, setFecha2] = useState('2024/04/29');
      const [modeloUF, setModelos] = useState([]);
      const [id_ufmodelo, setmodelosUF] = useState('');
      const [grupoProduccion, setGrupodetrabajo] = useState([]);
      const [id_grupoproduccion, setGrupoP]=useState('')
      const [turno, setTurno] = useState([]);
      const [turn, setTurn]=useState('')
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      useEffect(() => {
        axios.all([
          axios.get(`${URL}/ModelosUF`),
          axios.get(`${URL}/GrupodeTrabajo`),
          axios.get(`${URL}/Turnos`),
        ])
        .then(axios.spread((ModelosufResponse, GrupodeTrabajoResponse, TurnosResponse) => {
          setModelos(ModelosufResponse.data)
          setGrupodetrabajo(GrupodeTrabajoResponse.data)
          setTurno(TurnosResponse.data);
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);


      const limpiarInputs = () => {
       
        setmodelosUF('');
        setGrupoP('');
        setFecha(formatFecha(new Date()))
        setFecha2(formatFecha(new Date()))
      };
   
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos

       const url=`${URL}/DTP/${fecha_creacion_inicio|| 'null'}/${fecha_creacion_fin|| 'null'}/${id_ufmodelo || 'null'}/${id_grupoproduccion||'null'}`;


        axios.get(url).then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [ id_ufmodelo, id_grupoproduccion, fecha_creacion_inicio,fecha_creacion_fin]);

  
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
      <div className="col-md-6">
      <label htmlFor="aserradero" className="form-label">
          Turno de Producción
      </label>
      <select className="form-select" id="id_turno" value={turn} onChange={(e) => setTurn(e.target.value)}>
      <option>--</option>
      {Array.isArray(turno.rows)
        && turno.rows.length>0 && turno.rows.map((turno) => (
          <option key={turno.id} value={turno.id}>
            {turno.turno}
          </option>
        ))}
      </select>
    </div>
      <div className="col-md-3">
      <label htmlFor="modelo"  className="form-label">Modelo:</label>
      <select className="form-select" name="UFmodelo" value={id_ufmodelo}  onChange={(e) => setmodelosUF(e.target.value)}>
      <option value="" disabled selected>Seleccione...</option>
        {Array.isArray(modeloUF.rows) && modeloUF.rows.map((item) => (
          <option key={item.id_mod} value={item.id_mod}>{item.nombre_modelo}</option>
        ))}
      </select>
    </div>
    <div className="col-md-3">
    <label htmlFor="gurpoProduccion" className="form-label">Grupo de Producciòn:</label>
    <select className="form-select" name="grupoP" value={id_grupoproduccion}  onChange={(e) => setGrupoP(e.target.value)}>
    <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(grupoProduccion.rows) && grupoProduccion.rows.map((item) => (
        <option key={item.id} value={item.id}>{item.grupos}</option>
      ))}
    </select>
  </div>
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>

      
    

      <div className="col-md-3 d-flex align-items-end">
     
      <ExcelROTHP datos={datos}/>
      <PdfROTHP datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Turno</th>
                <th scope="col">Modelo</th>
                <th scope="col">Producido</th>
                <th scope="col">Grupo Prod.</th>
                <th scope="col">C.Inicio</th>
                <th scope="col">C.Fin</th>
                <th scope="col">Formula</th>      
                <th scope="col">Aserradero</th>     

              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_real) }</td>
                  <td>{fila.nombre_turno}</td>
                  <td>{fila.nombre_ufmodelo}</td>
                  <td>{fila.producido}</td>
                  <td>{fila.grupoProd}</td>
                  <td>{fila.codigoInicio}</td>
                  <td>{fila.codigoFinal}</td>
                  <td>{fila.pesototal}</td>
                  <td>{fila.aserradero1}/{fila.aserradero2}</td>
                 
                  
                  
               
                </tr>
              ))}
              <tr>
              <td colSpan="4"><strong>Total:</strong></td>
              <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.producido), 0)}</strong></td>
    
     </tr>
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
