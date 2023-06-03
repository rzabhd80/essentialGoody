import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CreateCategoryCommand } from "../impl/create-supplier.imple";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";

@Injectable()
@CommandHandler(CreateCategoryCommand)
export class CreateSupplierHandler implements ICommandHandler<CreateCategoryCommand> {
  constructor(
    @InjectRepository(CategoryEntity) public readonly categoryRepo: Repository<CategoryEntity>,
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
    const category = await this.categoryRepo
      .create({
        name: name,
        parentCategoryId: parentCategory.id,
      })
      .save();
    return category;
  }
}
