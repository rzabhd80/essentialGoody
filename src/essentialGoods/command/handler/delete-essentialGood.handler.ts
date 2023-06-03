import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError, ESSENTIAL_GOOD_NOT_FOUND } from "http-exception";
import { EssentialGood } from "libs/entities/essentialGood.entity";
import { DeleteEssentialGoodCommand } from "../impl/delete-essentialGood.imple";

@Injectable()
@CommandHandler(DeleteEssentialGoodHandler)
export class DeleteEssentialGoodHandler implements ICommandHandler<DeleteEssentialGoodCommand> {
  constructor(
    @InjectRepository(EssentialGood) public readonly essentialGoodRepo: Repository<EssentialGood>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: DeleteEssentialGoodCommand) {
    const { id } = command;
    const essentialGood = await this.essentialGoodRepo.findOne({ where: { id: id } });
    if (!essentialGood) {
      return new CustomError(ESSENTIAL_GOOD_NOT_FOUND);
    }

    await essentialGood.softRemove();
    return await essentialGood.save();
  }
}
