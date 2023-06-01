import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserProfileCommand } from "../impl/create-user-profile";
import { generateHashPassword } from "helpers/password";
import { InjectRepository } from "@nestjs/typeorm";
import { Avatar } from "libs/entities/avatar.entity";
import { Repository } from "typeorm";
import { generateHash } from "helpers/calculate-hash";
import { SaveFileAggregate } from "src/models/savefile.aggregate";
import { SaveFileEvent } from "src/events/impl/save-file-event";

@CommandHandler(CreateUserProfileCommand)
export class CreateUserProfileHandler
  implements ICommandHandler<CreateUserProfileCommand>
{
  constructor(
    @InjectRepository(Avatar) public readonly avatarRepo: Repository<Avatar>,
    public readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: CreateUserProfileCommand) {
    const { userId, image } = command;
    const link = image.toString();
    const hash = await generateHash(image);
    const avatar = await this.avatarRepo
      .create({ userId, link, hash: hash })
      .save();

    /*----------------------------------events---------------------------------- */
    const saveUserProfileEvent = this.eventPublisher.mergeObjectContext(
      new SaveFileAggregate()
    );
    saveUserProfileEvent.apply(new SaveFileEvent(userId, image));
    saveUserProfileEvent.commit();
  }
}
