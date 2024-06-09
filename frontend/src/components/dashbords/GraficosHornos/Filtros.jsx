import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';  // Importa el archivo CSS
import { formatFecha } from "../../utilidades/FormatearFecta";

const URL = process.env.REACT_APP_URL;

const Filtros = ({ onChange }) => {
  const [turn, setTurn] = useState(1);
  const [turno, setTurno] = useState([]);
  const [HornoSelect, setTHornos] = useState([]);
  const [horno, setHornoSelect] = useState(2);
  const [error, setError] = useState('');
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));

  console.log('datos seleccionados', HornoSelect, turno);

  useEffect(() => {
    const maquinaria = "Horno";
    try {
      Promise.all([
        axios.get(`${URL}/maquinaria/${maquinaria}`),
        axios.get(`${URL}/Turnos`),
      ])
        .then(([HornosResponse, turnResponse]) => {
          setTHornos(HornosResponse.data);
          setTurno(turnResponse.data);
        })
        .catch((error) => {
          setError("Error al obtener los datos");
        });
    } catch (error) {
      setError("Error al obtener los datos");
    }
  }, []);

  const handleTurnChange = (e) => {
    const newTurn = e.target.value;
    setTurn(newTurn);
    onChange({ turn: newTurn, horno, fecha_creacion_inicio });
  };

  const handleHornoChange = (e) => {
    const newHorno = e.target.value;
    setHornoSelect(newHorno);
    onChange({ turn, horno: newHorno, fecha_creacion_inicio });
  };

  const handleFechaChange = (e) => {
    const newFecha = e.target.value;
    setFecha(newFecha);
    onChange({ turn, horno, fecha_creacion_inicio: newFecha });
  };

  return (
    <div className="filtros-container">
      <div className="filtro-item">
        <label htmlFor="fecha" className="form-label small-label">Fecha</label>
        <input className="form-control small-select" type="date" value={fecha_creacion_inicio} onChange={handleFechaChange} />
      </div>
      <div className="filtro-item">
        <label htmlFor="id_turno" className="form-label small-label">Turno de Horneado</label>
        <select className="form-select small-select" id="id_turno" value={turn} onChange={handleTurnChange}>
          <option value="" disabled>Seleccione...</option>
          {Array.isArray(turno.rows) && turno.rows.length > 0 && turno.rows.map((turno) => (
            <option key={turno.id} value={turno.id}>
              {turno.turno}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro-item">
        <label htmlFor="horno" className="form-label small-label">Horno</label>
        <select className="form-select small-select" id="horno" value={horno} onChange={handleHornoChange}>
          <option value="" disabled>Seleccione...</option>
          {Array.isArray(HornoSelect.rows) && HornoSelect.rows.length > 0 && HornoSelect.rows.map((horno) => (
            <option key={horno.id_maq} value={horno.id_maq}>
              {horno.nombre_maq}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filtros;
