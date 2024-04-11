import { pool } from "../../../src/db.js";

      


export const postDCKTA = async(req, res)=>{
  const {
    id_CKTA,
    id_visorFuncionandoNivelDeAguaVisible,
    id_accionamientoCorrectoSelenoideAlimentacion,
    id_accionamientoCorrectoSelenoideLlenado,
    observacion1,
    observacion2,
    observacion3,
    }= req.body
   
   
    try{
    
       const consulta=`INSERT INTO dckta (
        id_CKTA,
        id_visorFuncionandoNivelDeAguaVisible,
        id_accionamientoCorrectoSelenoideAlimentacion,
        id_accionamientoCorrectoSelenoideLlenado,
        observacion1,
        observacion2,
        observacion3) Values(?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_CKTA,
          id_visorFuncionandoNivelDeAguaVisible,
          id_accionamientoCorrectoSelenoideAlimentacion,
          id_accionamientoCorrectoSelenoideLlenado,
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
    SELECT 
    d.id_CKTA,
    d.fecha_creacion,
    r1.respuesta AS 'VisorNivel',
    r2.respuesta AS 'AccionamientoSelenoideAlimentaciónAgua',
    r3.respuesta AS 'AccionamientoSelenoideLlenadoTanque',
    CASE 
        WHEN d.observacion1 IS NOT NULL OR d.observacion1 != '' THEN d.observacion1
        ELSE NULL
    END AS observacion1,
    CASE 
        WHEN d.observacion2 IS NOT NULL OR d.observacion2 != '' THEN d.observacion2
        ELSE NULL
    END AS observacion2,
    CASE 
        WHEN d.observacion3 IS NOT NULL OR d.observacion3 != '' THEN d.observacion3
        ELSE NULL
    END AS observacion3
FROM 
    dckta d
left JOIN 
    respuestas r1 ON d.id_visorFuncionandoNivelDeAguaVisible = r1.id
left JOIN 
    respuestas r2 ON d.id_accionamientoCorrectoSelenoideAlimentacion = r2.id
left JOIN 
    respuestas r3 ON d.id_accionamientoCorrectoSelenoideAlimentacion = r3.id
WHERE 
    d.id_CKTA = 1;
    
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 