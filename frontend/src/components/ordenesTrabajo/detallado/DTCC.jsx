import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { formatFecha } from "../../utilidades/FormatearFecta";


const URL = process.env.REACT_APP_URL
const DTHP = ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
 
  const [operario, setOperario] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [turno, setTurno] = useState([]);
  const [hornos, setTHornos] = useState([]);
  const [id_creador, setid_creador] = useState('');
  
  useEffect(()=>{
    setid_creador(localStorage.getItem('id_creador'))
  })
      
  const id_area = 4;
  const id_area2 = 9;



  const maquinaria="Horno";
  // console.log('operario',operario)
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/Operarios/${id_area}/${id_area2}`),
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/Turnos`),
    ])
      .then(([OperariosResponse, ufModeloResponse,HornosResponse, turnoResponse]) => {
        setOperario(OperariosResponse.data);
 
        setModelo(ufModeloResponse.data);
        setTHornos(HornosResponse.data);
        setTurno(turnoResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);
console.log(operario)
  const onSubmit = async (formData) => {
    try {
      await axios.post(`${URL}/DTCC`, {
        id_OTCC: id.toString(),
        fecha_real:fecha_creacion,
        horneados:formData.horneados,
        codigoInicio: formData.codigoInicio,
        codigoFin: formData.codigoFin,
        id_operarioCC: formData.id_operarioCC,
        id_auditor:formData.id_auditor,
        modelo: formData.modelo,
        id_horno: formData.id_horno,
        turnoCC: formData.turnoCC,
        fechaHorneado: formData.fechaHorneado,
        turnoHorneado: formData.turnoHorneado,
        aprobados: formData.aprobados,
        altos: formData.altos,
        bajos: formData.bajos,
        mermas_hornos:formData.mermas_hornos,
        rajadosCC: formData.rajadosCC,
        crudoCC: formData.crudoCC,
        quemados: formData.quemados,
        ahumados: formData.ahumados,
        id_creador:id_creador
       
      });
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        window.location.href = "/Home/TablaOT";
      },1500 );
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

 

  return (
    <div className="mt-4">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>Control de Calidad</h4>
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
        Código Inicio
      </label>
      <input type="text" className="form-control" id="codigoInicio" {...register("codigoInicio")} required />
    </div>
    
    <div className="col-md-6">
    <label htmlFor="esquinaSI" className="form-label">
      Código Final
    </label>
    <input type="text" className="form-control" id="codigoFin" {...register("codigoFin")} required />
  </div>
  <div className="col-md-6">
      <label htmlFor="esquinaSI" className="form-label">
        Horneados
      </label>
      <input type="text" className="form-control" id="horneados" {...register("horneados")} required />
    </div>
      <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Responsable de CC
          </label>
          <select className="form-select" id="id_operarioCC" {...register("id_operarioCC")}>
          <option value="" disabled selected>Seleccione...</option>
          {operario.rows && Array.isArray(operario.rows) && operario.rows.filter(operario => operario.id_area === 4 ).map((operario) => (
            <option key={operario.id} value={operario.id}>
              {operario.Nombre}
            </option>
          ))}
        </select>
        </div>

        <div className="col-md-6">
        <label htmlFor="aserradero" className="form-label">
          Auditor de Procesos
        </label>
        <select className="form-select" id="id_auditor" {...register("id_auditor")}>
        <option value="" disabled selected>Seleccione...</option>
          {operario.rows && Array.isArray(operario.rows) && operario.rows.filter(operario =>  operario.id_area === 9).map((operario) => (
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
          <option value="" disabled selected>Seleccione...</option>
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
            Horno
        </label>
        <select className="form-select" id="id_horno" {...register("id_horno")}>
        <option value="" disabled selected>Seleccione...</option>
        {Array.isArray(hornos.rows)
          && hornos.rows.length>0 && hornos.rows.map((horno) => (
            <option key={horno.id_maq} value={horno.id_maq}>
              {horno.nombre_maq}
            </option>
          ))}
        </select>
      </div>
        <div className="col-md-6">
          <label htmlFor="aserradero" className="form-label">
            Turno de CC
          </label>
          <select className="form-select" id="turnoCC" {...register("turnoCC")}>
          <option value="" disabled selected>Seleccione...</option>
            {Array.isArray(turno.rows)
            && turno.rows.length>0 && turno.rows.map((turno) => (
              <option key={turno.id} value={turno.id}>
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
          <option value="" disabled selected>Seleccione...</option>
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
            Aprobados
          </label>
          <input type="number" className="form-control" id="aprobados" {...register("aprobados")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaSD" className="form-label">
            Altos
          </label>
          <input type="number" className="form-control" id="altos" {...register("altos")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="centro" className="form-label">
            Bajos
          </label>
          <input type="number" className="form-control" id="bajos" {...register("bajos")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="mermasHornos" className="form-label">
            Mermas de hornos
          </label>
          <input type="number" className="form-control" id="mermas_hornos" {...register("mermas_hornos")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaII" className="form-label">
            Rajados de C.c
          </label>
          <input type="number" className="form-control" id="rajadosCC" {...register("rajadosCC")} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="esquinaID" className="form-label">
            Crudos de C.c
          </label>
          <input type="number" className="form-control" id="crudoCC" {...register("crudoCC")} required />
        </div>
        <div className="col-md-6">
        <label htmlFor="esquinaID" className="form-label">
          Quemados de C.c
        </label>
        <input type="number" className="form-control" id="quemados" {...register("quemados")} required />
      </div>
      <div className="col-md-6">
      <label htmlFor="esquinaID" className="form-label">
        Ahumados de C.c
      </label>
      <input type="number" className="form-control" id="ahumados" {...register("ahumados")} required />
    </div>
  
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DTHP;
