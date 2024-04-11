import { pool } from "../../../src/db.js";

      


export const postDCKCTA = async(req, res)=>{
  const {
    id_CKCTA,
    id_verificarCableDeCorteEnBuenEstado,
    id_lubricarGuiasDelCortador,
    id_limpiezaGeneralDeCorrederasGuiasCortador,
    observacion1,
    observacion2,
    observacion3,
    }= req.body
   
   
    try{
    
       const consulta=`INSERT INTO dckcta (
        id_CKCTA,
        id_verificarCableDeCorteEnBuenEstado,
        id_lubricarGuiasDelCortador,
        id_limpiezaGeneralDeCorrederasGuiasCortador,
        observacion1,
        observacion2,
        observacion3) Values(?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_CKCTA,
          id_verificarCableDeCorteEnBuenEstado,
          id_lubricarGuiasDelCortador,
          id_limpiezaGeneralDeCorrederasGuiasCortador,
          observacion1,
          observacion2,
          observacion3
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}



export const getDCKCTA= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    select 
    d.fechaCreacion,
    d.horaCreacion,
    d.id_CKCTA,
    r1.respuesta AS 'id_verificarCableDeCorteEnBuenEstado',
    r2.respuesta AS 'id_lubricarGuiasDelCortador',
    r3.respuesta AS 'id_limpiezaGeneralDeCorrederasGuiasCortador',
  
    
    d.observacion1,
    d.observacion2,
    d.observacion3
    
    FROM dckcta d
    
    left join respuestas r1 on d.id_verificarCableDeCorteEnBuenEstado = r1.id
    left join respuestas r2 on d.id_lubricarGuiasDelCortador = r2.id
    left join respuestas r3 on d.id_limpiezaGeneralDeCorrederasGuiasCortador = r3.id 
     where d.id_CKCTA =?
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 

