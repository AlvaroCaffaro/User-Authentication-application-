import mysql, { Connection } from 'mysql2/promise';

// Función para crear una conexión a la base de datos
export const createConnection = async (): Promise<Connection> => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',     
            user: 'tu_usuario',  
            password: 'tu_contraseña', 
            database: 'tu_base_de_datos'
        });

        return connection;
    } catch (error) {
        throw error;
    }
};