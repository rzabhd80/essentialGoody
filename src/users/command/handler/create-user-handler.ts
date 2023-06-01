import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../libs/entities/user.entity";
import { Repository } from "typeorm";
import {
  CustomError,
  USER_WITH_GIVEN_EMAIL_EXISTS,
} from "../../../../http-exception";
import { generateHashPassword } from "../../../../helpers/password";
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserCommand } from "../impl/create-user.imple";
import { EventEmitter } from "stream";
import { SaveFileAggregate } from "src/models/savefile.aggregate";
import { SaveFileEvent } from "src/events/impl/save-file-event";

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User) public readonly userRepo,
    public readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    const { createUserDto } = command;
    const { firstName, lastName, email, password } = createUserDto;
    const userOnDB = await this.userRepo.findOne({ where: { email: email } });
    if (userOnDB) {
      throw new CustomError(USER_WITH_GIVEN_EMAIL_EXISTS);
    }
    const user = this.userRepo
      .create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await generateHashPassword(password),
      })
      .save();

    EmailHandler.sendMail(new EmailFaker());

    return user;
  }
}
