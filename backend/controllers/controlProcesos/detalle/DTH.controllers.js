import { pool } from "../../../src/db.js";



export const postDTH = async (req, res) => {
  const { id_cth,id_turno ,id_modelo, id_horno,id_creador, tempCabezaIZ, tempCentroIZ,tempPieIZ, tempCabezaDR,tempCentroDR,tempPieDR  } = req.body;
  
  try {
    const consulta = 'INSERT INTO dth (id_cth, id_turno ,id_modelo, id_horno,id_creador, tempCabezaIZ, tempCentroIZ,tempPieIZ, tempCabezaDR,tempCentroDR,tempPieDR) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?, ?)';
    const [rows] = await pool.query(consulta, [id_cth, id_turno ,id_modelo, id_horno,id_creador, tempCabezaIZ, tempCentroIZ,tempPieIZ, tempCabezaDR,tempCentroDR,tempPieDR  ]);
    res.send({ rows });
  } catch (err) {
    console.log('Error al guardar los datos', err);
    res.status(500).send('Error al guardar los datos');
  }
}



export const getDTH= async (req, res)=>{
const id= req.params.id;

try {
  const consulta= `
  select 
d.id,
d.fecha_creacion,
d.tempCabezaIZ,
d.tempCentroIZ,
d.tempPieIZ,
d.tempCabezaDR,
d.tempCentroDR,
d.tempPieDR,
cth.id as id_cth,
ufmodelo.nombre_modelo as modelo,
enc_maq.nombre_maq as horno ,
turno.turno as turno 

from dth d

left join cth on d.id_cth= cth.id
left join ufmodelo on d.id_modelo= ufmodelo.id_mod
left join enc_maq on d.id_horno= enc_maq.id_maq
left join turno on d.id_turno= turno.id

where d.id_cth=?
`

  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}