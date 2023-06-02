import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CreateCategoryCommand } from "../impl/create-category.imple";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { UpdateCategoryCommand } from "../impl/update-category.imple";

@Injectable()
@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
  constructor(
    @InjectRepository(CategoryEntity) public readonly categoryRepo: Repository<CategoryEntity>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: UpdateCategoryCommand) {
    const { updateCategoryDto, id } = command;
    const { name, parentCategoryId } = updateCategoryDto;
    const parentCategory = await this.categoryRepo.findOne({ where: { id: parentCategoryId } });
    if (!parentCategory) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
    Object.assign(category, { name: name, parentCategoryId: parentCategoryId });
    await category.save();
    return category;
  }
}
