import { SignInUserDto, SignUpUserDto } from "../../dtos";

export class SignUpUserCommand {
  constructor(
    public readonly signUpUserDto: SignUpUserDto,
  ) {
  }
}