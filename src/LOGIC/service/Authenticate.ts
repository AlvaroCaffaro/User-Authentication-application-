import { IauthUser } from "../../PERSISTENCE/interfaces/interfacesAuth";
import { User } from "../object/user";

export class Authenticate{
    private persistence:IauthUser;
    private tryCounter:number;
    private maxTry:number = 6;
 
    constructor(authPersistence:IauthUser){
        this.persistence = authPersistence;
        this.tryCounter = 0;
    }

    public async match({email,password}:{email:string,password:string}) {

        if(this.tryCounter >= this.maxTry){
            return({
                error: "ya superaste el limite de intentos, pruebe mas tarde.",
                user: null
            })    
        }

        let error:string|null = null;
        let user:User|null = null;
        try {
            user = await this.persistence.match({email:email,password:password});
        } catch (e:any) {
            return({
                error:e.message,
                user:null
            })
        }

        this.tryCounter = this.tryCounter++;
        if(user == null){
            error = "los datos son incorrectos";
        }

        return({
            error:error,
            user:user
        });

    }

    public async register({name,email,password}:{name:string,email:string,password:string}): Promise<string | null>{

        try {
            return(await this.persistence.create({name,email,password}));
        } catch (e:any) {
            return(e.message);
        }
        
    }



}