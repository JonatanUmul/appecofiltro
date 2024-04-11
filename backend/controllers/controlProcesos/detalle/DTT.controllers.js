import { pool } from "../../../src/db.js";



export const postDTT = async (req, res) => {
  const { id_CTT,id_tunel, id_modelo,cabezaDerecha1, pieDerecho1, cabezaDerecha2,pieDerecho2, cabezaDerecha3,pieIzquierdo1,cabezaizquierda1, pieIzquierdo2  } = req.body;
  
  try {
    const consulta = 'INSERT INTO dtt (id_CTT, id_tunel, id_modelo,cabezaDerecha1, pieDerecho1, cabezaDerecha2,pieDerecho2, cabezaDerecha3,pieIzquierdo1,cabezaizquierda1, pieIzquierdo2  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)';
    const [rows] = await pool.query(consulta, [id_CTT,id_tunel, id_modelo,cabezaDerecha1, pieDerecho1, cabezaDerecha2,pieDerecho2, cabezaDerecha3,pieIzquierdo1,cabezaizquierda1, pieIzquierdo2  ]);
    res.send({ rows });
  } catch (err) {
    console.log('Error al guardar los datos', err);
    res.status(500).send('Error al guardar los datos');
  }
}

export const getDTT= async (req, res)=>{
const id= req.params.id;

try {
  const consulta= `
  select 
d.id,
d.fecha_creacion,
d.hora_creacion,
d.cabezaDerecha1,
d.pieDerecho1,
d.cabezaDerecha2,
d.pieDerecho2,
d.cabezaDerecha3,
d.pieIzquierdo1,
d.cabezaizquierda1,
d.pieIzquierdo2,
ROUND(((d.cabezaDerecha1+d.pieDerecho1+d.cabezaDerecha2+d.pieDerecho2+d.cabezaDerecha3+d.pieIzquierdo1+d.cabezaizquierda1+d.pieIzquierdo2) / 8)) AS promedio,
ctt.id as id_ctt,
ufmodelo.nombre_modelo as modelo,
enc_maq.nombre_maq as tunel 

from dtt d

left join ctt on d.id_CTT= ctt.id
left join ufmodelo on d.id_modelo= ufmodelo.id_mod
left join enc_maq on d.id_tunel= enc_maq.id_maq

where d.id_CTT=?
`

  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}