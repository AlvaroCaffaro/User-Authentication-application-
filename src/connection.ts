import mysql, { Connection } from 'mysql2/promise';

// Función para crear una conexión a la base de datos
export const createConnection = async (): Promise<Connection> => {
  
        const connection = await mysql.createConnection({
            host: 'localhost',     
            user: process.env.DATABASEUSER,  
            password: process.env.DATABASEPASSWORD, 
            database: 'tu_base_de_datos'
        });

        return connection;
    
};