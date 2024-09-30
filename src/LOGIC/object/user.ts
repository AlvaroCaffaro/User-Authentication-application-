import { UUID } from "crypto";

/* probably we goint to destroy this class, cause its a more complicate to have the user's information on the backend than have the information in a cookie*/
export class User{
    private readonly id:UUID; // a futuro UUID
    private name:string;
    private email:string;
    
    
    constructor({id,name,email}:{id:UUID,name:string,email:string})
    {
        this.id = id;
 
        this.email = email;
        this.name = name;
    }


    public get_id(){
       
        return this.id;
    
    }

    public get_name(){
        return this.name;
    }
    
    public set_name(new_name:string){ 
        this.name = new_name;
    }

    public get_email(){
        return this.email;
    }

}


