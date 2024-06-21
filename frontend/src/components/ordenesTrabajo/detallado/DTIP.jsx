
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL

const DTHP = ({ encabezado, EncName, fecha_creacion,id }) => {
  const { handleSubmit, register } = useForm();
  const [modelos, setModelos] = useState([]);
  const [plata, setPlata]=useState([])
  const [error, setError]= useState('')
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
      
  const insumo='Plata' 
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/Insumos/${insumo}`),
   
    ])
      .then(([ ModelosufResponse, insumoResponse]) => {
        setModelos(ModelosufResponse.data);
        setPlata(insumoResponse.data)
      })
      .catch((error) => {
        setError("Error al obtener los datos", error);
      });
  }, []);
  console.log('Plata',plata)
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${URL}/DTIP` ,
      {
        id_OTIP: id.toString(),
        TipoPlata:formData.TipoPlata,
        fecha_real:fecha_creacion,
        id_modelo: formData.id_modelo,
        codigoInicio: formData.codigoInicio,
        codigoFinal: formData.codigoFinal,
        impregnados: formData.impregnados,
        mermas: formData.mermas,
        id_creador:id_creador
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
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Impregnación</h4>
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
              Modelo
          </label>
          <select className="form-select" id="id_modelo" {...register("id_modelo")}>
          <option value="" disabled selected>Seleccione...</option>
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
              Tipo de Plata
          </label>
          <select className="form-select" id="TipoPlata" {...register("TipoPlata")}>
          <option value="" disabled selected>Seleccione...</option>
          {Array.isArray(plata.rows)
            && plata.rows.length>0 && plata.rows.map((plata) => (
              <option key={plata.id} value={plata.id}>
                {plata.insumo}
              </option>
            ))}
          </select>
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
          <label htmlFor="esquinaID" className="form-label">
           Impregnados
          </label>
          <input type="number" className="form-control" id="impregnados" {...register("impregnados")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
           Mermas
          </label>
          <input type="number" className="form-control" id="mermas" {...register("mermas")} required />
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
