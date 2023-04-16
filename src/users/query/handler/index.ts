import { GetUsersHandler } from "./get-users.handler";
import { GetUserByIdHandler } from "./get-user-by-id.handler";
import { SayHelloHandler } from "./say-hello.handler";


export const queryHandlers = [GetUsersHandler, GetUserByIdHandler,SayHelloHandler];