import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert

const DCPB= ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [ pulidor, setPulidor] = useState([]);
  const [maq, setTMaquinaria] = useState([]);
  const [calificacion, setCalificaciones] = useState([]);
  const [modeloUF, setModeloUf] = useState([]);
  const [modulos, setModulos]= useState([])

  const id_area=7;
  const maquinaria = 'Prensa';
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/Operarios/${id_area}`),
      axios.get(`http://localhost:3001/maquinaria/${maquinaria}`),
      axios.get(`http://localhost:3001/calificacion`),
      axios.get(`http://localhost:3001/ModelosUF`),
      axios.get('http://localhost:3001/modulosTarimas')
    ])
      .then(([PulidorResponse, MoldeResponse, CalificacionesResponse, ModelosResponse, ModulosResponse]) => {
        setPulidor(PulidorResponse.data);
        setTMaquinaria(MoldeResponse.data);
        setCalificaciones(CalificacionesResponse.data);
        setModeloUf(ModelosResponse.data);
        setModulos(ModulosResponse.data)
      }
    
      )
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);
  console.log(maq)
  const onSubmit = async (formData) => {
    console.log('Datod enviaados',formData)
    try {
      const response = await axios.post('http://localhost:3001/DCPB', {
        id_CPB: id.toString(),
        id_modelo: formData.id_modelo ,
        id_pulidor: formData.id_pulidor,  
        id_prensa: formData.id_prensa,
        id_modulo: formData.id_modulo,
        pulido: formData.pulido,
        id_calificacion: formData.id_calificacion,
        fechaProduccion:formatFecha( formData.fechaProduccion)
        
        
      
      }); // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaCP";
      }, 1500);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
console.log('modulos',modulos)


  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Pulida Superior</h4>
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
            Modelo
          </label>
          <select className="form-select" id="id_modelo" {...register("id_modelo")}>
            {Array.isArray(modeloUF.rows)
            && modeloUF.rows.length>0 && modeloUF.rows.map((modelo) => (
              <option key={modelo.id_mod} value={modelo.id_mod}>
                {modelo.nombre_modelo}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Pulidor
          </label>
          <select className="form-select" id="id_pulidor" {...register("id_pulidor")}>
            {Array.isArray(pulidor.rows)
            && pulidor.rows.length>0 && pulidor.rows.map((pulidor) => (
              <option key={pulidor.id} value={pulidor.id}>
                {pulidor.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Molde
          </label>
          <select className="form-select" id="id_prensa" {...register("id_prensa")}>
            {Array.isArray(maq.rows)
            && maq.rows.length>0 && maq.rows.map((molde) => (
              <option key={molde.id_maq} value={molde.id_maq}>
                {molde.nombre_maq}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Modulo
          </label>
          <select className="form-select" id="id_modulo" {...register("id_modulo")}>
            {Array.isArray(modulos.rows)
            && modulos.rows.length>0 && modulos.rows.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.modulo}
              </option>
            ))}
          </select>
        </div>
      <div className="col-md-6">
        <label htmlFor="Codigo">Pulido</label>
        <input className="form-control" type="number" id='pulido' {...register('pulido')}/>  
      </div>

      <div className="col-md-6">
        <label htmlFor="Codigo">Fecha de Producción</label>
        <input className="form-control" type="date" id='fechaProduccion  ' {...register('fechaProduccion')}/>  
      </div>  

        <div className="form-check form-check-inline mt-5">

<h5>Calificación:</h5>
    {/* Itera sobre el array de calificaciones y muestra las opciones de radio */}
    {Array.isArray(calificacion.rows)&& calificacion.rows.length>0 && calificacion.rows.map((calificacion) => (
      <div key={calificacion.id} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name='calificacion'
          id={`checkbox-calificacion-${calificacion.id}`}
          value={calificacion.id}
          {...register("id_calificacion")}
        />
        <label className="form-check-label" htmlFor={`calificacion-${calificacion.id}`}>
          {calificacion.calificacion}
        </label>
      </div>
    ))}
  </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
);
};

export default DCPB;
