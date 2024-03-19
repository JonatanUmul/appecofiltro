import React, { useEffect, useState }  from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert

const DTPV = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
 const [matPrim, setMatPrim]=useState([])

useEffect(() => {
  try {
    const url='http://localhost:3001/MateriaPrima'

    axios.get(url).then((MateriaPrimresponse)=>{setMatPrim(MateriaPrimresponse.data)})
    
  } catch (error) {
    console.log(error)
  }

}, [])
console.log(matPrim)

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/DTPV', {
        id_OTPV: id.toString(),
        cantidad: formData.cantidad,
        humedad: formData.humedad,
        id_MP: formData.id_MP
        
       
      });Swal.fire({
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
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Pulverizado de Barro</h4>
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

          <label htmlFor="esquinaSI" className="form-label">
            Materia Prima
          </label>
          <div class="form-group">
          <select class="form-control" name="" id="id_MP" {...register('id_MP')}>
            <option value="selecciona">Selecciona una opción</option>
            {Array.isArray(matPrim.rows)&& matPrim.rows.length>0&& matPrim.rows.map((Primas)=>(
              
              <option key={Primas.id_enc}value={Primas.id_enc}>{Primas.nom_matPrima}</option>
           
            
            ))}
            </select>
          </div>
         
        </div>
        <div className="col-md-6">
          
          <label htmlFor="esquinaSI" className="form-label">
            Sacos
          </label>
          <input type="text" className="form-control" id="cantidad" {...register("cantidad")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
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

export default DTPV;
