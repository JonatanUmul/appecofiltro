import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert

const DRM = ({  encabezado, EncName,fecha_creacion, id, codigoInicio, codigoFinal }) => {
  const { handleSubmit, register } = useForm();
  const [modeloUF, setModeloUf] = useState([]);
  const [tunel, setTunel]= useState([]);

  const maquinaria="Tunel"; 

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/ModelosUF`),
      axios.get(`http://localhost:3001/maquinaria/${maquinaria}`),
    ])
      .then(([ModelosResponse, TunelResponse]) => {
        setModeloUf(ModelosResponse.data);
        setTunel(TunelResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      
   
      const response = await axios.post("http://localhost:3001/DTT", {
        id_CTT: id.toString(),
        id_modelo: formData.id_modelo,
        id_tunel: formData.id_tunel,
        cabezaDerecha1: formData.cabezaDerecha1,
        pieDerecho1:formData.pieDerecho1,
        cabezaDerecha2: formData.cabezaDerecha2,
        pieDerecho2: formData.pieDerecho2,
        cabezaDerecha3: formData.cabezaDerecha3,
        pieIzquierdo1: formData.pieIzquierdo1,
        cabezaizquierda1: formData.cabezaizquierda1,
        pieIzquierdo2: formData.pieIzquierdo2
      });
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



  

  return (

    
    <div className="mt-2">
      <h4 style={{ textAlign: "center", color: "gray" }}>Control de Temperatura Tunel</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">
            {encabezado} - {EncName}
          </p>

          <label htmlFor="materiaPrima" className="form-label">
            Codigos
          </label>
          <p id="materiaPrima" className="form-control-static">
            {codigoInicio} - {codigoFinal}
          </p>

          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">
            {formatFecha(fecha_creacion)}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
        <div>
       
        <div className="row text-center" >
    <div className="col-sm-3">
      <label htmlFor={`modelo`} className="form-label">
        Modelo
      </label>
      <select
        className="form-select"
        name={`id_modelo`}
        id={`id_modelo`}
        {...register(`id_modelo`)}
      >
        {Array.isArray(modeloUF.rows) &&
          modeloUF.rows.length > 0 &&
          modeloUF.rows.map((modelo) => (
            <option key={modelo.id_mod} value={modelo.id_mod} >
              {modelo.nombre_modelo}
            </option>
          ))}
      </select>

      
    </div>
    <div className="col-sm-3">
      <label htmlFor={`tunel`} className="form-label">
        Tunel
      </label>
      <select
        className="form-select"
        name={`id_tunel`}
        id={`id_tunel`}
        {...register(`id_tunel`)}
      >
        {Array.isArray(tunel.rows) &&
          tunel.rows.length > 0 &&
          tunel.rows.map((tunel) => (
            <option key={tunel.id_maq} value={tunel.id_maq} >
              {tunel.nombre_maq}
              </option>
            ))}
      </select>

      
    </div>
    </div>

  <div className="row text-center mt-2" >
  
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
      Cabeza Derecha 1
    </label>  
    <input type="text"  className="form-control" id="pieIZ1" {...register(`cabezaDerecha1`)} required/>
    
    </div>
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
      Pie Derecho 1
    </label>  
    <input type="text"  className="form-control" id="cabezaIZ1" {...register(`pieDerecho1`)} required />
    
    </div>
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
    Cabeza Derecha 2
    </label>  
    <input type="text"  className="form-control" id="cabezaIZ2" {...register(`cabezaDerecha2`)} required/>
    
    </div>
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
    Pie Derecho 2
    </label>  
    <input type="text" className="form-control"  id="cabezaIZ3" {...register(`pieDerecho2`)} required/>
    
    </div>
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
    Cabeza Derecha 3
    </label>  
    <input type="text" className="form-control" id="pieIZ1" {...register(`cabezaDerecha3`)} required/>
    
    </div>
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
    Pie Izquierdo 1
    </label>  
    <input type="text"  className="form-control" id="cabezaDR1" {...register(`pieIzquierdo1`)}required/>
    
    </div>
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
    Cabeza Izquierda 1
    </label> 
    <input type="text" className="form-control" id="cabezaDR2" {...register(`cabezaizquierda1`)} required/>
    
    </div>
    <div className="col-md-3">
    <label htmlFor={`modelo`} className="form-label">
    Pie Izquierdo 2
    </label>  
    <input type="text" className="form-control"  id="cabezaDR3" {...register(`pieIzquierdo2`)} required/>
    </div>

   
  </div>

        </div>
       
        <div className="col-3 m2-3">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DRM;
