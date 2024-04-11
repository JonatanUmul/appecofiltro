import { pool } from "../../../src/db.js";

      


export const postDCKBT = async(req, res)=>{
  const {
    id_CKBT,
    id_limpiezaBandaYRodillos,
    id_lubricacionChumaceras,
    id_accionamientoCorrectoDeMotor,
    id_creador,
    observacion1,
    observacion2,
    observacion3,
    }= req.body
   
   
    try{
    
       const consulta=`INSERT INTO dckbt(
        id_CKBT,
        id_limpiezaBandaYRodillos,
        id_lubricacionChumaceras,
        id_accionamientoCorrectoDeMotor,
        id_creador,
        observacion1,
        observacion2,
        observacion3) Values(?,?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_CKBT,
          id_limpiezaBandaYRodillos,
          id_lubricacionChumaceras,
          id_accionamientoCorrectoDeMotor,
          id_creador,
          observacion1,
          observacion2,
          observacion3
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDCKBT= async(req, res)=>{
const id= req.params.id;

try {
  const consulta= `
  select 
  d.fechaCreacion,
  d.horaCreacion,
  id_CKBT,
  r1.respuesta AS 'id_limpiezaBandaYRodillos',
  r2.respuesta AS 'id_lubricacionChumaceras',
  r3.respuesta AS 'id_accionamientoCorrectoDeMotor',
  user.username AS 'creador',
  
  d.observacion1,
  d.observacion2,
  d.observacion3
  
  FROM dckbt d
  
  left join respuestas r1 on d.id_limpiezaBandaYRodillos = r1.id
  left join respuestas r2 on d.id_lubricacionChumaceras = r2.id
  left join respuestas r3 on d.id_accionamientoCorrectoDeMotor = r3.id
  left join user on d.id_creador = user.id
  where d.id_CKBT=?
  `
  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });
  
} catch (error) {
  console.error("Error al obtener los datos de la tabla dtp:", error);
  res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
}

} 