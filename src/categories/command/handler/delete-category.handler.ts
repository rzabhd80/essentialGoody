import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CreateCategoryCommand } from "../impl/create-category.imple";
import { Category } from "libs/entities/category";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { UpdateCategoryCommand } from "../impl/update-category.imple";
import { DeleteCategoryCommand } from "../impl/delete-category.imple";

@Injectable()
@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
  constructor(
    @InjectRepository(Category) public readonly categoryRepo,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: DeleteCategoryCommand) {
    const { id } = command;
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
    category.remove().save();
  }
}
