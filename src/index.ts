import express,{Application,Request,Response} from 'express';
import path from 'path';
import {authRouter} from  './router/authenticateRouter';

import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';


const app:Application = express();
//configuramos el motor de plantillas y la carpeta donde van a estar las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// esto permite que dotenv lea el archivo .env y asigne las variables de entorno a process.env 
dotenv.config(); 


//configuracion para la conexion a la base de datos
export const config = {
        host: 'localhost',     
        user: process.env.DATABASEUSER,  
        password: process.env.DATABASEPASSWORD, 
        database: 'tu_base_de_datos'
}


// middlewares

// este middleware procesa los datos enviados en una solicitud post. permitiendolos utilizar req.body para acceder a los datos que nos envian desde el formulario de inicio de sesion
app.use(express.urlencoded({ extended: true }));

// este middleware nos sirve las cookies en req.cookies para que podamos acceder a ellas desde la request
app.use(cookieParser());

// configuramos los archivos estaticos en la carpeta public (aqui estaran los archivos css) 
app.use(express.static(path.join(__dirname, 'public')));


app.use((req:any,res:Response,next:any) => {
    
    req.session = {user:null};
    const token = req.cookies.access_token;

    if(!token){
        return next();
    }

    try{
        // verificamos si el token que se encontraba en la cookie es valido. En caso que no lo sea lanzaria un error sino iniciamos la sesion
        const data = jwt.verify(token,process.env.SECRET_KEY);
        req.session.user = data;
        next();

    } catch(e){
        next();
    }


});

app.use('/',authRouter);

//protected routes (only registered users)
app.use('/*',(req:any,res:Response,next:any) => {
    if(!req.session.user){
        return res.status(403).redirect('/login');
    }
    next();
});

app.use('/',(req:any,res:any)=>{
    const {user} = req.session;
    res.render('index',{
        user:user,
    });
})

app.use('/*',(_:any,res:any)=>{
    res.render('noExist.ejs');
})


app.listen(process.env.PORT,() => {
    console.log('Server on port',process.env.PORT);
});


