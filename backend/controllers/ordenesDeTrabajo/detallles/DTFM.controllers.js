import { pool } from "../../../src/db.js";

export const postDTFM = async (req, res) => {

    const { id_OTFM, id_Aserradero, cantidad, peso, humedad , id_creador, id_matPrim} = req.body;
    console.log(id_OTFM)
    try {
        if (id_OTFM === '' || id_Aserradero === '' || cantidad === '' || peso === '' || humedad === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'INSERT INTO dtfm(id_OTFM, id_Aserradero, cantidad, peso, humedad,id_creador, id_matPrim) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const [rows] = await pool.query(consulta, [id_OTFM, id_Aserradero, cantidad, peso, humedad, id_creador, id_matPrim]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};



export const getDTFM = async (req, res) => {
    const id= req.params.id;
   
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      SELECT 
      d.id,
      d.cantidad,
      d.peso,   
      d.humedad,
      d.fecha_creacion,
      otfm.id AS id_otfm,
      enc_matprima.nom_matPrima AS descripcion_matprima,
      aserradero.nombre_aserradero AS aserradero
  FROM 
      dtfm d
      
  
  LEFT JOIN
      otfm ON d.id_OTFM = otfm.id
  LEFT JOIN
      enc_matprima ON d.id_matPrim = enc_matprima.id_enc
  LEFT JOIN
      aserradero ON d.id_Aserradero = aserradero.id

where otfm.id=?
  `;
      const [rows] = await pool.query(consulta, [id]);
  
      // Enviar los datos obtenidos al cliente
      res.status(200).json({ data: rows });
    } catch (error) {
      // Manejar errores de manera adecuada
      console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
  };
  
  
  
  