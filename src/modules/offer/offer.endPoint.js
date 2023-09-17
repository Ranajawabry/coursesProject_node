import { Roles } from "../../MiddleWare/auth.middleware.js";

const endPoint={
    create : [Roles.Admin],
    update : [Roles.Admin],
    delete : [Roles.Admin]
}
export default endPoint