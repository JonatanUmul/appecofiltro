import { pool } from '../../src/db.js';

export const getMantenimientoMaq = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
        SELECT 'MTA' AS encabezado, 'Tanque de Agua 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MTA 
         WHERE id_estado = 2
        
        UNION all
        
        SELECT 'MEXT' AS encabezado, 'Extrusora 2.0' AS EncName,id, fechaCreacion, id_creador, id_maquina
        FROM MEXT 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'MBT' AS encabezado, 'Banda Transportadora 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MBT 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'MCTA' AS encabezado, 'Cortador Automatico 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MCTA   
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'MTAM' AS encabezado, 'Tanque de Agua Mini' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MTAM 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'MM2' AS encabezado, 'Mezcladora 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MM2 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'MMM' AS encabezado, 'Mezcladora Mini' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MMM 
         WHERE id_estado = 2
       
        
        UNION all
       
        SELECT 'MPH2' AS encabezado, 'Prensa Hidraulica 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MPH2 
        WHERE id_estado = 2
        
         UNION all
       
        SELECT 'MPHM' AS encabezado, 'Prensa Hidraulica Mini' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM MPHM 
         WHERE id_estado = 2

         UNION all
       
         SELECT 'MPM' AS encabezado, 'Prensa Hidraulica Manual' AS EncName, id, fechaCreacion, id_creador, id_maquina
         FROM MPM 
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
