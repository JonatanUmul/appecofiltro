import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { formatFecha } from '../utilidades/FormatearFecta.js';

const URL = process.env.REACT_APP_URL;

const HornosChart = () => {
  const [datos, setDatos] = useState([]);
  const [fecha_creacion_inicio, setFechaCreacionInicio] = useState(formatFecha(new Date()));
  const [fecha_creacion_fin, setFechaCreacionFin] = useState(formatFecha(new Date()));
  const [modeloUF, setModeloUF] = useState(1);
  const [turn, setTurn] = useState(1);
  const [HornoSelect, setTHornos]=useState([])
  const[horno, setHornoSelect]=useState('')
  const [error, setError]= useState('');
  console.log(horno)

  useEffect(() => {
    const url = `${URL}/DTH/${fecha_creacion_inicio || 'null'}/${fecha_creacion_fin || 'null'}/${modeloUF || 'null'}/${turn || 'null'}/${horno || 'null'}`;

    axios.get(url)
      .then((response) => {
        // Ordenar los datos por hora
        const datosOrdenados = response.data.data.sort((a, b) => new Date(a.tiempo_transcurrido) - new Date(b.tiempo_transcurrido));
        setDatos(datosOrdenados);
        console.log('datos consulta', datosOrdenados);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [modeloUF, turn, fecha_creacion_inicio, fecha_creacion_fin,horno]);

  useEffect(() => {
    const maquinaria="Horno"; 
    try {
      Promise.all([
        axios.get(`${URL}/maquinaria/${maquinaria}`),
   
      ])
        .then(([ HornosResponse]) => {
         
          setTHornos(HornosResponse.data);
        
        })
        .catch((error) => {
          setError("Error al obtener los datos", error);
        });
    } catch(error) {
      setError("Error al obtener los datos", error);
    }
  }, []);
  // Organizar los datos por horno
  const datosPorHorno = {};
  datos.forEach((dato) => {
    if (!datosPorHorno[dato.horno]) {
      datosPorHorno[dato.horno] = [];
    }
    datosPorHorno[dato.horno].push(dato);
  });

  // Preparar los datos para las líneas
  const lineas = Object.keys(datosPorHorno).map((horno) => {
    return (
      <Line
        key={horno}
        type="monotone"
        dataKey="promedio"
        data={datosPorHorno[horno]}
        name={`Horno ${horno}`}
        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
      />
    );
  });

  return (
    
    <ResponsiveContainer width="100%" height={400}>
    <div className="col-md-6">
    <label htmlFor="aserradero" className="form-label">
      Horno
    </label>
    <select className="form-select" value={horno} onChange={(e) => setHornoSelect(e.target.value)}>
      <option value="" disabled selected>Seleccione...</option>
      {Array.isArray(HornoSelect.rows) && HornoSelect.rows.length > 0 && HornoSelect.rows.map((horno) => (
        <option key={horno.id_maq} value={horno.id_maq}>
          {horno.nombre_maq}
        </option>
      ))}
    </select>
  </div>

      <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hora_creacion" />

        <YAxis dataKey="promedio" />
        <Tooltip />
        <Legend />
        {lineas}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HornosChart;
