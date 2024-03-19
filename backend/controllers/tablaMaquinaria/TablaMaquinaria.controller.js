import { pool } from '../../src/db.js';

export const getTablaMaquinaria = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
        SELECT 'CKTA' AS encabezado, 'Tanque de Agua 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKTA 
         WHERE id_estado = 2
        
        UNION all
        
        SELECT 'CKEXT' AS encabezado, 'Extrusora 2.0' AS EncName,id, fecha_creacion, id_creador, id_maquina
        FROM CKEXT 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'CKBT' AS encabezado, 'Banda Transportadora 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKBT 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'CKCTA' AS encabezado, 'Cortador Automatico 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKCTA   
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'CKCTAM' AS encabezado, 'Tanque de Agua Mini' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKCTAM 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'CKM2' AS encabezado, 'Mezcladora 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKM2 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'CKMM' AS encabezado, 'Mezcladora Mini' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKMM 
         WHERE id_estado = 2
       
        
        UNION all
       
        SELECT 'CKPH2' AS encabezado, 'Prensa Hidraulica 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKPH2 
        WHERE id_estado = 2
        
         UNION all
       
        SELECT 'CKPHM' AS encabezado, 'Prensa Hidraulica Mini' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM CKPHM 
         WHERE id_estado = 2

         UNION all
       
         SELECT 'CKPM' AS encabezado, 'Prensa Hidraulica Manual' AS EncName, id, fecha_creacion, id_creador, id_maquina
         FROM CKPM 
          WHERE id_estado = 2
        `;

        const [rows] = await pool.query(consulta);
        
        // Verifica si se encontraron resultados
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los resultados al cliente
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};
