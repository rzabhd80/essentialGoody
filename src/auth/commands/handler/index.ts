export * from "./sign-up-user.handler";
export * from "./sign-in-user.handler";
import { SignUpUserHandler } from "./sign-up-user.handler";
import { SignInUserHandler } from "./sign-in-user.handler";

export const commandHandlers = [SignUpUserHandler, SignInUserHandler];