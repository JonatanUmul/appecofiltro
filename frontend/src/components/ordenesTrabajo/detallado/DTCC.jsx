import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { formatFecha } from "../../utilidades/FormatearFecta";

const DTHP = ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
 
  const [operario, setOperario] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [turno, setTurno] = useState([]);
  const id_area = 4;

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/Operarios/${id_area}`),
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Turnos`),
    ])
      .then(([OperariosResponse, ufModeloResponse, turnoResponse]) => {
        setOperario(OperariosResponse.data);
        setModelo(ufModeloResponse.data);
        setTurno(turnoResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      await axios.post(`${URL}`, {
        id_OTHP: id.toString(),
        id_asrd: formData.id_asrd,
        id_matPrima: formData.id_matPrima,
        id_patio: formData.id_patio,
        esquinaSupIZ: formData.esquinaSupIZ,
        esquinaSupDA: formData.esquinaSupDA,
        esquinaCentro: formData.esquinaCentro,
        esquinaInfIZ: formData.esquinaInfIZ,
        esquinaInfDR: formData.esquinaInfDR
      });
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
     
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
console.log('datos props',encabezado, EncName, fecha_creacion,id)
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Toma de Humedad</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">{encabezado} - {EncName}</p>
          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">{formatFecha(fecha_creacion)}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
      <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Responsable de CC
          </label>
          <select className="form-select" id="id_matPrima" {...register("id_matPrima")}>
            <option></option>
            {Array.isArray(operario.rows)
            && operario.rows.length>0 && operario.rows.map((operario) => (
              <option key={operario.id} value={operario.id}>
                {operario.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Modelo
          </label>
          <select className="form-select" id="modelo" {...register("modelo")}>
            <option></option>
            {Array.isArray(modelo.rows)
            && modelo.rows.length>0 && modelo.rows.map((modelo) => (
              <option key={modelo.id_mod} value={modelo.id_mod}>
                {modelo.nombre_modelo}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Turno de CC
          </label>
          <select className="form-select" id="turnoCC" {...register("turnoCC")}>
            <option></option>
            {Array.isArray(turno.rows)
            && turno.rows.length>0 && turno.rows.map((turno) => (
              <option key={modelo.id} value={turno.id}>
                {turno.turno}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Fecha Horneado
          </label>
          <input type="date" className="form-control" id="fechaHorneado" {...register("fechaHorneado")} required />
        </div>

        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Turno de Horneado
          </label>
          <select className="form-select" id="turnoHorneado" {...register("turnoHorneado")}>
            <option></option>
            {Array.isArray(turno.rows)
            && turno.rows.length>0 && turno.rows.map((turno) => (
              <option key={modelo.id} value={turno.id}>
                {turno.turno}
              </option>
            ))}
          </select>
        </div>
        
       
     
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Aptobados
          </label>
          <input type="number" className="form-control" id="esquinaSupIZ" {...register("esquinaSupIZ")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Altos
          </label>
          <input type="number" className="form-control" id="esquinaSupDA" {...register("esquinaSupDA")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="centro" className="form-label">
            Bajos
          </label>
          <input type="number" className="form-control" id="esquinaCentro" {...register("esquinaCentro")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaII" className="form-label">
            Esquina Inferior Izquierda
          </label>
          <input type="number" className="form-control" id="esquinaInfIZ" {...register("esquinaInfIZ")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
            Esquina Inferior Derecha
          </label>
          <input type="number" className="form-control" id="esquinaInfDR" {...register("esquinaInfDR")} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DTHP;
