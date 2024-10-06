import { User } from "../../LOGIC/object/user";
import { IauthUser } from "../interfaces/interfacesAuth";
import { createConnection} from '../../connection';
import bcrypt from 'bcrypt';

export class MysqlAuth implements IauthUser{

    constructor(){}

    async create({ name, email, password }: { name: string; email: string; password: string; }): Promise<null> {
        
    
        const connection = await createConnection();
        
        // encriptamos la contraseña antes de enviarla a la base de datos
        const passwordHash = await bcrypt.hash(password, 10); // el salt deberia estar en una variable de entorno (mayor seguridad) pero lo dejo asi solo para el ejemplo del codigo

        await connection.query('INSERT INTO usuarios (nombre, password, email) VALUES (?, ?, ?)',[name, passwordHash, email]);

        await connection.end();

        return null;


    }
    
    async match({ email, password }: { email: string; password: string; }): Promise<User | null>{

        const connection = await createConnection();
        const [rows]: any = await connection.execute('SELECT id,name,email,password FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, rows[0].password);

        await connection.end();

        if (isPasswordValid) {
            return new User({id:rows[0].id, email: rows[0].email, name: rows[0].name});
        } 

        return null;
    }
    
}