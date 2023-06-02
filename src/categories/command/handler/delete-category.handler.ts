import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CreateCategoryCommand } from "../impl/create-category.imple";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { UpdateCategoryCommand } from "../impl/update-category.imple";
import { DeleteCategoryCommand } from "../impl/delete-category.imple";

@Injectable()
@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
  constructor(
    @InjectRepository(CategoryEntity) public readonly categoryRepo: Repository<CategoryEntity>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: DeleteCategoryCommand) {
    const { id } = command;
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }

    await category.softRemove();
    return await category.save();
  }
}
