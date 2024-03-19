import { createPool } from "mysql2/promise";


export const pool= createPool({
    host: 'localhost',
    user:'root',
    password: '',
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