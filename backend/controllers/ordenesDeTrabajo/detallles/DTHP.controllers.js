import { pool } from "../../../src/db.js";

export const postDTHP = async (req, res) => {

    const { id_OTHP,id_matPrima,  id_asrd, id_patio, esquinaSupIZ, esquinaSupDA, esquinaCentro, esquinaInfIZ, esquinaInfDR } = req.body;
    console.log(id_OTHP)
    try {
        if (id_OTHP === '' || id_asrd === '', id_matPrima==='' || id_patio === '' || esquinaSupIZ === '' || esquinaSupDA === '' || esquinaCentro === '' || esquinaInfIZ === '' || esquinaInfDR === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'INSERT INTO dthp (id_OTHP,id_matPrima,  id_asrd, id_patio, esquinaSupIZ, esquinaSupDA, esquinaCentro, esquinaInfDR, esquinaInfIZ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const [rows] = await pool.query(consulta, [id_OTHP,id_matPrima, id_asrd, id_patio, esquinaSupIZ, esquinaSupDA, esquinaCentro, esquinaInfIZ, esquinaInfDR]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};


export const getDTHP = async (req, res) => {
    const id= req.params.id;
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      select 
      d.hora_creacion,
      d.id,
      ROUND(((d.esquinaSupIZ+d.esquinaSupDA+d.esquinaCentro+d.esquinaInfDR+d.esquinaInfIZ)/5)) as promedio,
      d.esquinaSupIZ,
      d.esquinaSupDA,
      d.esquinaCentro,
      d.esquinaInfDR,
      d.esquinaInfIZ,
      d.fecha_creacion,
      othp.id AS id_OTHP,
      enc_matprima.nom_matPrima as materiaPrima,
      aserradero.nombre_aserradero AS aserradero,
      patios.nombrePatio AS patio
  

  FROM 
      dthp d
  JOIN 
      othp ON d.id_OTHP = othp.id
  JOIN 
      aserradero ON d.id_asrd = aserradero.id
  JOIN 
      patios ON d.id_patio = patios.id
  JOIN 
      enc_matprima ON d.id_matPrima = enc_matprima.id_enc
      where othp.id= ?
  `;
      const [rows] = await pool.query(consulta,[id]);
  
      // Enviar los datos obtenidos al cliente
      res.status(200).json({ data: rows });
    } catch (error) {
      // Manejar errores de manera adecuada
      console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
  };


  export const getDTHPP = async (req, res) => {
    const { id_asrd, fecha_creacion_inicio,fecha_creacion_fin, id_patio, id_enc } = req.params; // Obtener los parámetros de la URL

    try {
        let consulta = `
        SELECT 
                d.hora_creacion,
                d.esquinaSupIZ,
                d.esquinaSupDA,
                d.esquinaCentro,
                d.esquinaInfDR,
                d.esquinaInfIZ,
                d.fecha_creacion,
              
                othp.id AS id_OTHP,
                aserradero.nombre_aserradero AS aserradero,
                patios.nombrePatio AS patio,
                enc_matprima.nom_matPrima AS materiaPrima
            FROM 
                dthp d
            JOIN 
                othp ON d.id_othp = othp.id
            JOIN 
                aserradero ON d.id_asrd = aserradero.id
            JOIN 
                patios ON d.id_patio = patios.id
            JOIN 
                enc_matprima ON d.id_matPrima = enc_matprima.id_enc
    
            WHERE 1 = 1`;

        const params = [];

        if (id_patio !== 'null') {
            consulta += ' AND (d.id_patio IS NULL OR d.id_patio = ?)';
            params.push(id_patio);
        }

        if (id_asrd !== 'null') {
            consulta += ' AND (d.id_asrd IS NULL OR d.id_asrd = ?)';
            params.push(id_asrd);
        }

        if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
            if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
                consulta += ' AND (d.fecha_creacion BETWEEN ? AND ?)';
                params.push(fecha_creacion_inicio, fecha_creacion_fin);
            } else if (fecha_creacion_inicio !== 'null') {
                consulta += ' AND d.fecha_creacion >= ?';
                params.push(fecha_creacion_inicio);
            } else {
                consulta += ' AND d.fecha_creacion <= ?';
                params.push(fecha_creacion_fin);
            }
        }

        if (id_enc !== 'null') {
            consulta += ' AND (d.id_matPrima IS NULL OR d.id_matPrima = ?)';
            params.push(id_enc);
        }


        const [rows] = await pool.query(consulta, params);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
};
