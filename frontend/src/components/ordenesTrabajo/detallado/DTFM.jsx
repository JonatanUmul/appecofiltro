import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const DTFM = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [matPrima, setMatPrima] = useState([]);
  
 

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/Aserradero"),
      axios.get("http://localhost:3001/MateriaPrima"),
    
    ])
      .then(([AserraderoResponse, MatPrimResponse]) => {
        setAserradero(AserraderoResponse.data);
        setMatPrima(MatPrimResponse.data)
    
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/DTFM', {
        id_OTFM: id.toString(),
        id_Aserradero: formData.id_Aserradero,
        cantidad: formData.cantidad,
        peso: formData.peso,
        humedad: formData.humedad,
        id_matPrim: formData.id_matPrim
       
      });  // Mostrar SweetAlert de éxito
      Swal.fire({
       icon: 'success',
       title: 'Guardado exitosamente',
       showConfirmButton: false,
       timer: 1500
     });

     // Redirigir a la página de TablaOT después de 1.5 segundos
     setTimeout(() => {
       window.location.href = "/Home/TablaOT";
     },1500 );
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
console.log('datos props',encabezado, EncName, fecha_creacion,id)
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Formulación {id}</h4>
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

{/*  iniico de fomrulario*/}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">

      <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Materia Prima
          </label>
          <select className="form-select" id="id_matPrim" {...register("id_matPrim")}>
            {Array.isArray(matPrima.rows)
            && matPrima.rows.length>0 && matPrima.rows.map((matPrima) => (
              <option key={matPrima.id_enc} value={matPrima.id_enc}>
                {matPrima.nom_matPrima}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Aserradero
          </label>
          <select className="form-select" id="id_Aserradero" {...register("id_Aserradero")}>
            {Array.isArray(aserradero.rows)
            && aserradero.rows.length>0 && aserradero.rows.map((aserradero) => (
              <option key={aserradero.id} value={aserradero.id}>
                {aserradero.nombre_aserradero}
              </option>
            ))}
          </select>
        </div>
       
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Cantidad
          </label>
          <input type="number" className="form-control" id="cantidad" {...register("cantidad")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Peso
          </label>
          <input type="text" className="form-control" id="peso" {...register("peso")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="centro" className="form-label">
            Humedad
          </label>
          <input type="number" className="form-control" id="humedad" {...register("humedad")} required />
        </div>  
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DTFM;
