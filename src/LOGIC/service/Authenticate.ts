import { IauthUser } from "../../PERSISTENCE/interfaces/interfacesAuth";
import { IncorrectDataError, MaxTryError } from "../object/error";

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
            return(new MaxTryError());    
        }

        const data = await this.persistence.match({email:email,password:password});
     
        this.tryCounter = this.tryCounter++;
        if(data == null){
            return( new IncorrectDataError());
        }

        return(data);

    }

    public async register({name,email,password}:{name:string,email:string,password:string}): Promise<Error | null>{

        const error = await this.persistence.create({name,email,password});

        return error;
    }



}