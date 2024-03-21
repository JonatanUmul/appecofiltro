import { pool } from "../../../src/db.js";



export const postDCPB = async(req, res)=>{
  const {
    id_CPB, id_modelo, id_pulidor, id_prensa,id_modulo, pulido,id_calificacion, fechaProduccion
    }= req.body
   
   
    try{
    
       const consulta='INSERT INTO dcpb(id_CPB, id_modelo, id_pulidor, id_prensa, id_modulo, pulido,id_calificacion, fechaProduccion)Values(?, ?,?,?,?,?,?,?)';
        const [rows]= await pool.query(consulta,[id_CPB, id_modelo, id_pulidor, id_prensa,id_modulo, pulido,id_calificacion, fechaProduccion])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDCPB= async(req, res)=>{
const id= req.params.id;

try {
  const consulta= `
select 
d.id,
d.pulido,
d.fecha_creacion,
d.fechaProduccion,
cpb.id as id_cpb,
ufmodelo.nombre_modelo as modelo,
operarios.Nombre as pulidor,
enc_maq.nombre_maq as prensa,
modulostarimas.modulo as modulo,
calificaciones.calificacion as calificacion

from 
	dcpb d
    
JOIN cpb on d.id_cpb= cpb.id
JOIN ufmodelo on d.id_modelo= ufmodelo.id_mod
join operarios on d.id_pulidor= operarios.id
join enc_maq on d.id_prensa= enc_maq.id_maq
join modulostarimas on d.id_modulo= modulostarimas.id
join calificaciones on d.id_calificacion= calificaciones.id
  
  where d.id_cpb=?
  `
  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });
  
} catch (error) {
  console.error("Error al obtener los datos de la tabla dtp:", error);
  res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
}

} 