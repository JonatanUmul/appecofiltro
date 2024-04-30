    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTHP from './pdfECO/PdfROTHP'
    import ExcelROTHP from './Excel/ExcelRothp'
    const URL = process.env.REACT_APP_URL


    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      // const [fecha_creacion_inicio, setFecha] = useState('2024/04/01');
      // const [fecha_creacion_fin, setFecha2] = useState('2024/04/29');
      const [modeloUF, setModelos] = useState([]);
      const [id_ufmodelo, setmodelosUF] = useState('');
      const [grupoProduccion, setGrupodetrabajo] = useState([]);
      const [id_grupoproduccion, setGrupoP]=useState('')

      useEffect(() => {
        axios.all([
          axios.get(`${URL}/ModelosUF`),
          axios.get(`${URL}/GrupodeTrabajo`)
        ])
        .then(axios.spread((ModelosufResponse, GrupodeTrabajoResponse) => {
          setModelos(ModelosufResponse.data)
          setGrupodetrabajo(GrupodeTrabajoResponse.data)
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);


      const limpiarInputs = () => {
       
        setmodelosUF('');
        setGrupoP('')
      };
   
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos

       const url=`${URL}/DTP/${id_ufmodelo }/${id_grupoproduccion }`;

        axios.get(url).then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [ id_ufmodelo, id_grupoproduccion]);

  
      return (
        <div className="row mb-3">
        <div className="row mb-3">
      // 
      <div className="col-md-3">
      <label htmlFor="modelo"  className="form-label">Modelo:</label>
      <select className="form-select" name="UFmodelo" value={id_ufmodelo}  onChange={(e) => setmodelosUF(e.target.value)}>
        <option value="">--</option>
        {Array.isArray(modeloUF.rows) && modeloUF.rows.map((item) => (
          <option key={item.id_mod} value={item.id_mod}>{item.nombre_modelo}</option>
        ))}
      </select>
    </div>
    <div className="col-md-3">
    <label htmlFor="gurpoProduccion" className="form-label">Grupo de Producciòn:</label>
    <select className="form-select" name="grupoP" value={id_grupoproduccion}  onChange={(e) => setGrupoP(e.target.value)}>
      <option value="">--</option>
      {Array.isArray(grupoProduccion.rows) && grupoProduccion.rows.map((item) => (
        <option key={item.id} value={item.id}>{item.grupos}</option>
      ))}
    </select>
  </div>
      <div className="col-md-3 d-flex align-items-end">
        <button className="btn btn-primary ms-2" onClick={limpiarInputs}>Limpiar</button>
      </div>
      <div className="col-md-3 d-flex align-items-end">
      <PdfROTHP datos={datos}/>
      <ExcelROTHP datos={datos}/>
      </div>


    </div>

          <table className="table text-center">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Humedad</th>
           

              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.hora_creacion}</td>
                  <td>{fila.cantidad}</td>
                  
                  <td>{fila.humedad}</td>
               
                </tr>
              ))}
          
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
