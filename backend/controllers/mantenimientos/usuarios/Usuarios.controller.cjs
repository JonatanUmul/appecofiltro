let pool;
import("../../../src/db.js").then(dbModule => {
    pool = dbModule.pool;
}).catch(error => {
    console.error("Error al importar el módulo db.js:", error);
});

const bcrypt = require('bcrypt');

const postUsuarios = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password; // Corregido aquí
    const nombre = req.body.name;
    const correo = req.body.mail;
    const telefono = req.body.phone;
    const rol = req.body.rol;
    const estado = req.body.estado;

    try {
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async function(err, hash) {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                return res.status(500).send("Error del servidor");
            } else {
                console.log('Contraseña hasheada:', hash);

                const consulta = "INSERT INTO user(username, password, nombre, correo, telefono, id_rol, id_est) VALUE (?,?,?,?,?,?,?)";
                const [rows] = await pool.query(consulta, [username, hash, nombre, correo, telefono, rol, estado]);
                res.send({ rows });

                console.log("Usuario insertado correctamente");
            }
        });

    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

const getUsuarios = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM user';
        const [rows] = await pool.query(consulta);
        res.send({ rows });
        console.log(rows);
    } catch (err) {
        console.log("Error al obtener los datos:", err);
        res.status(500).send("Error del servidor");
    }
};
 
module.exports = { postUsuarios, getUsuarios };
