import { SignInUserDto } from "../../dtos";

export class SignInUserCommand {
  constructor(public readonly SignInUserDto: SignInUserDto) {}
}
