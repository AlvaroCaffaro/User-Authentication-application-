import { User } from "../../LOGIC/object/user";

export interface IauthUser{

    match({email,password}:{email:string,password:string}):Promise<User|null|Error>;
    create({name,email,password}:{name:string,email:string,password:string}):Promise<null|Error>;
}