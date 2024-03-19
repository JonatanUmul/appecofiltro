import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";

const ConsultaCKTA = ({ id }) => {
  const [error, setError] = useState('');
  const [fila, setFila] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/DCKEXT/${id}`)
      .then((response) => {
        setFila(response.data.data);
      })
      .catch((error) => {
        setError("Error al obtener los datos: " + error.message);
      });
  }, [id]); 
  

  return (
    <div className=" mt-4">
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {fila.map((registro, index) => (
        <div key={index} className="card mb-3">
          <div className="card-header bg-primary text-white">
            <h5 className="card-title">Registro #{index + 1}</h5>
          </div>
          <div className="card-body">
            <p className="card-text small text-muted">
              <strong>Fecha de Reporte:</strong> {formatFecha(registro.fecha_creacion)} - {registro.hora_creacion}
            </p>
            <p className="card-text small text-muted">
              <strong>1. Limpieza de bazuca de Salida:</strong> {registro.limpiezaBazucaDeSalida}
            </p>
            <p className="card-text small text-muted">
              <strong>2. Lubricar Chumaceras al Finalizar el Turno:</strong> {registro.ilubricarChumacerasAlFinalTurno}
            </p>
            <p className="card-text small text-muted">
              <strong>3. Comprobar Accionamiento Correcto de Motor:</strong> {registro.AccionamientoCorrectoMotor}
            </p>
            <p className="card-text small text-muted">
              <strong>4. Verificar Tornillos de Todas las Guardas de Seguridad:</strong> {registro.VerificarTornillosGuardasDeSeguridad}
            </p>
            <p className="card-text small text-muted">
              <strong>5. Limpieza Interna y externa del Equipo:</strong> {registro.limpiezaInternaExternaEquipo}
            </p>
            {registro.observacion1.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 1:</strong> {registro.observacion1}
              </p>
            )}
            {registro.observacion2.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 2:</strong> {registro.observacion2}
              </p>
            )}
            {registro.observacion3.trim() !== "" && (
              <p className="card-text small text-muted">
                <strong>Observación 3:</strong> {registro.observacion3}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConsultaCKTA;