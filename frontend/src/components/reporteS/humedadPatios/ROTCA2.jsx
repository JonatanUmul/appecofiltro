    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTHP from './pdfECO/PdfROTHP'
    import ExcelROTHP from './Excel/ExcelRothp'



    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [aserradero, setAserradero] = useState([]);
      const [materiaPrim, setMatPrim] = useState([]);
      const [fecha_creacion, setFecha] = useState('');
      const [id_aserradero, setIdAserradero] = useState('');
  

      const limpiarInputs = () => {
        setFecha('');
        setIdAserradero('');
    
      };
      
      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `http://localhost:3001/DTCA2/${fecha_creacion || 'null'}/${id_aserradero || 'null'}`;

        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion, id_aserradero]);

      // Realizar las solicitudes para obtener datos
      useEffect(() => {
        axios.all([
          axios.get('http://localhost:3001/Aserradero'),
          axios.get('http://localhost:3001/MateriaPrima'),
       
        ])
        .then(axios.spread((aserraderoResponse, materiaPrimResponse, ) => {
          setAserradero(aserraderoResponse.data);
          setMatPrim(materiaPrimResponse.data);
        
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
        <select className="form-select" name="id_aserradero" value={id_aserradero} onChange={(e) => setIdAserradero(e.target.value)}>
          <option value="">Seleccione un aserradero</option>
          {Array.isArray(aserradero.rows) && aserradero.rows.map((item) => (
            <option key={item.id} value={item.id}>{item.nombre_aserradero}</option>
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
                <th scope="col">Aserradero</th>
                
                <th scope="col">Cantidad Inicial</th>
                <th scope="col">Cernido Fino</th>
                <th scope="col">Cernido Grueso</th>
                <th scope="col">Merma</th>

              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.hora_creacion}</td>
                  <td>{fila.aserradero}</td>
                  
                  <td>{fila.cantidad_inicial}</td>
                  <td>{fila.cernido_fino}</td>
                  <td>{fila.cernido_grueso}</td>
                  <td>{fila.merma}</td>
            
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;
