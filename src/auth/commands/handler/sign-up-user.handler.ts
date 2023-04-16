import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignInUserCommand } from "../impl/sign-in-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { SignUpUserCommand } from "../impl/sign-up-user.command";
import { CustomError, USER_WITH_GIVEN_EMAIL_EXISTS } from "../../../../http-exception";
import { generateHashPassword } from "../../../../helpers/password";
import { Injectable } from "@nestjs/common";

@Injectable()
@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler implements ICommandHandler<SignUpUserCommand> {
  constructor(@InjectRepository(User) public readonly userRepo) {
  }

  async execute(command: SignUpUserCommand) {
    const { signUpUserDto } = command;
    const { firstName, lastName, email, password } = signUpUserDto;
    const userOnDB = await this.userRepo.findOne({ where: { email: email } });
    if (userOnDB) {
      throw new CustomError(USER_WITH_GIVEN_EMAIL_EXISTS);
    }
    const user = this.userRepo.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await generateHashPassword(password),
    }).save();
    return user;
  }
}