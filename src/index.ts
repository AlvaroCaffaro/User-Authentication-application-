import express,{Application,Request,Response} from 'express';
import path from 'path';
import {authRouter} from  './router/authenticateRouter';

import dotenv from 'dotenv';
import cookieParser from 'cookie';
import {verify} from 'jsonwebtoken';


const app:Application = express();
//settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
dotenv.config();


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req:any,res:Response,next) => {
    
    req.session = {user:null};
    const token = req.cookies.access_token;

    if(!token){
        return next();
    }

    try{
        const data = verify(token,'process.env.SECRET_KEY');
        req.session.user = data;
        next();

    } catch(e){
        next();
    }


});

app.use('/',authRouter);

//protected routes
app.use('/*',(req:any,res:Response,next) => {
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

app.use('/*',(_,res)=>{
    res.render('noExist.ejs');
})


app.listen(process.env.PORT,() => {
    console.log('Server on port',process.env.PORT);
});


