import { createPool } from "mysql2/promise";


export const pool= createPool({
    host: 'ecofiltro-db.cbmq4k8s0gw4.us-east-2.rds.amazonaws.com',
    user:'admin',
    password: 'Controldedatos12',
    port:3306,
    database:'produccioneco'
})


pool.getConnection()
    .then(connection => {
        console.log('Conectado a la base de datos');
        connection.release(); // Liberar la conexión una vez que haya terminado
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });
    