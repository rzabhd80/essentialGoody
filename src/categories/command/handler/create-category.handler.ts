import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CreateCategoryCommand } from "../impl/create-category.imple";
import { Category } from "libs/entities/category";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";

@Injectable()
@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(
    @InjectRepository(Category) public readonly categoryRepo,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: CreateCategoryCommand) {
    const { createCategoryDto } = command;
    const { name, parentCategoryId } = createCategoryDto;
    const parentCategory = await this.categoryRepo.findOne({ where: { id: parentCategoryId } });
    if (!parentCategory) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
    const category = this.categoryRepo
      .create({
        name,
        parentCategoryId,
      })
      .save();
    return category;
  }
}
