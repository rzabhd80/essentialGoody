import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignInUserCommand } from "../impl/sign-in-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(@InjectRepository(User) public readonly userRepo: Repository<User>) {
  }

  async execute(command: SignInUserCommand) {

  }
}