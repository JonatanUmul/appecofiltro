import { pool } from "../../../src/db.js";

      


export const postDCKMM = async(req, res)=>{
  const {
    id_CKMM,
    id_limpiezaGeneral,
    id_AccionamientoCorrectoTornillos,
    id_AccionamientoCorrectoCompuertaPolvos,
    id_VerificarAjusteCorrectoTornillosChumaceras,
    id_VerificarVisualmenteEstadoPaletasTornilloSeco,
    id_VerificarTornillosGuardasDeSeguridad,
    id_LubricaciónYLimpiezaExcesosGrasa,
	id_creador,
    observacion1,
    observacion2,
    observacion3,
    observacion4,
    observacion5,
    observacion6,
    observacion7
    }= req.body
   
   
    try{
    
       const consulta=`INSERT INTO dckmm (
        id_CKMM,
        id_limpiezaGeneral,
        id_AccionamientoCorrectoTornillos,
        id_AccionamientoCorrectoCompuertaPolvos,
        id_VerificarAjusteCorrectoTornillosChumaceras,
        id_VerificarVisualmenteEstadoPaletasTornilloSeco,
        id_VerificarTornillosGuardasDeSeguridad,
        id_LubricaciónYLimpiezaExcesosGrasa,
      id_creador,
        observacion1,
        observacion2,
        observacion3,
        observacion4,
        observacion5,
        observacion6,
        observacion7) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_CKMM,
          id_limpiezaGeneral,
          id_AccionamientoCorrectoTornillos,
          id_AccionamientoCorrectoCompuertaPolvos,
          id_VerificarAjusteCorrectoTornillosChumaceras,
          id_VerificarVisualmenteEstadoPaletasTornilloSeco,
          id_VerificarTornillosGuardasDeSeguridad,
          id_LubricaciónYLimpiezaExcesosGrasa,
        id_creador,
          observacion1,
          observacion2,
          observacion3,
          observacion4,
          observacion5,
          observacion6,
          observacion7
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDCKMM= async(req, res)=>{
const id= req.params.id;

try {
  const consulta= `
	select 
    d.fechaCreacion,
    d.horaCreacion,
    d.id_CKMM,
    r1.respuesta AS 'id_limpiezaGeneral',
    r2.respuesta AS 'id_AccionamientoCorrectoTornillos',
    r3.respuesta AS 'id_AccionamientoCorrectoCompuertaPolvos',
    r4.respuesta AS 'id_VerificarAjusteCorrectoTornillosChumaceras',
    r5.respuesta AS 'id_VerificarVisualmenteEstadoPaletasTornilloSeco',
    r6.respuesta AS 'id_VerificarTornillosGuardasDeSeguridad',
    r7.respuesta AS 'id_LubricaciónYLimpiezaExcesosGrasa',
    user.username AS 'creador',
    d.observacion1,
    d.observacion2,
    d.observacion3,
    d.observacion4,
    d.observacion5,
    d.observacion6,
    d.observacion7


    
    FROM dckmm d
    
    left join respuestas r1 on d.id_limpiezaGeneral = r1.id
    left join respuestas r2 on d.id_AccionamientoCorrectoTornillos = r2.id
    left join respuestas r3 on d.id_AccionamientoCorrectoCompuertaPolvos = r3.id
    left join respuestas r4 on d.id_VerificarAjusteCorrectoTornillosChumaceras = r4.id
    left join respuestas r5 on d.id_VerificarVisualmenteEstadoPaletasTornilloSeco = r5.id
    left join respuestas r6 on d.id_VerificarTornillosGuardasDeSeguridad = r6.id
    left join respuestas r7 on d.id_LubricaciónYLimpiezaExcesosGrasa = r7.id
	left join user on d.id_creador= user.id
     where d.id_CKMM =?;
  `
  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });
  
} catch (error) {
  console.error("Error al obtener los datos de la tabla dtp:", error);
  res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
}

} 