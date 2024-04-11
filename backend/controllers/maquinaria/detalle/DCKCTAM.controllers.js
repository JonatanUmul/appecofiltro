import { pool } from "../../../src/db.js";

      


export const postDCKCTAM = async(req, res)=>{
  const {
    id_CKTAM,
    id_visorNivelFuncionado,
    id_accionamieentoCorrectroLLaveDeAgua,
    id_creador,
    observacion1,
    observacion2
    }= req.body
   
    
    try{
    
       const consulta=`INSERT INTO dcktam(
        id_CKTAM,
        id_visorNivelFuncionado,
        id_accionamieentoCorrectroLLaveDeAgua,
        id_creador,
        observacion1,
        observacion2
     ) Values(?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_CKTAM,
          id_visorNivelFuncionado,
          id_accionamieentoCorrectroLLaveDeAgua,
          id_creador,
          observacion1,
          observacion2
       
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDCKCTAM= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    select 
    d.fechaCreacion,
    d.horaCreacion,
    d.id_CKTAM,
    r1.respuesta AS 'id_visorNivelFuncionado',
    r2.respuesta AS 'id_accionamieentoCorrectroLLaveDeAgua',
    user.username AS 'creador',
    d.observacion1,
    d.observacion2

    
    FROM dcktam d
    
    left join respuestas r1 on d.id_visorNivelFuncionado = r1.id
    left join respuestas r2 on d.id_accionamieentoCorrectroLLaveDeAgua = r2.id
	left join user on d.id_creador= user.id
     where d.id_CKTAM =?;
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 

