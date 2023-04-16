import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SignInUserCommand } from "../impl/sign-in-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import { CustomError, INCORRECT_PASSWORD, USER_NOT_FOUND } from "../../../../http-exception";
import { verifyPassword } from "../../../../helpers/password";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@CommandHandler(SignInUserCommand)
@Injectable()
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(@InjectRepository(User) public readonly userRepo, private readonly jwtService: JwtService) {
  }

  async execute(command: SignInUserCommand) {
    const { SignInUserDto } = command;
    const { email, password } = SignInUserDto;
    const user = await this.userRepo.findOne(
      { where: { email: email } });
    if (!user) {
      throw new CustomError(USER_NOT_FOUND);
    }
    const verified = await verifyPassword(user.password, password);
    if (!verified) {
      throw new CustomError(INCORRECT_PASSWORD);
    }
    const token = this.jwtService.sign({ user: user });
    return { token };
  }

}