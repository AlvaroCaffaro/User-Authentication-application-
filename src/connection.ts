import mysql, { Connection } from 'mysql2/promise';
import {config} from './index';
// Función para crear una conexión a la base de datos
export const createConnection = async (): Promise<Connection> => {
  
        const connection = await mysql.createConnection(config);

        return connection;
    
};