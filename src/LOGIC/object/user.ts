import { UUID } from "node:crypto";

export class User{
    private readonly id:UUID;
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


