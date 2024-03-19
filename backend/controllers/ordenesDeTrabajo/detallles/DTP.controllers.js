import { pool } from "../../../src/db.js";

export const postDTP = async (req, res) => {
   
  const {
    id_OTP, id_turno, id_tipoCernido, id_Aserradero, id_ufmodelo, producido, codigoInicio, codigoFinal, librasBarro, librasAserrin} = req.body;

  console.log(id_OTP, id_turno, id_tipoCernido, id_Aserradero, id_ufmodelo, producido, codigoInicio, codigoFinal, librasBarro, librasAserrin,
    );

  try {
      const consulta ="INSERT INTO dtp( id_OTP, id_turno, id_tipoCernido, id_Aserradero, id_ufmodelo, producido, codigoInicio, codigoFinal, librasBarro, librasAserrin) VALUES (?, ?, ?, ?,?, ?, ?, ?,?, ?)";
      const [rows] = await pool.query(consulta, [
        id_OTP,
    id_turno,
    id_tipoCernido,
    id_Aserradero,
    id_ufmodelo,
    producido,
    codigoInicio,
    codigoFinal,
    librasBarro,
    librasAserrin,
      
      ]);
      res.send({ rows });
    }
   catch (err) {
    console.log("Error al guardar los datos", err);
    res.status(500).json({ error: "Error al guardar los datos" }); // Enviar un mensaje de error al frontend
  }
};



export const getDTP = async (req, res) => {
  const id= req.params.id;
  try {
    // Consulta SQL para obtener todos los registros de la tabla dtp
    const consulta = `
    SELECT 
    d.id,
    d.producido,
    d.codigoInicio,
    d.codigoFinal,
    d.librasBarro,
    d.librasAserrin,
    d.fecha_creacion,
    d.hora_creacion,
    otp.id AS id_OTP,
    turno.turno AS nombre_turno,
    tipocernido.tipoCernido AS nombre_tipoCernido,
    aserradero.nombre_aserradero AS nombre_Aserradero,
    ufmodelo.nombre_modelo AS nombre_ufmodelo

FROM 
    dtp d
JOIN 
    otp ON d.id_OTP = otp.id
JOIN 
    turno ON d.id_turno = turno.id
JOIN 
    tipocernido ON d.id_tipoCernido = tipocernido.id
JOIN 
    aserradero ON d.id_Aserradero = aserradero.id
JOIN 
    ufmodelo ON d.id_ufmodelo = ufmodelo.id_mod

    where otp.id=?


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



