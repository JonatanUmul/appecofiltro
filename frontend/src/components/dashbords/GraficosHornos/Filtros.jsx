import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { formatFecha } from "../../utilidades/FormatearFecta";

const URL = process.env.REACT_APP_URL;

const Filtros = ({ onChange }) => {
  const [turn, setTurn] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [hornos, setHornos] = useState([]);
  const [horno, setHorno] = useState(1);
  const [fecha_creacion_inicio, setFecha] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFecha2] = useState(formatFecha(new Date()));
  const [id_ufmodelo, setmodelosUF] = useState(1);
  const [modeloUF, setModelos] = useState([]);

  
  useEffect(() => {
    const maquinaria = "Horno";
    Promise.all([
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/Turnos`),
      axios.get(`${URL}/ModelosUF`),
    ])
    .then(([hornosResponse, turnosResponse, ModelosufResponse]) => {
      setHornos(hornosResponse.data.rows);
      setTurnos(turnosResponse.data.rows);
      setModelos(ModelosufResponse.data)
    })
    .catch((error) => {
      console.error("Error al obtener los datos", error);
    });
  }, []);

  const handleTurnChange = (e) => {
    const newTurn = e.target.value;
    setTurn(newTurn);
    onChange({ turn: newTurn, horno, fecha_creacion_inicio, fecha_creacion_fin,id_ufmodelo });
  };

  const handleHornoChange = (e) => {
    const newHorno = e.target.value;
    setHorno(newHorno);
    onChange({ turn, horno: newHorno, fecha_creacion_inicio, fecha_creacion_fin,id_ufmodelo });
  };

  const handleFechaChange = (e) => {
    const newFecha = e.target.value;
    setFecha(newFecha);
    onChange({ turn, horno, fecha_creacion_inicio: newFecha, fecha_creacion_fin,id_ufmodelo });
  };

  const handleFechaFinChange = (e) => {
    const newFecha2 = e.target.value;
    setFecha2(newFecha2);
    onChange({ turn, horno, fecha_creacion_inicio, fecha_creacion_fin: newFecha2 ,id_ufmodelo});
  };
  const handleUfmodeloChange = (e) => {
    const newUfmodelo = e.target.value;
    setmodelosUF (newUfmodelo);
    onChange({ turn, horno, fecha_creacion_inicio, fecha_creacion_fin,id_ufmodelo: newUfmodelo});
  };

  return (
    <div className="filtros-container">
      <div className="filtro-item">
        <label htmlFor="fecha" className="form-label small-label">Fecha 1</label>
        <input
          className="form-control small-select"
          type="date"
          value={fecha_creacion_inicio}
          onChange={handleFechaChange}
        />
      </div>
      <div className="filtro-item">
        <label htmlFor="fecha" className="form-label small-label">Fecha 2</label>
        <input
          className="form-control small-select"
          type="date"
          value={fecha_creacion_fin}
          onChange={handleFechaFinChange}
        />
      </div>
      <div className="filtro-item">
        <label htmlFor="id_turno" className="form-label small-label">Turno de Horneado</label>
        <select
          className="form-select small-select"
          id="id_turno"
          value={turn}
          onChange={handleTurnChange}
        >
          <option value="" disabled>Seleccione...</option>
          {Array.isArray(turnos) && turnos.length > 0 && turnos.map((turno) => (
            <option key={turno.id} value={turno.id}>
              {turno.turno}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro-item">
        <label htmlFor="horno" className="form-label small-label">Horno</label>
        <select
          className="form-select small-select"
          id="horno"
          value={horno}
          onChange={handleHornoChange}
        >
          <option value="" disabled>Seleccione...</option>
          {Array.isArray(hornos) && hornos.length > 0 && hornos.map((horno) => (
            <option key={horno.id_maq} value={horno.id_maq}>
              {horno.nombre_maq}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro-item">
      <label htmlFor="modelo"  className="form-label small-label">Modelo:</label>
      <select className="form-select small-select" name="UFmodelo" value={id_ufmodelo} onChange={handleUfmodeloChange}>
      <option value="" disabled selected>Seleccione...</option>
        {Array.isArray(modeloUF.rows) && modeloUF.rows.map((item) => (
          <option key={item.id_mod} value={item.id_mod}>{item.nombre_modelo}</option>
        ))}
      </select>
    </div>
    </div>
  );
};

export default Filtros;