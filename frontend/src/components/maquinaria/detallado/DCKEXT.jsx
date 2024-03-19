import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estilosFormatos.css'
import Swal from 'sweetalert2'; // Importar SweetAlert

const DCKBT= ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [errors, setError]= useState('')



  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/respuestas"),

    ])
      .then(([RespuestasResponse]) => {
        setRespuestas(RespuestasResponse.data)
      
      }
      
      )
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/DCKEXT', {
        id_CKEXT: id.toString(),
        id_limpiezaBazucaDeSalida: formData.id_limpiezaBazucaDeSalida,
        id_lubricarChumacerasAlFinalTurno: formData.id_lubricarChumacerasAlFinalTurno,
        id_AccionamientoCorrectoMotor: formData.id_AccionamientoCorrectoMotor,
        id_verificarTornillosGuardasDeSeguridad: formData.id_verificarTornillosGuardasDeSeguridad,
        id_limpiezaInternaExternaEquipo: formData.id_limpiezaInternaExternaEquipo,
   
        observacion1: formData.observacion1,
        observacion2: formData.observacion2,
        observacion3: formData.observacion3,
        observacion4: formData.observacion4,
        observacion5: formData.observacion5,
    
        
      }); Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaMaq";
      }, 1500);
    } catch (error) {
      setError('Uno o varios datos estan vacios')

      console.error("Error al enviar los datos:", error);
    }
  };


 
  return (
    <div className="mt-1">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>{encabezado}.{EncName}</h4>
     
      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
  <div className="card-body">
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
      <label htmlFor="materiaPrima" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
        Orden:
      </label>
      <p id="materiaPrima" className="form-control-static" style={{ marginBottom: "0" }}>{encabezado} - {EncName}</p>
    </div>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <label htmlFor="fecha" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
        Fecha de Creación:
      </label>
      <p id="fecha" className="form-control-static" style={{ marginBottom: "0" }}>{formatFecha(fecha_creacion)}</p>
    </div>

</div>

</div>

<form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">1. Limpieza de bazuca de Salida :</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input
          className="form-check-input"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_limpiezaBazucaDeSalida${respuesta.id}`}
          value={respuesta.id}
          {...register("id_limpiezaBazucaDeSalida")}
        />
        <label className="form-check-label" htmlFor={`id_limpiezaBazucaDeSalida${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="Observación" {...register("observacion1")}  />

</div>


  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">2. Lubricar Chumaceras al Finalizar el Turno:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="calificacionTornillos"
            id={`id_lubricarChumacerasAlFinalTurno-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_lubricarChumacerasAlFinalTurno")}
          />  
          <label className="form-check-label" htmlFor={`id_lubricarChumacerasAlFinalTurno-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion2")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">3. Comprobar Accionamiento Correcto de Motor:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="id_AccionamientoCorrectoMotor"
            id={`id_AccionamientoCorrectoMotor-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_AccionamientoCorrectoMotor")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion3")}  />
  </div>


  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">4. Verificar Tornillos de Todas las Guardas de Seguridad:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="id_verificarTornillosGuardasDeSeguridad"
            id={`id_verificarTornillosGuardasDeSeguridad-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_verificarTornillosGuardasDeSeguridad")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion4")}  />
  </div>
  
  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">5. Limpieza Interna y externa del Equipo:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="id_limpiezaInternaExternaEquipo"
            id={`id_limpiezaInternaExternaEquipo-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_limpiezaInternaExternaEquipo")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion5")}  />
  </div>

  <p style={{ color: errors ? 'red' : 'inherit' }}>{errors}</p>
  {/* Agrega más preguntas aquí siguiendo el mismo patrón */}
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Guardar</button>
  </div>
</form>


    </div>
  );
};

export default DCKBT;
