import { CreateUserDto } from "src/users/dtos";

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
