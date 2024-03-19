    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTHP from './pdfECO/PdfROTHP'
    import ExcelROTHP from './Excel/ExcelRothp'



    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [aserradero, setAserradero] = useState([]);
      const [materiaPrim, setMatPrim] = useState([]);
      const [patios, setPatios] = useState([]);
      const [fecha_creacion, setFecha] = useState('');
      const [id_asrdSMP, setIdAserradero] = useState('');
      const [id_patio, setIdPatio] = useState('');

      const limpiarInputs = () => {
        setFecha('');
        setIdAserradero('');
        setIdPatio(''); 
      };

      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `http://localhost:3001/DASERRIN/${fecha_creacion || 'null'}/${id_asrdSMP || 'null'}/${id_patio || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion, id_asrdSMP, id_patio]);

      // Realizar las solicitudes para obtener datos
      useEffect(() => {
        axios.all([
          axios.get('http://localhost:3001/Aserradero'),
          axios.get('http://localhost:3001/MateriaPrima'),
          axios.get('http://localhost:3001/Patios')
        ])
        .then(axios.spread((aserraderoResponse, materiaPrimResponse, patiosResponse) => {
          setAserradero(aserraderoResponse.data);
          setMatPrim(materiaPrimResponse.data);
          setPatios(patiosResponse.data);
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, []);

      return (
        <div className="row mb-3">
        <div className="row mb-3">
      <div className="col-md-3">
        <label htmlFor="fecha" className="form-label">Fecha:</label>
        <input className="form-control" type="date" value={fecha_creacion} onChange={(e) => setFecha(e.target.value)} />
      </div>
      <div className="col-md-3">
        <label htmlFor="aserradero" className="form-label">Aserradero:</label>
        <select className="form-select" name="id_aserradero" value={id_asrdSMP} onChange={(e) => setIdAserradero(e.target.value)}>
          <option value="">Seleccione un aserradero</option>
          {Array.isArray(aserradero.rows) && aserradero.rows.map((item) => (
            <option key={item.id} value={item.id}>{item.nombre_aserradero}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="patio" className="form-label">Patio:</label>
        <select className="form-select" name="id_patio" value={id_patio} onChange={(e) => setIdPatio(e.target.value)}>
          <option value="">Seleccione un patio</option>
          {Array.isArray(patios.rows) && patios.rows.map((item) => (
            <option key={item.id} value={item.id}>{item.nombrePatio}</option>
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
                <th scope="col">Patio</th>
                <th scope="col">Aserradero</th>
                
                <th scope="col">Cantidad Inicial</th>
                <th scope="col">Cantidad Final</th>
                <th scope="col">Merma</th>

              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.hora_creacion}</td>
                  <td>{fila.patio}</td>
                  <td>{fila.aserradero}</td>
                  
                  <td>{fila.cantidad_inicial}</td>
                  <td>{fila.cantidad_final}</td>
                  <td>{fila.merma}</td>
            
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
