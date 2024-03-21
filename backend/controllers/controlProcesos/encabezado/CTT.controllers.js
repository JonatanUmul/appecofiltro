import { pool } from "../../../src/db.js";



export const postCTT = async(req, res)=>{
    const id_est= 2;
    // const id_creador= 8;
    const codigoInicio= req.body.codigoInicio;
    const codigoFinal= req.body.codigoFinal
   
    try{
    
       const consulta='INSERT INTO ctt(id_est, codigoInicio, codigoFinal)Values(?,?, ?)';
        const [rows]= await pool.query(consulta,[id_est, codigoInicio, codigoFinal])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const putCTT = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM

    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE ctt SET id_est = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};