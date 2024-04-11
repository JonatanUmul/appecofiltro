import { pool } from "../../../src/db.js";

export const postDTCA2 = async (req, res) => {

    const { id_OTCA2,id_MP, id_aserradero, cantidad_inicial, cernido_fino, cernido_grueso} = req.body;
    try {
    
        if (id_OTCA2 === '' ||id_MP===''|| id_aserradero === '' || cantidad_inicial === '' || cernido_fino === '' ||cernido_grueso==='' ) {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'INSERT INTO dtca2(id_OTCA2, id_MP, id_aserradero, cantidad_inicial, cernido_fino, cernido_grueso) VALUES (?, ?, ?, ?,?,?)';
            const [rows] = await pool.query(consulta, [ id_OTCA2, id_MP, id_aserradero, cantidad_inicial, cernido_fino, cernido_grueso]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};



export const getDTCA2 = async (req, res) => {
    const id= req.params.id;
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      SELECT 
      d.id,
      d.cantidad_inicial,
      d.cernido_fino,
      d.cernido_grueso,
      (cantidad_inicial-(cernido_fino+cernido_grueso)) as merma,
      d.fecha_creacion,
      otca2.id AS id_otca2,
      enc_matprima.nom_matPrima as matPrima,
      aserradero.nombre_aserradero AS aserradero
    
  FROM 
      dtca2 d
      LEFT JOIN 
      otca2 ON d.id_OTCA2 = otca2.id
      LEFT JOIN 
      enc_matprima ON d.id_MP = enc_matprima.id_enc
      LEFT JOIN 
      aserradero ON d.id_aserradero = aserradero.id
        
      where otca2.id=?
  
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
  

  

export const getDTCAA2 = async (req, res) => {
    const { id_aserradero, fecha_creacion_inicio,fecha_creacion_fin } = req.params; // Obtener los parámetros de la URL
  
    try {
        let consulta = `
        SELECT 
		d.id,
		d.cantidad_inicial,
		d.fecha_creacion,
		d.hora_creacion,
		d.cernido_fino,
		d.cernido_grueso,
        (cantidad_inicial-(cernido_fino+cernido_grueso)) as merma,
		d.hora_creacion,
		d.fecha_creacion,
        enc_matprima.nom_matPrima as matPrima,
		aserradero.nombre_aserradero AS aserradero

	FROM 
		dtca2 d
        LEFT JOIN 
        enc_matprima ON d.id_MP = enc_matprima.id_enc

        LEFT JOIN 
		aserradero ON d.id_aserradero = aserradero.id
    WHERE 1=1`;
  
        const params = [];
  
        if (id_aserradero !== 'null') {
            consulta += ' AND (d.id_aserradero IS NULL OR d.id_aserradero = ?)';
            params.push(id_aserradero);
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
      
  
        const [rows] = await pool.query(consulta, params);
  
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
  };
  
  
  
