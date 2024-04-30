    import React, { useState, useEffect } from 'react';
    import axios from 'axios'
    import { formatFecha } from "../../utilidades/FormatearFecta";
    import PdfROTHP from './pdfECO/PdfROTHP'
    import ExcelROTHP from './Excel/ExcelRothp'

    const URL = process.env.REACT_APP_URL

    const ROTHP = () => {
      const [datos, setDatos] = useState([]);
      const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
      const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
      
      const limpiarInputs = () => {
        setFecha('');
        setFecha2('');

        
      };

      // Solicitud GET desde React
      useEffect(() => {
        // Realizar la solicitud axios incluso si no se selecciona una opción en uno de los campos
        const url = `${URL}/DTFM/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}`;

        
        axios.get(url)
          .then((response) => {
            setDatos(response.data);
            console.log('datos consulta', response.data);
          })
          .catch((error) => {
            console.error('Error al obtener los datos:', error);
          });
      }, [fecha_creacion_inicio, fecha_creacion_fin]);
console.log(datos)


      return ( 
      
        <div className="row mb-3">
         <p style={{textAlign: 'center'}}>Formulaciòn</p>

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
                
                <th scope="col">Peso</th>
                <th scope="col">Peso Total</th>
                
                <th scope="col">Humedad</th>
            
                <th scope="col">Aserradero</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(datos) && datos.map((fila, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{formatFecha(fila.fecha_creacion) }</td>
                  <td>{fila.hora_creacion}</td>
                  
                  <td>{fila.peso}/{fila.peso2}</td>
                  <td>{fila.pesototal}</td>
                  <td>{fila.humedad}%</td>
                  <td>{fila.aserradero}/{fila.aserradero2}</td>
                  <td>{fila.cantidad}</td>
                 
            
                </tr>
              ))}

<tr style={{color:'blue'}}>
          <td colSpan="7"><strong>Total:</strong></td>
         <td><strong>{datos.reduce((total, fila) => total + parseFloat(fila.cantidad), 0)}</strong></td>
 </tr>
            </tbody>
          </table>
        </div>
      );
    }

    export default ROTHP;