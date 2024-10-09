import {createConnection} from 'mysql2/promise';
import {config} from './index';
// Función para crear una conexión a la base de datos
export const createMYSQLConnection = async (): Promise<any> => {
    
    const connection = await createConnection(config);

    return connection;
    
};