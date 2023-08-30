import { Roles } from "../../MiddleWare/auth.middleware.js";

 export const endPoint ={
    create:[Roles.Admin,Roles.Superviser],
    update:[Roles.Admin,Roles.Superviser],
    delete:[Roles.Admin,Roles.Superviser]

 }