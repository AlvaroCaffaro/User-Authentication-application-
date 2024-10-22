import {Auth} from '../LOGIC/dependenciesAuth'
import jwt from 'jsonwebtoken';

import {FormValidator} from '../validation/formValidation'
import { User } from '../LOGIC/object/user';
import { Mailer } from '../LOGIC/service/Mailer';

export class AuthenticateController{
    static login(req:any,res:any){
        
        if(req.session.user){ 
            return res.redirect('/');
        }

        res.render('login.ejs',{
            error:[],
            created:false,
        })
    };
    
    static async match(req:any,res:any){
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
                error: [result.message],
                created:false,
            });
        }

        try {
            const user:User = result;

            jwt.sign({id:user.get_id(),name:user.get_name(),email:user.get_email()},process.env.SECRET_KEY, 
                {
                    expiresIn:60*60*60*24*65
                },( function(err:any, token:any) {
                    if(err){
                        return res.render('login',{
                            error: [err],
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
                error: ['Ha ocurrido un error al conectarse al servidor'],
                created:false,
            });
        }
    };

    static register(req:any,res:any){
        res.render('register.ejs',{
            error:[],
        });
    }

    static async create(req:any,res:any){
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
                error: [result.message]
            });
        }

        const mailer = Mailer.get_instance();

        const response = await mailer.sendMail({name,email},{type:'register'});

        if(response instanceof Error){
            return res.render('login.ejs',{
                created:true,
                error:[response.message],
            });
        }

        return res.render('login.ejs',{
            created:true,
            error:[]
        });

       
    }

    static logout(_:any,res:any){
        res.clearCookie('access_token').redirect('/login');
    }


}