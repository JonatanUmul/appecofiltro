import { pool } from "../../../src/db.js";



export const postDTHH = async(req, res)=>{
    const estado= 2;
    
    const {
        id_OTHH, id_turno, id_aserradero, id_tipCernido, id_modelo, id_horno, id_hornero, horneado, mermasCrudas, codigoInicio, codigoFin, librasBarro, librasAserrin
     } = req.body;
    

    try{
        if(estado===''){
            console.log('Uno o varios datos estan vacios')
        }
        else{
            const consulta='INSERT INTO dthh(id_OTHH, id_turno, id_aserradero, id_tipCernido, id_modelo, id_horno, id_hornero, horneado, mermasCrudas, codigoInicio, codigoFin, librasBarro, librasAserrin)Values(?, ?,?, ?,?, ?,?, ?,?, ?,?, ?,?)';
        const [rows]= await pool.query(consulta,[  id_OTHH, id_turno, id_aserradero, id_tipCernido, id_modelo, id_horno, id_hornero, horneado, mermasCrudas, codigoInicio, codigoFin, librasBarro, librasAserrin])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}

export const getDTHH = async(req, res)=>{

    const id= req.params.id
    try {
    const consulta = 
    `SELECT 
    d.id,
    d.codigoInicio,
    d.CodigoFin,
    d.horneado,
    d.mermasCrudas,
    d.librasBarro,
    d.librasAserrin,
    d.fecha_creacion,
    othh.id AS id_othh,
    turno.turno AS turno,
    aserradero.nombre_aserradero AS aserradero,
    tipocernido.tipoCernido AS tipocernido,
    ufmodelo.nombre_modelo as ufmodelo,
    enc_maq.nombre_maq as enc_maq,
    operarios.Nombre as operarios
    
FROM 
    dthh d
LEFT JOIN 
    othh ON d.id_OTHH = othh.id
LEFT JOIN 
    turno ON d.id_turno = turno.id
LEFT JOIN 
    aserradero ON d.id_aserradero = aserradero.id
LEFT JOIN 
    tipocernido ON d.id_tipCernido= tipocernido.id
LEFT JOIN
	ufmodelo on d.id_modelo= ufmodelo.id_mod
LEFT JOIN
	enc_maq on d.id_horno= enc_maq.id_maq
LEFT JOIN
	operarios on id_hornero = operarios.id
    
    where d.id_OTHH = ?`
    const [rows]= await pool.query(consulta, [id])
    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}