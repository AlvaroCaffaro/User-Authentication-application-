import {Auth} from '../LOGIC/dependenciesAuth'
import {sign} from 'jsonwebtoken';

import {Request,Response} from 'express';
import {FormValidator} from '../validation/formValidation'
import { User } from '../LOGIC/object/user';

export class AuthenticateController{
    static login(req:any,res:Response){
        
        if(req.session.user){ 
            return res.redirect('/');
        }

        res.render('login.ejs',{
            error:[],
            created:false,
        })
    };
    
    static async match(req:Request,res:Response){
        const {email, password} = req.body;

        let error:string[] = [];
        if(!FormValidator.isValidEmail({value: email})){
            error.push("el email escrito no es valido.");
        }

        if(!FormValidator.isValidPassword({value: password})){
            error.push('la contraseña escrita no es valida');
        }

        if(error.length > 0){
            return res.render('login',{
                error: error,
                created:false
            });
        }

        const result = await Auth.match({email,password});
        if(result instanceof Error){
            return res.render('login',{
                error: result.message,
                created:false,
            });
        }

        try {
            const user:User = result;

            sign({id:user.get_id(),name:user.get_name(),email:user.get_email()},'process.env.SECRET_KEY', 
                {
                    expiresIn:60*60*60*24*65
                },( function(err, token) {
                    if(err){
                        return res.render('login',{
                            error: err,
                            created:false,
                        });
                    }

                    return (res.cookie('access_token',token,{
                        httpOnly:true,
                        secure:false,
                    }).redirect('/'));

                  })
                );
            

        } catch (err) {
            return res.render('login',{
                error: 'Ha ocurrido un error al conectarse al servidor',
                created:false,
            });
        }
    };

    static register(req:Request,res:Response){
        res.render('register.ejs',{
            error:[],
        });
    }

    static async create(req:Request,res:Response){
        const {email,name,password} = req.body;
        
        let error:string[] = [];
        if(!FormValidator.isValidEmail({value:email})){
            error.push("El email debe contener minimo 7 caracteres y '@' ");
        }

        if(!FormValidator.isValidPassword({value:password})){
            error.push('la contraseña debe tener por lo menos 5 caracteres');
        }

        if(!FormValidator.isValidName({value:name})){
            error.push('el nombre debe contener como minimo 5 caracteres');
        }


        if(error.length > 0){
           return res.render('register',{
                error: error
            });
        }

    
        const result:any = await Auth.register({email,name,password});
        
        if(result instanceof Error){
            return res.render('register',{
                error: result.message
            });
        }

        return res.render('login.ejs',{
            created:true,
            error:[]
        });
        
       
    }

    static logout(_:any,res:Response){
        res.clearCookie('access_token').redirect('/login');
    }


}