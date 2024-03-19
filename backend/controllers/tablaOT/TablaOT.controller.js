import { pool } from '../../../backend/src/db.js';

export const getTablaOT = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
 SELECT 'OTHP' AS encabezado, 'Humedad en Patios' AS EncName, id, fecha_creacion, id_creador
 FROM OTHP 
 WHERE id_est = 2
 
 UNION all
 
 SELECT 'OTSA' AS encabezado, 'Secado de Aserrín' AS EncName,id, fecha_creacion, id_creador
 FROM OTSA 
 WHERE id_est = 2

 UNION all

 SELECT 'OTCA1' AS encabezado, 'Cernido 1' AS EncName, id, fecha_creacion, id_creador
 FROM OTCA1 
 WHERE id_est = 2

 UNION all

 SELECT 'OTCA2' AS encabezado, 'Cernido 2' AS EncName, id, fecha_creacion, id_creador
 FROM OTCA2 
 WHERE id_est = 2

 UNION all

 SELECT 'OTPV' AS encabezado, 'Pulverizado de materia prima' AS EncName, id, fecha_creacion, id_creador
 FROM OTPV 
 WHERE id_est = 2

 UNION all

 SELECT 'OTFM' AS encabezado, 'Formulación' AS EncName, id, fecha_creacion, id_creador
 FROM OTFM 
 WHERE id_est = 2

 UNION all

 SELECT 'OTP' AS encabezado, 'Producción' AS EncName, id, fecha_creacion, id_creador
 FROM OTP 
 WHERE id_est = 2

 
 UNION all

 SELECT 'OTHH' AS encabezado, 'Horneados' AS EncName, id, fecha_creacion, id_creador
 FROM OTHH 
 WHERE id_est = 2
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
