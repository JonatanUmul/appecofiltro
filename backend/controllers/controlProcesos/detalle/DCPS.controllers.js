import { pool } from "../../../src/db.js";



export const postDCPS = async(req, res)=>{
  const {
    id_DCPS, codigo, id_prensador, id_prensa,id_mod, id_calificacion
    }= req.body
   
    try{
    
       const consulta='INSERT INTO dcps(id_DCPS, codigo, id_prensador, id_prensa, id_mod, id_calificacion)Values(?, ?,?,?,?,?)';
        const [rows]= await pool.query(consulta,[id_DCPS, codigo, id_prensador, id_prensa, id_mod, id_calificacion])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const getDCPS = async(req, res)=>{
  const id= req.params.id;

  try {
    const consulta=
    `SELECT 
    d.id,
    d.codigo,
    d.fecha_creacion,
    cps.id AS id_cps,
    operarios.Nombre AS prensador,
    enc_maq.nombre_maq AS prensa,
    ufmodelo.nombre_modelo AS modelo,
    calificaciones.calificacion AS calificacion
FROM 
    dcps d
LEFT JOIN cps ON d.id_DCPS = cps.id
LEFT JOIN operarios ON d.id_prensador = operarios.id
LEFT JOIN enc_maq ON d.id_prensa = enc_maq.id_maq
LEFT JOIN ufmodelo ON d.id_mod = ufmodelo.id_mod
LEFT JOIN calificaciones ON d.id_calificacion = calificaciones.id

where d.id_DCPS= ?`
    const [rows]= await pool.query(consulta, [id])
    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });

  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
}