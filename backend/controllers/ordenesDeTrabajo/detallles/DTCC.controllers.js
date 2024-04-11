import { pool } from "../../../src/db.js";



export const postDTCC = async(req, res)=>{
    const estado= 2;
    
    const {
        id_OTCC,horneados, fecha_real ,codigoInicio,codigoFin,id_operarioCC,modelo,turnoCC,fechaHorneado,turnoHorneado,aprobados,altos,bajos,rajadosCC,crudoCC,quemados,ahumados
        } = req.body;
    

    try{
        if(estado===''){
            console.log('Uno o varios datos estan vacios')
        }
        else{
            const consulta='INSERT INTO dtcc(id_OTCC,horneados,fecha_real ,codigoInicio,codigoFin,id_operarioCC,modelo,turnoCC,fechaHorneado,turnoHorneado,aprobados,altos,bajos,rajadosCC,crudoCC,quemados,ahumados)Values(?,?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?,?,?,?)';
        const [rows]= await pool.query(consulta,[id_OTCC,horneados,   fecha_real ,codigoInicio,codigoFin,id_operarioCC,modelo,turnoCC,fechaHorneado,turnoHorneado,aprobados,altos,bajos,rajadosCC,crudoCC,quemados,ahumados])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}

export const getDTCC = async(req, res)=>{

    const id= req.params.id
    try {
    const consulta = 
    `SELECT
    d.id_OTCC,
      d.id,
      d.fecha_real,
      d.fecha_creacion,
      d.codigoInicio,
      d.codigoFin,
      d.fechaHorneado,
      d.aprobados,
      d.altos,
      d.bajos,
      d.rajadosCC,
      d.crudoCC,
      d.quemados,
      d.ahumados,
      operarios.Nombre AS encargadoCC,
      ufmodelo.nombre_modelo AS modeloUF,
      turnoCC.turno AS turnoCC, 
      turnoHorneado.turno AS turnoHorneado  
    FROM dtcc d
    LEFT JOIN operarios ON d.id_operarioCC = operarios.id
    LEFT JOIN ufmodelo ON d.modelo = ufmodelo.id_mod
    LEFT JOIN turno AS turnoCC ON d.turnoCC = turnoCC.id  
    LEFT JOIN turno AS turnoHorneado ON d.turnoHorneado = turnoHorneado.id; 

    where d.id_OTCC = ?`
    const [rows]= await pool.query(consulta, [id])
    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}