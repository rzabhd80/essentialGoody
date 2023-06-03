import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { CategoryEntity } from "libs/entities/category.entity";
import { CATEGORY_NOT_FOUND, CustomError } from "http-exception";
import { UpdateSupplierCommand } from "../impl/update-supplier.imple";
import { Supplier } from "../../../../libs/entities/suppliers.entity";

@Injectable()
@CommandHandler(UpdateSupplierCommand)
export class UpdateSupplierHandler implements ICommandHandler<UpdateSupplierCommand> {
  constructor(
    @InjectRepository(Supplier) public readonly supplierRepo: Repository<Supplier>,
    public readonly eventPublisher: EventPublisher,
  ) {
  }

  async execute(command: UpdateSupplierCommand) {
    const { id, updateCategoryDto } = command;
    const { name } = updateCategoryDto;
    const supplier = await this.supplierRepo.findOne({ where: { id: id } });
    if (!supplier) {
      return new CustomError(CATEGORY_NOT_FOUND);
    }
    Object.assign(supplier, { name: name });
    await supplier.save();
    return supplier;
  }
}
