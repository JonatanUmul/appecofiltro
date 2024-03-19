import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert

const DTHP = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [aserradero, setAserradero] = useState([]);
  const [turno, setTurno] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [tipoCernido, setTipoCernido] = useState([]);
  const [error, setError]= useState('')

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/Turnos"),
      axios.get("http://localhost:3001/Aserradero"),
      axios.get("http://localhost:3001/ModelosUF"),
      axios.get("http://localhost:3001/TipoCernido"),
    
    ])
      .then(([TurnosResponse, AserraderoResponse, ModelosufResponse, TipoCernidoResponse]) => {
        setTurno(TurnosResponse.data);
        setAserradero(AserraderoResponse.data);
        setModelos(ModelosufResponse.data);
        setTipoCernido(TipoCernidoResponse.data);
     
      })
      .catch((error) => {
        setError("Error al obtener los datos", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/DTP' ,
      {
        id_OTP: id.toString(),
        id_turno: formData.id_turno,
        id_tipoCernido: formData.id_tipoCernido,
        id_Aserradero: formData.id_Aserradero,
        id_ufmodelo: formData.id_ufmodelo,
        producido: formData.producido,
        codigoInicio: formData.codigoInicio,
        codigoFinal: formData.codigoFinal,
        librasBarro: formData.librasBarro,
        librasAserrin: formData.librasAserrin,
        
       

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
      setError("Error al enviar los datos:", error);
    }
  };

console.log('datos props',encabezado, EncName, fecha_creacion,id)
  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Producción</h4>
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

      {/*iniioc de form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">

      <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Turno de Producción
          </label>
          <select className="form-select" id="id_turno" {...register("id_turno")}>
            {Array.isArray(turno.rows)
            && turno.rows.length>0 && turno.rows.map((turno) => (
              <option key={turno.id} value={turno.id}>
                {turno.turno}
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
          <label htmlFor="aserradero" className="form-label">
              Modelo
          </label>
          <select className="form-select" id="id_ufmodelo" {...register("id_ufmodelo")}>
            {Array.isArray(modelos.rows)
            && modelos.rows.length>0 && modelos.rows.map((modelo) => (
              <option key={modelo.id_mod} value={modelo.id_mod}>
                {modelo.nombre_modelo}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
              Tipo de Cernido
          </label>
          <select className="form-select" id="id_tipoCernido" {...register("id_tipoCernido")}>
            {Array.isArray(tipoCernido.rows)
            && tipoCernido.rows.length>0 && tipoCernido.rows.map((tipoCernido) => (
              <option key={tipoCernido.id} value={tipoCernido.id}>
                {tipoCernido.tipoCernido}
              </option>
            ))}
          </select>
        </div>
       
   
        
    
        <div className="col-md-6">
          <label htmlFor="esquinaSI" className="form-label">
            Producido
          </label>
          <input type="number" className="form-control" id="producido" {...register("producido")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Codigo de Inicio
          </label>
          <input type="text" className="form-control" id="codigoInicio" {...register("codigoInicio")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Codigo Final
          </label>
          <input type="text" className="form-control" id="codigoFinal" {...register("codigoFinal")} required />
        </div>
      
        <div className="col-md-6">
          <label htmlFor="esquinaII" className="form-label">
            Libras de Barro
          </label>
          <input type="text" className="form-control" id="librasBarro" {...register("librasBarro")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Libras de Aserrin
          </label>
          <input type="text" className="form-control" id="librasAserrin" {...register("librasAserrin")} required />
        </div>
        <div className="col-12">
          <label style={{ color: 'red' }}>{error}</label>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DTHP;
