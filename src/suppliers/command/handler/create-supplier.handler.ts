import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { CreateSupplierCommand } from "../impl/create-supplier.imple";
import { Supplier } from "../../../../libs/entities/suppliers.entity";

@Injectable()
@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler implements ICommandHandler<CreateSupplierCommand> {
  constructor(
    @InjectRepository(Supplier) public readonly supplierRepo: Repository<Supplier>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: CreateSupplierCommand) {
    const { createCategoryDto } = command;
    const { name } = createCategoryDto;
    const supplier = await this.supplierRepo
      .create({
        name,
      })
      .save();
    return supplier;
  }
}
