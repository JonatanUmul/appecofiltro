import React, { useState, useEffect } from 'react';
import { formatFecha } from "../utilidades/FormatearFecta.js";
import axios from 'axios'
const URL = process.env.REACT_APP_URL
const ReporteGeneralDiario = () => {
    const [secadoAserrin, setSecadoAserrin]=useState([])

    const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));

console.log(fecha_creacion_inicio)

    useEffect(() => {
        axios.all([
          axios.get(`${URL}/DASERRIN/${fecha_creacion_inicio}`),
       
         
        ])
        .then(axios.spread((secadoaserrinReponse) => {
            setSecadoAserrin(secadoaserrinReponse.data);
        }))
        .catch((error) => {
          console.error('Error al obtener los datos:', error);
        });
      }, [fecha_creacion_inicio]);
    console.log(secadoAserrin)
  return (
    <div className="">
    <div className="col-md-3 mb-5">
    
    <input className="form-control" type="date" value={fecha_creacion_inicio} onChange={(e) => setFecha(e.target.value)} />
  </div>
      <div className="row">
        <div className="col">
          <h4>Materia Prima</h4>
          <table className="table">
            <tbody>
            {Array.isArray(secadoAserrin.rows) && secadoAserrin.rows.length > 0 && secadoAserrin.rows.map(secado => (
                <tr key={secado.id}>
                  <td>Seca|do</td>
                 <td>{secado.cantidad_final}</td>
                </tr>
              ))}
              
         
             
            </tbody>
          </table>
        </div>

        <div className="col">
          <h4>Producción</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Produccion 20LTS:</td>
                <td></td>
              </tr>
              <tr>
                <td>Produccion Mini:</td>
                <td></td>
              </tr>
              {/* Agrega más filas según sea necesario */}
            </tbody>
          </table>
        </div>

        <div className="col">
          <h4>Formulación</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Peso:</td>
                <td></td>
              </tr>
              <tr>
                <td>Detalle Cernido:</td>
                <td></td>
              </tr>
              {/* Agrega más filas según sea necesario */}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h4>Horneados</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Codigo Inicio</td>
                <td></td>
              </tr>
              <tr>
                <td>Codigo Fin</td>
                <td></td>
              </tr>
              {/* Agrega más filas según sea necesario */}
            </tbody>
          </table>
        </div>

        <div className="col">
          <h4>Control de Calidad</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Codigo Inicio</td>
                <td></td>
              </tr>
              <tr>
                <td>Codigo Fin</td>
                <td></td>
              </tr>
              {/* Agrega más filas según sea necesario */}
            </tbody>
          </table>
        </div>

        <div className="col">
          <h4>Impregnación</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Codigo Inicio</td>
                <td></td>
              </tr>
              <tr>
                <td>Codigo Fin</td>
                <td></td>
              </tr>
              {/* Agrega más filas según sea necesario */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReporteGeneralDiario;
